---
title: La programmation fonctionnelle
description: ''
date: 2014-08-23
tags: ['tutorial']
layout: layouts/post.njk
keywords: functional programming, programmation fonctionnelle
---

La programmation fonctionnelle est un paradigme de programmation (au même titre que la programmation procédurale ou objet). De la même manière que la programmation fonctionnelle est une évolution de la programmation procédurale, la programmation fonctionnelle est une évolution de la programmation objet. Celle ci peut être utilisée en complément de ces deux paradigmes.
<!-- excerpt -->

:::info
Je tiens à remercier M. Alexandre Delattre pour m'avoir formé à la programmation fonctionnelle, ainsi que pour la relecture et l'amélioration de cet article.
:::

## Les concepts et avantages
La programmation fonctionnelle repose sur plusieurs principes :

### Immutabilité
Ce concept permet de s'assurer de la valeur de nos variables du début à la fin de nos actions. Cela va permettre d'avoir un code plus robuste et plus stable, donc moins de bugs et moins de maintenance.

### Les fonctions d'ordre supérieur
Les fonctions d'ordre supérieur sont des fonctions qui possèdent au moins une des propriétés suivantes :

#### Avoir une ou plusieurs fonctions en paramètre
Vous avez sûrement déjà utilisé ce concept sans connaitre son nom. Voici un exemple :

```javascript
var array = [1,2,3,4,5,6];

// retourne true si la variable est pair, false sinon.
var isEven = function(v) {
    return v % 2 == 0;
};

// retourne [2, 4, 6]
var evens = array.filter(isEven);
```

On peut voir que le code est compact et très simple à lire. Voici l'équivalent en procédural :

```javascript
var evens = [];

for (var i=0; i < array.length; i++) {
    if (isEven(array[i])) {
        evens.push(array[i]);
    }
}
```

On se rend compte que le code est beaucoup moins lisible dans ce deuxième cas et qu'il va être obligatoire d'écrire des commentaires pour simplifier sa lecture.

#### Renvoyer une fonction
Cette propriété permet de renvoyer une fonction au lieu d'une valeur. Voici un exemple :

```javascript
function adder(value) {
    return function(inc) {
         return value + inc
  }
    
}
var add10 = adder(10)
add10(5) // returns 15
```

### lambda
Les lambdas, aussi appelées fonctions anonymes, sont des fonctions utilisées de manière ponctuelle et n'effectuant généralement qu'une opération. Reprenons l'exemple de isEven().

```javascript
// utilisation d'une lambda en JavaScript
var evens = array.filter(function(v) {
    return v % 2 == 0;
});

// utilisation d'une lambda en CoffeeScript
var evens = array.filter((v) -> v % 2 == 0);
```

Certains langages, comme JavaScript ou PHP sont encore verbeux sur l'utilisation des lambdas. Java, CoffeeScript ou Scala exploitent toute la puissance des lambdas pour avoir un code à la  fois concis, clair et robuste.

### Récursivité
Il est possible d'utiliser la programmation fonctionnelle de manière récursive.

