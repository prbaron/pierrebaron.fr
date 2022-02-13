---
title: Créer un site avec Jekyll. Partie 3 - Création du blog
description: ''
date: 2013-12-14
tags: ['tutorial']
layout: layouts/post.njk
keywords: jekyll, tutoriel, jekyll french
demo: http://pierrebaron.fr/tuto_blog_jekyll/
download: https://github.com/prbaron/tuto_blog_jekyll/tree/chapitre3
---

Maintenant que nous avons nos pages statiques, nous allons créer la base de notre blog, à savoir les pages de listing d'articles, ainsi que les pages permettant de lire l'article au complet.

1. [Partie 1 - Introduction & Installation]({{ '/blog/2013-10-13-jekyll-site-part1' | url }})
2. [Partie 2 - Création des pages]({{ '/blog/2013-10-13-jekyll-site-part2' | url }})
3. [Partie 3 - Création du blog]({{ '/blog/2013-12-14-jekyll-site-part3' | url }})
4. [Partie 4 - Gestion des catégories]({{ '/blog/2014-02-08-jekyll-site-part4' | url }})
5. [Partie 5 - Finitions]({{ '/blog/2014-02-08-jekyll-site-part5' | url }})
6. [Partie 6 - Déploiement]({{ '/blog/2014-02-23-jekyll-site-part6' | url }})
### Ajout du lien dans le menu

Dans un premier temps, Il nous faut modifier le menu pour ajouter une possibilité d'action vers le blog. Je vous rappelle que le fichier se trouve dans __includes/menu.html_.

```html
{% raw %}
<li><a href="{{site.url}}/blog/">Blog</a></li>
{% endraw %}
```

### Lister les articles

Créer un nouveau fichier **blog/index.html** et copiez y le code suivant. Nous verrons la création d'articles un peu plus tard, pour l'instant contentez vous de copiez celui présent par défaut dans le dossier **_posts_** pour obtenir votre liste.

```html
{% raw %}
---
layout: default
title: Mon blog
---

<div class="row">
    <div class="col-md-12">
        <h1>Mon blog</h1>
        {% for post in paginator.posts %}
            <div>
                <h3>{{ post.title }} <small>{{post.date | date_to_string }}</small></h3>
                <p>{{post.excerpt}}</p>
                <p><a href="{{site.url}}{{post.url}}" class="btn btn-default">Lire plus</a></p>
            </div>
            <hr>
        {% endfor %}

        {% include pagination.html %}
    </div>
</div>
{% endraw %}
```

On retrouve toujours le front matter, définit entre les tirets. Notre page est un sous layout de défaut.

Une page de liste d'articles correspond tout simplement à une boucle récupérant tous les articles contenus dans notre dossier _posts et se contentant d'afficher les diverses informations.

Nous avons deux moyens de lister les articles :

1. **site.posts** // liste tous les articles sur une seule page
2. **paginator.posts** // liste un nombre fixe d'articles sur une page, une pagination est créée si le nombre d'articles dans le dossier _posts est supérieur au nombre d'articles à afficher par page.

Nous allons utiliser le deuxième moyen, qui sera plus pérenne sur le long terme.

La ligne 9 représente une boucle foreach() dans les langages Objet, elle est ici au format Liquid. Elle signifie en français "prends tous les articles (paginator.posts), et pour chacun, affiche le code suivant : (code contenu entre le tag for et endfor)". Chaque nouvel article sera placé dans la variable post et cela nous permettra de récupérer les informations contenu dans son front matter.

:::info
Certaines propriétés, comme date ou url, sont directement récupérées par Jekyll depuis le nom ou le chemin du fichier, il n'est donc pas nécessaire de les ajouter dans le front matter.
:::

### La pagination

#### Activer la pagination
Veuillez ouvrir le fichier **_config.yml** et y ajouter le code suivant :

```yaml
{% raw %}
url: http://localhost:4000    # l'url finale de votre site. Elle est utilisée dans la variable site.url
name: Your New Jekyll Site    # le nom de votre site
markdown: rdiscount           # le parseur de Markdown à utiliser pour parser vos fichiers. La syntaxe Markdown peut changer suivant le parseur utilisé
paginate: 3                   # le nombre d'articles à afficher par page
paginate_path: /blog/page:num # l'url générée pour la pagination
permalink: /blog/:title       # l'url générée pour la visualisation d'un article complet
{% endraw %}
```

##### Créer le markup HTML

