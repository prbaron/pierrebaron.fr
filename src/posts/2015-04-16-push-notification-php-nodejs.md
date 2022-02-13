---
title: Ajouter un système de notifications Push dans une application PHP avec socket.io
description: Apprenons à ajouter un système de notifications instantanées dans une application PHP existante avec socket.io
date: 2015-04-16
tags: ['tutorial']
layout: layouts/post.njk
keywords: push, push notification, php, nodejs, socketio, angularjs, websockets
demo: https://tutopushnotifications.herokuapp.com
download: https://github.com/prbaron/tuto_push_notifications
---

Dans ce tutoriel, nous allons voir comment ajouter un système de notifications instantanées dans une application PHP avec socket.io. Notre application existante est constituée d'un backend PHP (ici Lumen) et d'une application frontend (AngularJS).
<!-- excerpt -->

## Description de l'application

Nous allons ici réaliser un système de chat avec plusieurs intervenants. Lorsque l'un des utilisateurs écrit un message, tous les autres utilisateurs présents doivent voir le nouveau message de manière instantanée. De plus, les messages seront enregistrés en base afin de permettre d'obtenir un historique.

:::danger Ne pas utiliser le serveur tel quel en production !
Ce tutoriel a pour but d'expliquer le fonctionnement du push. En aucun cas le code fourni peut être utilisé en production. Pour des raisons de simplification, j'ai volontairement omis la partie sécurisation et validation des données. Il sera de votre responsabilité de l'implémenter.
:::

## Fonctionnement

  1. L'utilisateur arrive sur la page de chat et crée une connexion permanente avec le serveur push.
  2. L'utilisateur écrit un message et envoie l'information au serveur via une API Rest.
  3. Le serveur PHP fait le traitement du message, l'enregistre en base de données et envoie une information au serveur push.
  4. Le serveur push propage cette information à tous les clients connectés.

## Serveur API

### Installation & configuration

#### Installation

Veuillez crééer un nouveau projet Lumen avec composer en entrant la commande suivante :

```bash
composer create-project laravel/laravel --prefer-dist
```

Une fois ceci fait, veuillez vous placer à la racine du projet et entrer la commande suivante pour générer votre fichier d'environnement.

```bash
mv .env.example .env
```

#### Configuration
Pour pouvoir activer l'utilisation de ce fichier .env, il va vous falloir décommenter la ligne `Dotenv::load(__DIR__.'/../');` dans le fichier **bootstrap/app.php**. Profitez en pour décommenter `$app->withFacades();` et `$app->withEloquent();`.

Ouvrez le fichier **.env** et remplissez les informations nécessaires (APP_KEY, DB_HOST, DB_DATABASE, DB_USERNAME et DB_PASSWORD).

### Fonctionnalités

#### Model
Dans cette application, nous n'allons manipuler qu'un seul objet appelé Message. Les propriétés de l'objet sont simples, il s'agit de deux Strings : author et content. Ce sont les seuls champs à pourvoir lorsque vous voudrez envoyer un nouveau message au serveur.
Creez un nouveau fichier dans **app/Models/Message.php**. Voici le code à ajouter.

```php
<?php


namespace app\Models;


use Illuminate\Database\Eloquent\Model;

class Message extends Model {
    protected $table = "messages";
    protected $fillable = ['author', 'content'];
}
```

Pour que Lumen connaisse ce fichier, il vous faut ajouter le nouveau dossier dans le classmap de **composer.json**.

```json
"autoload": {
  "classmap": [
    "database/",
    "app/Models"
  ]
}
```

### Migration
Il va nous falloir créer notre table messages dans la base de données. Entrez la ligne suivante dans votre terminal.

```bash
php artisan make:migration create_messages_table --create=messages
```

Ouvrez le fichier **database/migrations/2015_04_17_143531_create_messages_table.php** et copiez-y le code suivant :

```php
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessagesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function(Blueprint $table)
        {
            $table->increments('id');

            $table->string('author', 255);
            $table->string('content', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('messages');
    }
}
```

#### Controller
Veuillez créer le fichier **app/Http/Controllers/MessagesController.php** et y insérer le code suivant :

```php
<?php
namespace App\Http\Controllers;

use app\Models\Message;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    public function index()
    {
        $messages = Message::all();

        return response()->json($messages->toArray(), 200, []);
    }

    public function store(Request $request)
    {
        $inputs = $request->all();
        $createdMessage = Message::create($inputs);
        if ($createdMessage) {
            return response()->json($createdMessage->toArray(), 201, []);
        }

        return response()->json("error", 400, []);
    }
}
```

#### Router
Maintenant que nous avons le model et le controller, il nous faut le routeur pour créer notre API Rest. Veuillez ouvrir le fichier **app/Http/routes.php** et ajouter le code suivant :

```php
<?php

$app->group(['namespace' => 'App\Http\Controllers'], function($group) {
    $group->get('messages', 'MessagesController@index');
    $group->post('messages', 'MessagesController@store');
});
```

## Application client

