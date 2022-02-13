---
title: Créer un site avec Jekyll. Partie 2 - Création des pages
description: ''
date: 2013-10-13
tags: ['tutorial']
layout: layouts/post.njk
keywords: jekyll, tutoriel, jekyll french
demo: http://pierrebaron.fr/tuto_blog_jekyll/
download: https://github.com/prbaron/tuto_blog_jekyll/tree/chapitre2
---

Nous allons voir dans ce deuxième chapitre le fonctionnement de Jekyll et nous allons commencer à développer en créant nos premières pages statiques.
<!-- excerpt -->

1. [Partie 1 - Introduction & Installation]({{ '/blog/2013-10-13-jekyll-site-part1' | url }})
2. [Partie 2 - Création des pages]({{ '/blog/2013-10-13-jekyll-site-part2' | url }})
3. [Partie 3 - Création du blog]({{ '/blog/2013-12-14-jekyll-site-part3' | url }})
4. [Partie 4 - Gestion des catégories]({{ '/blog/2014-02-08-jekyll-site-part4' | url }})
5. [Partie 5 - Finitions]({{ '/blog/2014-02-08-jekyll-site-part5' | url }})
6. [Partie 6 - Déploiement]({{ '/blog/2014-02-23-jekyll-site-part6' | url }})
### Création d'un nouveau projet

Dans un premier temps, veuillez vous placer dans le dossier parent où vous souhaitez créer votre projet, et lancez la commande suivante :

```shell
jekyll new {pseudo_github}.github.com // exemple jekyll new prbaron.github.com
```

Cela va vous créer un dossier avec le votre pseudo GitHub suivi de l'adresse du service. Il permettra de gérer le repository github plus facilement lors de la mise en ligne de notre site.

### Structure du projet

#### Analyse de la structure

Une fois votre projet jekyll créé, vous allez vous retrouver avec la structure suivante :

  * <i class="icon icon-file-alt"></i> **_config.yml** // fichier de configuration de notre blog
  * <i class="icon icon-folder-close-alt"></i> **_layouts** // dossier permettant de créer des templates pour nos pages ou nos articles
  * <i class="icon icon-folder-close-alt"></i> **_posts** // dossier permettant d'écrire nos articles en [Markdown](http://daringfireball.net/projects/markdown/) ou en [Textile](http://textile.sitemonks.com/)
  * <i class="icon icon-folder-close-alt"></i> **css** // dossier dans lequel nous allons ajouter nos fichiers css
  * <i class="icon icon-file-alt"></i> **index.html**

  Pour voir le résultat, vous pouvez lancer la commande `jekyll serve`. Elle va se charger de générer votre site à partir des templates et des articles markdown pour créer toutes les pages en HTML. Vous retrouverez le site dans le dossier ___site__ qui vient de se créer à la racine du projet. Vous pouvez ensuite visionner votre site à l'adresse *[http://localhost:4000/](http://localhost:4000/)*.

:::info
les fichiers et dossiers précédés d'un underscore (_) sont considérés comme privés et non accessibles par l'url. Ils servent lors de la génération du site. Avant sa mise en ligne donc.
:::

Vous pouvez créer autant de dossiers que souhaités, comme par exemple un dossier images, musiques, ….

#### Préparation de la structure complète

Il est possible de rajouter divers dossiers pour compléter le fonctionnement de Jekyll, nous allons rajouter les dossiers suivants :

 * <i class="icon icon-folder-close-alt"></i> **_includes** // dossier contenant des éléments de code réutilisables sur plusieurs pages et/ou templates
 * <i class="icon icon-folder-close-alt"></i> **fonts** // dossier comportant nos polices personnalisées, ce dossier est public
 * <i class="icon icon-folder-close-alt"></i> **js** // dossier comportant nos fichiers javascript, ce dossier est public

### Choix de l'url

Nous allons maintenant créer nos deux pages de notre site, à savoir la page d'accueil et la page _A propos_.

Vous avez deux possibilités pour créer des pages :

  1. Créer toutes les pages à la racine et les nommer par le nom de page (ex : index.html, about.html, …), cela donnera une url comme _http://localhost:4000/about.html_.
  2. Créer un dossier comportant le nom de la page et y ajouter un fichier index.html. Cela donnera une url sous la forme _http://localhost:4000/about/_.

Dans notre cas, nous allons choisir la deuxième solution. Il nous faut donc créer le dossier **about** et y ajouter le fichier **index.html**.

:::info
Sachez que les deux solutions produisent le même résultat en terme de fonctionnalités. La seule différence revient dans l'url à entrer.
:::


### Création des pages

#### Le template
Les personnes ayant travaillé avec des frameworks serveurs comme CakePHP ou autres, connaissent bien le principe des templates. Pour les autres, un template est un conteneur, une base commune à toutes les pages. Ce template va nous permettre de créer un fichier contenant les éléments communs comme `<head>`, `<body>`, … . Nous allons ensuite y ajouter une instruction pour expliquer à Jekyll où placer le contenu des pages lors de sa génération.

Ouvrez le fichier **_layouts/default.html**, videz le et ajoutez le code suivant :

```html
{% raw %}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>{{ page.title }}</title>
    <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" href="{{site.url}}/css/bootstrap.min.css">
</head>
<body>
    {% include menu.html %}

    <div class="container">

         {{ content }}

        {% include footer.html %}
    </div> <!-- /container -->

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript" src="{{site.url}}/js/bootstrap.min.js"></script>
</body>
</html>
{% endraw %}
```

