---
title: Déployer une application Yeoman/AngularJS sur Heroku
description: ''
date: 2015-03-04
tags: ['tutorial']
layout: layouts/post.njk
keywords: heroku, yeoman, angular, angularjs, deploy, déploiement
demo : https://deployangularjsheroku.herokuapp.com/#/
download : https://github.com/prbaron/tuto_deploy_yeoman_angular_heroku---
---

Beaucoup de tutoriels sur Internet vous expliquent comment déployer une application Yeoman/AngularJS avec Heroku. Cependant, elles ont toutes un souci, l'ajout du dossier **dist** (contenant les fichiers compilés) dans le repository Git. J'ai donc décidé d'écrire mon propre tutoriel en ayant à l'esprit que le repository Git ne doit contenir que les sources. La génération finale sera effectuée par Heroku.

Dans ce tutoriel, nous allons voir comment déployer une application AngularJS créée par le générateur [generator-angular](https://github.com/yeoman/generator-angular). Ce tutoriel est basé sur [http://www.sitepoint.com/deploying-yeomanangular-app-heroku/](http://awaxman11.github.io/blog/2014/07/13/how-to-create-an-angular-app-using-yeoman-and-deploy-it-to-heroku/). 

## Prérequis
Avant de continuer il vous faut les éléments suivants : 

  * Avoir créé [un compte heroku](https://dashboard.heroku.com/) et [installé le heroku toolbelt](https://toolbelt.heroku.com/)
  * Avoir installé [NodeJS](http://nodejs.org/) et [NPM](https://www.npmjs.com/)
  * avoir installé [yeoman](http://yeoman.io/) et le [générateur generator-yeoman](https://github.com/yeoman/generator-angular#usage)
  
## L'application

### création du projet
On ouvre le terminal, on se créé un dossier et on lance la commande :

```bash
yo angular myApp
```

Suivez les instructions à l'écran pour finaliser la  génération du projet.

### Préparation du projet pour Heroku

Le souci de ce projet est qu'il ne contient que des pages statiques, il va donc falloir intégrer un serveur web pour qu'Heroku puisse le faire fonctionner correctement.  Pour cela, nous allons utiliser Express, un framework NodeJS.

```bash
npm install gzippo express morgan --save
```

Ensuite, à la racine du projet, nous allons créer un fichier **web.js** :

```javascript
var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
```

Ce fichier va être lancé par Heroku et se charge de gérer le serveur web avec le contenu du dossier **dist**. Ce dossier va être généré par notre projet grunt. 

Toujours à la racine du projet, veuillez créer un fichier **Procfile** avec le contenu suivant :

```bash
web: node web.js
```

### Suppression de grunt-ngAnnotate

Pour ma part, je n'ai jamais réussi à faire fonctionner grunt-ngAnnotate avec Heroku, j'ai donc décidé de le supprimer. Cela va impliquer qu'il faudra préparer l'injection de dépendance à la main.

```javascript
// changez ça
angular.module('myAppApp')
    .controller('MainCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });

// en ça
angular.module('myAppApp')
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
}]);

// ou en ça
// les deux éléments font la même chose
// seule la syntaxe diffère
angular.module('myAppApp')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope'];
function MainCtrl($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}
```

Répétez cette opération pour tous vos fichiers.

Ouvrez le fichier **Gruntfile.js** et supprimez tout ce qui a attrait à ngAnnotate.

### Création du respository git

Il suffit d'entrer la commande suivante dans votre terminal :

```bash
git init
```


## Heroku

### Création de l'application dans Heroku

A l'heure actuelle, nous avons une application qui se trouve sur votre ordinateur, qui n'est ni sur Heroku, ni sur un serveur Git. Nous avons aussi un compte Heroku (sans application) et le Heroku toolbelt d'installé. 

Pour créer une application dans Heroku, il vous faut entrer ceci dans votre terminal. Comme votre dossier comprend un fichier package.json, Heroku comprend qu'il s'agit d'un projet nodejs.

```bash
heroku login
heroku create myApp
heroku ps:scale web=1
```

### Utilisation d'un buildpack personnalisé
Le souci premier du buildpack nodejs officiel est qu'il ne lance aucune commande au démarrage (pas de Bower ni de Grunt). Nous allons donc utiliser [un buildpack personnalisé](https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt) pour remédier à ce problème. Ce dernier va lancer la commande `heroku:production` à la compilation de l'application.

Veillez entrer les commandes suivantes dans votre terminal. La première se charge d'instancier l'application avec le bon buildpack, la seconde de mettre l'application en mode production.

```bash
heroku config:add BUILDPACK_URL=https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
heroku config:set NODE_ENV=production
```


### Bower et Grunt pour Heroku

Il nous faut maintenant définir la commande `heroku:production` dans notre fichier **Gruntfile.js**.

Ajoutez ces lignes à la fin de votre fichier.

```javascript
grunt.registerTask('heroku:production', [
  	'build'
]);
```

Par defaut, Bower ne sera pas lancé par Heroku, nous allons donc l'automatiser avec le plugin [grunt-bower-task](https://github.com/yatskevich/grunt-bower-task).

```bash
npm install grunt-bower-task --save
```

Ouvrez le fichier **Gruntfile.js** et ajoutez ceci :

```javascript
grunt.initConfig({
  bower: {
    install: {
       //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
    }
  }
});
```

ensuite ajoutez la tâche à la commande 'heroku:production' : 

```javascript
grunt.registerTask('heroku:production', [
    'bower:install',
    'build'
]);
```

Par défaut, Heroku ne va installer que les dépendances comprises dans 'dev' et non pas dans 'devDependencies'. Vous avez donc deux choix : 

  1. Dupliquer les dépendances
  2. Autoriser l'installation des dépendances 'devDependencies'.
 
Si vous choisissez la seconde solution, il vous faudra écrire ceci dans la console : 

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

### Envoyer sur Heroku

Pour se faire, il faudra utiliser les commandes de Git. Ouvrez un terminal et entrez les commandes suivantes :  

```bash
git add .
git commit -m "Initial commit"
git push heroku master
```

## Conclusion

Ce déploiement permet de garder un repository Git propre avec seulement les sources. Vous avez toujours la possibilité de réaliser un 'grunt build' en local pour vous assurer que tout se passera bien une fois sur Heroku.
Enfin, notre déploiement est automatisé et se chargera d'offrir une application légère avec des fichiers concaténés et minifiés.

Heroku vous propose même d'aller plus loin, avec un webhook sur un repository GitHub et de ne faire le déploiement seulement si vos tests passent. Utilisez donc le trio GitHub - Travis CI - Heroku et vous avez un système qui fonctionnera tout seul !