Nous allons maintenant voir comment créer une application AngularJS qui va permettre de consommer cette API.

### Vue
Créez le fichier **resources/views/index.php** et copiez-y le code suivant :

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Push</title>

    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .container {
            padding-top    : 20px;
            padding-bottom : 20px;
        }
    </style>
</head>
<body ng-app="app">

<div class="container" ng-controller="MessagesCtrl as ctrl">
    <div class="row">
        <!-- affichage des messages -->
        <div class="col-sm-8">
            <ul class="list-group">
                <li class="list-group-item" ng-repeat="message in ctrl.messages | orderBy:'-id'">
                    <strong class="list-group-item-heading">{{message.author}}</strong>

                    <p class="list-group-item-text">{{message.content}}</p>
                </li>
            </ul>
        </div>
        <!-- formulaire de création d'un nouveau message -->
        <div class="col-sm-4">
            <form name="messageForm">
                <div class="form-group">
                    <label for="author">Author</label>
                    <input type="text" class="form-control" id="author" placeholder="John" ng-model="ctrl.form.author"
                           required>
                </div>

                <div class="form-group">
                    <label for="content">Content</label>
                    <textarea class="form-control" rows="3" id="content" placeholder="Hello how are you ?"
                              ng-model="ctrl.form.content" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary" ng-disabled="messageForm.$invalid"
                        ng-click="ctrl.submitForm(ctrl.form)">Submit
                </button>
            </form>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