Les éléments HTML vous sont familiers donc je ne m'attarderai pas dessus. En revanche vous remarquerez plusieurs instructions inconnues {% raw %}(`{{page.title}}`,  `{{content}}`,  `{% include menu.html %}`) {% endraw %}. Ce sont des variables [Liquid](http://wiki.shopify.com/Liquid). Les personnes familières avec des moteurs de template comme Twig connaissent très bien le principe. Pour les autres, ces variables permettent à un designer de coder très facilement un template ou un layout, tout en gardant un code clair, efficace et sécurisé. Le moteur de template se chargeant le plus souvent de réaliser des actions comme le nettoyage de variables avant inclusion.

Les éléments possédant deux parenthèses (ex : {% raw  %}  `{{page.title}}` {% endraw  %}) correspondent à des variables que nous allons incorporer dans notre fichier de page ou d'articles. Nous verrons plus en détail comment créer ces informations lors de la création d'articles. Sachez qu'il existe plusieurs variables principales :

  * _site_ // tout ce qui est relatif au site et configuré dans **_config.yml**
  * _page_ // tout ce qui est relatif à une page ou un article
  * _post_ // tout ce qui est relatif à un article
  * _paginator_ // tout ce qui est relatif à la pagination

Ces variables seront remplacées par leurs valeurs respectives lors de la génération. La variable `content` est celle utilisée pour remplir le contenu du template avec la page ou l'article.

Les éléments possédant une parenthèse et un pourcentage (ex : {% raw  %} `{% include footer.html %}` {% endraw  %}) sont l'équivalent du `include` en PHP. Dans notre cas, nous avons créé un include pour le menu et un autre pour le footer. Vous pouvez créer tous les includes que vous le souhaitez.

### Les includes

Allez dans le dossier **_includes** et créez les deux fichiers cités plus haut, à savoir **menu.html** et **footer.html**.

**menu.html**

```html
{% raw %} 
<nav class="navbar navbar-default navbar-static-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="{{site.url}}/">Mon site</a>
        </div>

        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav"><li><a href="{{site.url}}/">index</a></li>
                <li><a href="{{site.url}}/about/">A propos</a></li>
                <li><a href="mailto:exemple@exemple.com">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>
{% endraw %}
```

**footer.html**

```html
{% raw %}
<footer style="margin-bottom: 20px;">
  <hr>
2012 - {{ site.time | date: '%Y' }} &copy; Nom du développeur
</footer>
{% endraw %}
```

Vous remarquez que vous pouvez utiliser les variables Liquid aussi bien dans les templates que dans les includes. Vous remarquez une deuxème chose, l'utilisation d'un pipe (\|) permettant l'ajout d'un filtre. Ce filtre va nous permettre d'afficher la date dans le format désiré, ici l'année.

Les filtres sont un élément important du fonctionnement de jekyll, vous pourrez ainsi choisir de n'afficher que certains articles en rapport avec une catégorie souhaitée, limiter le nombre d'articles à afficher, ….

### La page index.html

#### le front

Chaque page et chaque article commence par un front matter. Il s'agit d'un bloc yaml permettant d'y insérer des informations nécessaires à la génération du site.
Il débute et finit par `---`. Les variables sont définies sous la forme clé:valeur.


```html
{% raw %}
---
layout: default
title: Mon blog
---
{% endraw %}
```

La variable layout est une variable obligatoire pour chaque page et article. Elle permet de savoir quel template utiliser pour créer la page HTML complète.

La variable title va être cette utilisée dans {% raw  %}`{{page.title}}` {% endraw  %}.

#### le contenu

Le contenu est une simple page web écrite en HTML classique. J'ai choisi d'utiliser Bootstrap pour simplifier le tutoriel et ne pas m'embêter avec le design. Vous pouvez créer la structure de votre choix.

```html
<div class="jumbotron">
    <div class="container">
        <h1>Hello, world!</h1>
        <p>...</p>
    </div>
</div>

<div class="row">
    <div class="col-md-6">
        <p>Lorem ipsum dolor sit amet, ...</p>
    </div>
    <div class="col-md-6">
        <p>Vestibulum vulputate eros eu cursus ultricies. ...</p>
    </div>
</div>
```

### La page about/index.html

La page **about/index.html** suit exactement le même format que la page précédente, à savoir un front matter et un contenu.

```html
{% raw %}
---
layout: default
title: A propos de moi
---

<div class="row">
    <div class="col-md-12">
        <h1>Nom du développeur</h1>
    </div>
    <div class="col-md-4">
         <img src="http://placekitten.com/300/200" alt="..." class="img-thumbnail pull-left">
    </div>
    <div class="col-md-8">
        <p class="pull-left">Lorem ipsum dolor sit amet, ...</p>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <h1>Compétences</h1>
    </div>

    <div class="col-md-4">
        <h2>Compétence 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
    </div>
    <div class="col-md-4">
        <h2>Compétence 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
    </div>
    <div class="col-md-4">
        <h2>Compétence 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <h1>Ecole</h1>
        <h2>Ecole 1</h2>
        <p...</p>
        <h2>Ecole 2</h2>
        <p>...</p>
        <h2>Ecole 3</h2>
        <p>...</p>
    </div>
</div>
{% endraw %}
```


### Résultat

Pour afficher le résultat, lancez la commande `jekyll serve` pour prendre en compte les modifications effectuées. Pour simplifier le développement, nous allons maintenant utiliser la commande `jekyll serve --watch` qui se charge de regarder si des changements ont été effectués et de régénérer le site le cas échéant.

### Conclusion

Cette partie nous a permis de voir la structure d'un projet jekyll, la structure d'une page, le fonctionnement des templates et includes, ainsi que l'utilisation des variables Liquid.

Dans le prochain chapitre, nous verrons comment créer un blog et comment écrire nos articles.