> En informatique et en logique, une fonction ou plus généralement un algorithme qui contient un appel à elle-même est dite récursive.
> --- [Wikipedia](http://fr.wikipedia.org/wiki/R%C3%A9cursivit%C3%A9)

Cela va permettre d'avoir un code plus lisible et plus court. De plus, le code s'auto documenter de lui-même. Voici un exemple d'une fonction récursive.

```javascript
var array = [1, 2, [3, 4], 5, [6, [7,8]]];

var addOne = function(v) {
    if(v instanceof Array) {
        // on va relancer addOne() pour 3, 4, 6, 7 et 8
        return v.map(addOne);
    }
    else {
        return v + 1;
    }
}

// retourne [2, 3, [4, 5], 6, [7, [8, 9]]]
array.map(addOne);
```

## Les inconvénients ?
L'inconvénient majeur est la performance, comme vous pourrez le voir dans les exemples, nous allons créer plusieurs boucles, là où nous n'en utiliserions qu'une avec un autre paradigme. Après avoir utilisé la programmation fonctionnelle pendant plusieurs mois, je n'ai pas remarqué de lenteurs dans le traitement. Cela va se ressentir dans des cas extrêmes (quantité de données monstrueuse, faible puissance de calcul), dans ces cas-là, il vaut mieux éviter la programmation fonctionnelle.

Il est à noter que certains compilateurs sont capables de transformer des appels récursifs en boucles (notion de recusive terminale, tail recursion en anglais)

## Quelques méthodes et exemples
Voici la description des méthodes les plus utilisées. Cette liste n'est pas exhaustive, je vous invite à voir le site de Mozilla sur les [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) pour voir la liste complète.

### filter
C'est une fonction que vous avez souvent vu dans cet article. Comme son nom l'indique, il prend en paramètre deux éléments :

  * un tableau
  * une fonction permettant de tester si la valeur correspond à notre filtre.

```javascript
var persons = [{
    name : 'John',
    age : 18
},
{
    name : 'Doe',
    age : 21
},
{
    name : 'Kevin',
    age : 15
}];

var isAdult = function(v) {
    return v.age >= 18;
};
var adults = persons.filter(isAdult);
```

### map/ forEach
Ces méthodes vont permettre de transformer un objet, en un autre objet. `map()` doit être utilisé de manière immutable (d'un objet A vers un objet B), c'est à dire que vous ne devez pas introduire d'effet de bord , si vous devez modifier une valeur dans les objets déjà présents (d'un objet A vers un objet A'), vous devez utiliser le forEach.

```javascript
var users = [{
    name : 'John',
    lat : 48, 1,
    lng : -3,1
}, {
    ...
}];

// transforme un tableau d'objet User
// en un tableau d'objet Marker de Google Maps
// les coordonnées sont celles de chaque utilisateur
var markers = users.map(function(u) {
    return new google.maps.Marker({
        position : new google.maps.LatLng(u.lat, u.lng),
        map      : map,
        title    : u.name
    });
});

// modifie le tableau User
// pour ajouter une propriété
// on introduit un effet de bord (modification de l'objet)
var users = users.forEach(function(u) {
    u.isGeocoded = u.lat && u.lng;
    return u;
});
```

### fold
Cette méthode possède plusieurs noms suivant le langage de programmation. Cela peut être `reduce()`, `fold()`ou `foldLeft()`. Son rôle est de calculer une valeur finale en partant d'une valeur initiale et en traversant une collection (de gauche à droite).

```javascript
var players = [{
    name  : 'John',
    hit   : 12,
    error : 3
},{
    name  : 'Doe',
    hit   : 8,
    error : 2
}, {
    name  : 'Kevin',
    hit   : 2,
    error : 5
}];

var hitPoints = 200;
var errorPoints = 100;
var teamPoints = 0;

var addHitPoints = function(previousValue, currentValue) {
    return previousValue + currentValue.hit * hitPoints;
};

var hitPoints = players.reduce(addHitPoints, teamPoints);
```

Il existe la méthode complémentaire,`reduceRight()` ou `foldRight()`, qui traverse la collection de droite à gauche. Cela n'a aucune importante sur une opération associative (+ ou *) mais peut en avoir une sur une opération non associative (-, /).

```javascript
var removeErrorPoints = function(previousValue, currentValue) {
    return previousValue - currentValue.error * errorPoints;
};

var teamPoints = players.reduceRight(removeErrorPoints, hitPoints);
```

## La programmation fonctionnelle par langage

### JavaScript
JavaScript utilise la programmation fonctionnelle depuis quelques temps déjà. Certaines implémentations ne sont disponibles que pour EcmaScript 6, cependant, il est possible de trouver des polyfills sur le site de Mozilla. [Les fonctions disponibles pour Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

Vous avez deux solutions pour intégrer la programmation fonctionnelle à JavaScript :

  1. Ajouter les polyfills dans un fichier spécifique.
  2. Utiliser des librairies comme [underscore.js](http://underscorejs.org/) ou [moutjs](http://moutjs.com/).

### PHP
PHP possède aussi des notions de programmation fonctionnelle, cependant celles-ci sont moins bien intégrées dans le langage.

Tout d'abord, les fonctions ne sont pas liées à un objet :

```javascript
// impossible de réaliser ceci
// JavaScript
var array = [1,2,3,4,5,6];
array.filter(function(v) { return v%2 == 0; })

// utilisation en PHP
$array = [1,2,3,4,5,6];
array_filter($array);
```

Ensuite, le chainage de fonctions rend la compréhension moins facile, alors que cela devrait être le contraire.

```javascript
// en JavaScript
var array = [1,2,3,4,5,6];
// retourne les éléments pairs
// et applique une transformation qui les multiplie par eux même
// retourne [4, 16, 36]
array.filter(function(v) { return v%2 == 0; })
     .map(function(v) { return v*v; })

// en PHP
$array = [1,2,3,4,5,6];
$square = function($v) {
    return $v * $v;
};
$isEven = function($v) {
    return $v%2 == 0
};

array_map($square, array_filter($array, $isEven));
```

On peut voir qu'en PHP, outre l'inconsistance de l'ordre des paramètres, il est nécessaire de lire de droite à gauche pour comprendre le mécanisme. La lecture est moins fluide, mais le résultat sera similaire.

### Java
Java est un langage avec une orientation objet très forte. A ce titre, beaucoup de développeurs étaient réticents à l'import de la programmation fonctionnelle dans ce langage. Il apparait néanmoins timidement dans la version 8.

Android n'intégrant pas encore la version 8 de Java, la programmation fonctionnelle n'est pas encore prise en charge de manière officielle.

### Scala
Scala répond au besoin des développeurs Java souhaitant avoir un langage fonctionnel. En ce sens, l'intégration de la programmation fonctionnelle est très poussée.

### Swift
Swift est le nouveau langage de programmation d'Apple. Sa syntaxe étant plus légère qu'Objective-C, il intègre les composantes de programmation fonctionnelle contrairement à son ainé.

### Conclusion
D'une manière générale, il est possible de voir que les langages évoluent vers une utilisation massive de la programmation fonctionnelle. La puissance de nos machines compensant son seul défaut, il est recommandé d'en user et abuser.