<script src="scripts/controllers/message.js"></script>
</body>
</html>
```

### JavaScript
Créez le fichier **public/scripts/controllers/messages.js** et copiez-y le code suivant :

```javascript
(function () {
    'use strict';

    angular
        .module('app', [])
        .controller('MessagesCtrl', MessagesCtrl);

    MessagesCtrl.$inject = ['$http', '$interval'];

    function MessagesCtrl($http, $interval) {
        /* jshint validthis: true */
        var vm = this;

        vm.submitForm = submitForm;

        activate();

        ////////////////

        function activate() {
            vm.form = {
                author  : undefined,
                content : undefined
            };

            loadData();
        }

        function loadData() {
            $http.get('/messages')
                .success(function (data) {
                    vm.messages = data;
                });
        }

        function submitForm(form) {
            $http.post('/messages', form)
                .success(function (data) {
                    vm.form.content = undefined;
                    loadData();
                });
        }
    }
})();
```

A partir de maintenant, notre application nous permet de voir les messages enregistrés en base et d'en envoyer un nouveau. Seulement vous pouvez voir un problème, le nouveau message n'est pas ajouté à la liste de gauche.

Rajoutons un système de polling, c'est à dire que nous allons appeler la méthode `loadData()` toutes les x secondes. Pour se faire ajoutez la ligne suivante dans la méthode `activate()` :

```javascript
$interval(loadData, 2000);
```

Nous avons à présent une application de chat totalement fonctionnelle. Si vous ouvrez deux fenêtres et que vous écrivez un message dans l'un, celui ci sera affiché au bout de maximum 2 secondes sur la deuxième fenêtre.

## Le push
Maintenant, ajoutons les notifications instantanées ! Pour cette démonstration, je place le code du serveur push dans le dossier **public** de Lumen, car il va falloir importer socket.io via npm et nous aurons besoin de la librairie client pour l'application AngularJS. Hors, seules les librairies placées dans public sont accessibles aux vues. Vous pouvez tout aussi bien créer un nouveau repository pour votre serveur push, mais il vous faudra alors importer la librairie client [directement depuis le repository associé](https://github.com/Automattic/socket.io) (il s'agit de la même librairie que celle fournie dans socket.io partie serveur).

### Le serveur push

Crééz le fichier **public/package.json** et copiez y le code suivant :

```json
{
  "name": "tuto-push-notifications",
  "version": "0.0.0",
  "dependencies": {
    "express": "^4.12.3",
    "socket.io": "^1.3.5"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "start": "node push/index.js"
  }
}
```

Ici, rien de bien compliqué, nous utilisons Express framework pour créer un serveur web, et la librairie socket.io pour gérer notre push. Un point important à noter cependant, la ligne `"start": "node push/index.js"`. Cela va nous permettre de taper la commande `npm start` pour lancer notre serveur push, nodejs saura directement quel fichier JavaScript lancer.
On lance les commandes suivantes pour installer les librairies nécessaires :

```bash
cd push
npm install
```

Nous allons maintenant coder le fichier de logique du serveur push. Rappelez vous que c'est toujours le serveur PHP qui va envoyer une information au serveur push et et que c'est au serveur push de propager l'information aux clients js. Naturellement il est possible de le faire dans le sens inverse mais ce n'est pas le but de ce tutoriel.
Crééz le fichier **public/push/index.js** et copiez y le code suivant :

```javascript
"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000;

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
    console.info('SocketIO > Connected socket ' + socket.id);

    socket.on('php.message.created', function (response) {
        console.log('php.message.created', JSON.stringify(response));
        io.emit('message.created', response);
    });
    socket.on('php.message.updated', function (response) {
        console.log('php.message.updated', JSON.stringify(response));
        io.emit('message.updated', response);
    });
    socket.on('php.message.deleted', function (response) {
        console.log('php.message.deleted', JSON.stringify(response));
        io.emit('message.deleted', response);
    });

    socket.on('disconnect', function () {
        console.info('SocketIO > Disconnected socket ' + socket.id);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
```

La partie importante ici est celle contenue dans `io.on('connection')`. Lorsque nous nous connectons au serveur push, nous allons garder une socket ouverte entre le client et le serveur. C'est par ce biais que les notifications instantanées se feront.

socket.on() est une méthode dite listener, elle va écouter un channel (exemple : 'php.message.created') et va éxécuter une fonction avec, en paramètre, les données passées par ce channel.

:::info
Afin de bien vous faire comprendre le fonctionnement, j'ai nommé différement les événements. Le serveur push attend un message de la part du serveur PHP sous la forme de channel avec le préfixe 'php.x.x', et il envoie le message aux client js sous la forme de channel sans préfixe.
:::

Pour lancer le serveur, il vous faut entrer les commandes suivantes :

```bash
cd push
npm start
```

### Le serveur PHP
Nous allons utiliser la librairie [https://github.com/Wisembly/elephant.io](https://github.com/Wisembly/elephant.io) pour travailler avec la partie socket.io côté PHP. Pour cela, ouvrez le fichier **composer.json** et ajoutez la dépendance dans votre require.

```json
"require": {
    "wisembly/elephant.io": "~3.0"
},
```

Ensuite, pour pouvoir télécharger la libraire, il vous faut entrer :

```bash
composer install
```

Nous allons maintenant modifier le code de **app/Http/Controllers/MessagesController.php** afin d'ajouter la prise en charge du push. La première chose à faire est d'ajouter un constructeur qui va se charger d'initialiser la connexion au serveur push. Nous allons ensuite définir une méthode `emit()` qui va nous permettre d'envoyer le message au serveur push très simplement.

:::info
J'utilise Homestead comme box Vagrant afin d'obtenir une machine virtuelle simple. Hors l'ip de la machine virtuelle permettant de dialoguer avec 127.0.0.1 est 10.10.2.2. Voici la raison de cette ip. Si vous utilisez PhpMyAdmin ou votre propre serveur, il vous faudra remplacer par votre ip.
:::

```php
<?php

protected $client;

function __construct()
{
    $this->client = new Client(new Version1X("http://10.10.2.2:5000"));
}

/**
 * @param       $channel
 * @param array $data
 */
function emit($channel, Array $data)
{
    $this->logger->info("emit", [$channel, $data]);
    try {
        $this->client->initialize();
        $this->client->emit($channel, $data);
        $this->client->close();
    }
    catch (\RuntimeException $e) {
        $this->logger->error("catch", [$e]);
    }
}
```

Une fois ces deux méthodes ajoutées, nous pouvons maintenant modifier notre action afin d'envoyer le message au serveur push.

```php
<?php

public function store(Request $request)
{
    $inputs = $request->all();
    $createdMessage = Message::create($inputs);
    if ($createdMessage) {

        $this->emit('php.message.created', $createdMessage->toArray());

        return response()->json($createdMessage->toArray(), 201, []);
    }

    return response()->json("error", 400, []);
}
```

Si vous avez lancé un serveur push avec la commande `npm start`, et que vous crééz un nouveau message, vous pourrez voir la ligne 'php.message.created' avec le message au format json dans le terminal nodejs.

### L'application JavaScript

Maintenant que nous avons réalisé les parties serveurs, nous allons lier notre application JavaScript au serveur push. La première chose à faire est de charger la librairie socket.io client. Ajouter la ligne suivant au fichier **resource/views/index.php** :

```html
<script src="node_modules/socket.io/node_modules/socket.io-client/socket.io.js"></script>
```

Maintenant, nous allons modifier le fichier **public/scripts/messages.js** pour y incorper les listeners.
Nous allons dans un premier temps nous connecter au serveur push. Ensuite, nous allons écouter les messages sur les channels JavaScript que nous avions défini dans notre serveur push.


:::info
La fonction lancée lors de la réception d'une notification instantanée n'étant pas liée à AngularJS, il nous est nécessaire d'utiliser le scope pour forcer la mise à jour du ViewModel. N'oubliez pas d'ajouter $scope à vos dépendances.
:::

```javascript
var socket = io.connect("http://localhost:5000");
socket.on('message.created', function (notification) {
    $scope.$apply(function () {
        vm.messages.push(notification);
    });
});
```

Et c'est parti ! Tout est fonctionnel maintenant, vous pouvez supprimer la ligne `$interval(loadData, 2000);` car elle ne nous sera plus d'aucune utilité maintenant que nous avons le push.

## Exercice

Maintenant que nous avons vu comment afficher des nouveaux messages envoyés par d'autres utilisateurs, je vous invite à développer l'API et la gestion de l'édition/suppression des messages.