Vous trouverez dans la [documentation jekyll](http://jekyllrb.com/docs/pagination/) deux implémentations de la pagination, la première est l'implémentation basique, la deuxième l'implémentation avancée. Nous allons utiliser la dernière car elle gère mieux le retour à la première page du listing d'articles. La syntaxe est un peu plus complexe par contre.

```html
{% raw %}
<ul class="pagination">
    <li {% if paginator.previous_page %} {% else %} class="disabled" {% endif %}>
        {% if paginator.previous_page %}
            {% if paginator.previous_page == 1 %}
                <a href="{{site.url}}/blog/">&laquo;</a>
            {% else %}
                <a href="{{site.url}}/blog/page{{ paginator.previous_page }}">&laquo;</a>
            {% endif %}
        {% else %}
            <span>&laquo;</span>
        {% endif %}
    </li>

     <li {% if paginator.page == 1 %} class="active" {% endif %}>
        <a href="{{site.url}}/blog/">1</a>
    </li>

    {% for count in (2..paginator.total_pages) %}
        <li {% if count == paginator.page %} class="active" {% endif %} >
            <a href="{{site.url}}/blog/page{{ count }}">{{ count }}</a>
        </li>
    {% endfor %}

    <li {% if paginator.next_page %} {% else %} class="disabled" {% endif %}>
        {% if paginator.next_page %}
            {% if paginator.next_page == 1 %}
                <a href="{{site.url}}/blog/">&raquo;</a>
            {% else %}
                <a href="{{site.url}}/blog/page{{ paginator.next_page }}">&raquo;</a>
            {% endif %}
        {% else %}
            <span>&raquo;</span>
        {% endif %}
    </li>
</ul>
{% endraw %}
```

Le code est long mais il n'est pas très complexe, il s'agit simplement d'une suite de boucles et de conditions. Le markup HTML est celui de Bootstrap, si vous utilisez un code personnalisé, il vous suffit de modifier les classes.

### L'article
Nous allons maintenant voir le code nécessaire à la visualisation d'un article de manière complète.

#### Le template
Le layout **default.html** est un peu vide pour la présentation d'un article, pas d'affichage du titre, de la date, .... . Nous allons donc créer notre nouveau template. Veuillez ajouter le fichier **post.html** dans le dossier **_layouts**.

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

            <div class="row">
                <div class="col-md-12">
                    <h1>{{ page.title }} <small>{{ page.date | date_to_string }}</small></h1>
                    {{ content }}

                    <ul class="pager">
                        {% if page.previous %}
                            <li class="previous"><a href="{{site.url}}{{ page.previous.url }}">&larr; {{ page.previous.title }} </a></li>
                        {% endif %}
                        {% if page.next %}
                            <li class="next"><a href="{{site.url}}{{ page.next.url }}">{{ page.next.title }} &rarr;</a></li>
                        {% endif %}
                    </ul>
                </div>
            {% include footer.html %}
        </div> <!-- /container -->

        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script type="text/javascript" src="{{site.url}}/js/bootstrap.min.js"></script>
    </body>
</html>
{% endraw %}
```

La ligne 18 permet d'afficher les informations relatives à l'article, pour l'instant nous n'affichons que la date. Nous pourrions y rajouter d'autres informations telles que l'auteur, la catégorie, .... Toutes les informations comprises dans le front matter sont accessibles via l'objet page. Je vous rappelle que vous pouvez y ajouter n'importe quel champ dans votre front matter.

Vous pouvez aussi remarquer qu'à partir de la ligne 21, nous proposons un moyen de passer rapidement à l'article suivant ou précédent.

#### L'article
Intéressons nous maintenant au plus important de ce tutoriel, le fichier markdown dans lequel nous allons écrire le contenu de notre article. Quelques règles établies par Jekyll pour que la page soit bien reconnue :

1. L'article doit être dans le dossier **_posts**
2. Le nom de l'article doit être comme suit {année}-{mois}-{jour}-{nom}.{extension} (exemple : 2013-12-14-jekyll.md)
3. L'extension doit être une extension Markdown, (.md, .mdown, .markdown)

 Un article est composé de deux parties :

 1. Le front matter qui va permettre de définir les informations relatives à l'article (l'auteur, la catégorie, ....)
 2. Le contenu de l'article

 Le code minimum pour le front matter est le suivant. Dans les prochains tutoriels nous y rajouterons d'autres propriétés, comme la catégorie par exemple.

```yaml
{% raw %}
---
layout: post
title:  "Post un"
---
{% endraw %}
```

 Votre contenu est tout simplement du code markdown. Pour ce tutoriel, j'ai choisi d'utiliser [RDiscount](http://dafoster.net/projects/rdiscount/), car il permet une représentation fidèle du Markdown d'origine et ajoute des éléments essentiels.

### Conclusion

Cette partie nous a permis de voir la pagination, la création d'un nouveau layout et l'écriture de notre premier article.

Dans le prochain chapitre, nous verrons comment ajouter les catégories pour pouvoir proposer des filtres à vos internautes.
