---
title: Créer un site avec Jekyll. Partie 2 - Finitions
description: ''
date: 2014-02-08
tags: ['tutorial']
layout: layouts/post.njk
keywords: jekyll, tutoriel, jekyll french
demo: http://pierrebaron.fr/tuto_blog_jekyll/
download: https://github.com/prbaron/tuto_blog_jekyll/tree/chapitre5
---

Notre site est presque prêt, nous allons maintenant ajouter les dernières fonctionnalités pour qu'il soit complet.

1. [Partie 1 - Introduction & Installation]({{ '/blog/2013-10-13-jekyll-site-part1' | url }})
2. [Partie 2 - Création des pages]({{ '/blog/2013-10-13-jekyll-site-part2' | url }})
3. [Partie 3 - Création du blog]({{ '/blog/2013-12-14-jekyll-site-part3' | url }})
4. [Partie 4 - Gestion des catégories]({{ '/blog/2014-02-08-jekyll-site-part4' | url }})
5. [Partie 5 - Finitions]({{ '/blog/2014-02-08-jekyll-site-part5' | url }})
6. [Partie 6 - Déploiement]({{ '/blog/2014-02-23-jekyll-site-part6' | url }})
### classe active sur menu
Pour une meilleur usabilité, il est recommandé d’avoir le lien actif dans une autre couleur. Nous allons voir qu’il est totalement possible de réaliser cet effet sans l’aide de JavaScript mais avec les balises Liquid.

Le principe va être de ne plus écrire les liens dans le markup HTML, mais dans le fichier **_config.yml**.

#### Le markup HTML
Allez dans le fichier **_includes/menu.html** et éditez le markup de la navigation. Supprimez tous les liens HTML créés précédemment et remplacez le par le code suivant.

```html
{% raw %}
<ul class="nav navbar-nav">
    {% for link in site.navigation %}
        {% assign current = nil %}
        {% assign currentPage = page.url | remove: 'index.html' %}
        {% if currentPage == link.url or page.layout == link.layout %}
            {% assign current = 'active' %} // changer le nom de la classe
        {% endif %}
        <li class="{{current}}"><a href="{{site.url}}{{ link.url }}">{{ link.text }}</a></li>
    {% endfor %}
    <li><a href="mailto:exemple@exemple.com">Contact</a></li>
</ul>
{% endraw %}
```

Ce code se charge d’analyser l’url de votre page lors de la génération pour lui appliquer la classe ``.active`` sur le bon lien.

#### Le fichier de configuration

Ouvrez le fichier **_config.yml** et ajoutez les lignes suivantes

```yaml
{% raw %}
navigation:
    - text: Index       // nom affiché dans le lien
      url: /            // url affiché dans la barre de recherche
    - text: A propos
      url: /about/
    - text: Blog
      url: /blog/
      layout: post      // vous pouvez définir le type de layout à utiliser
{% endraw %}
```

Les urls sont celles générées par Jekyll suivant le format que vous avez choisi d’utiliser. Par exemple, si vous avez préféré utiliser about.html, il vous faudra mettre ``/about.hml`` au lieu de ``/about/``. Vous pouvez rajouter autant d’adresses que vous le souhaitez, et y définir le layout à utiliser.

### Les commentaires

#### Créer votre profil et site sur Disqus
Jekyll n'utilise pas de langage dynamique, nous ne pouvons donc utiliser de base de données ou de validation. Nous pouvons cependant utiliser un service tel que Disqus (gratuit).

La première chose à faire est de vous créer un compte sur le site : [https://disqus.com/profile/signup/](https://disqus.com/profile/signup/). Une fois que vous avez remplis les informations sur votre profil, il vous faut ajouter un site. Allez à l'adresse suivante : [http://disqus.com/admin/create/](http://disqus.com/admin/create/) et remplissez les champs nécessaires.

Vous pouvez modifier les préférences du site dans disque, notamment la langue d'affichage ou l'apparence de disqus une fois intégré à votre site.

#### Ajouter le widget Disqus sur votre site

Allez sur le profil de votre site dans Disqus et naviguez dans **Settings** puis **Install** et enfin **Universal code**. Copiez le code dans le fichier **_includes/disqus.html**. Pour rendre notre application jekyll plus modulable, nous allons ajouter le profil dans le fichier de configuration :

```js
{% raw %}
<div id="disqus_thread"></div>
<script type="text/javascript">
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = '{{ site.disqus }}'; // required: replace example with your forum shortname

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
{% endraw %}
```

Maintenant, allez dans votre fichier **_config.yml** et ajoutez la ligne suivante :

```yaml
{% raw %}
disqus : 'prbaron' # remplacez par votre shortName disqus
{% endraw %}
```

Il nous reste à intégrer cet élément aux articles. Si vous avez suivi les premiers chapitres, vous aurez compris qu'il faut éditer le fichier **_layouts/post.html**.

Comme toujours, pour appeler le fichier disqus, il s'agit de la commande include.

```html
{% raw %}
{% include disqus.html %}
{% endraw %}
```

Et voila ! A partir de maintenant, vous allez pouvoir gérer vos commentaires depuis l'administration de Disqus, c'est très simple et très pratique. Un gain de temps assez important.

#### Bonus : Activer/Désactiver les commentaires pour un article

IL est très simple de gérer l'activation/désactivation des commentaires pour un article précis. Il vous suffit d'ajouter une condition avant d'afficher

```html
{% raw %}
{% if page.comments %}
    &nbsp;
    {% include disqus.html %}
{% endif %}
{% endraw %}
```

A partir de maintenant, vous pouvez gérer vos commentaires dans le front matter de chaque article avec

```yaml
{% raw %}
---
comments : true
---
{% endraw %}
```

### Le formulaire de contact
Pour proposer à vos utilisateurs d'entrer en contact avec vous, vous pouvez ajouter votre adresse email ou bien vos identifiants de réseaux sociaux. Cependant, cela peut vous déranger d'avoir une adresse mail en clair.

Nous allons aussi utiliser un service pour ajouter un formulaire de contact. [http://www.wufoo.com/](http://www.wufoo.com/) possède une formule gratuite qui nous suffit amplement.

Une fois votre profil créé, il vous faut ajouter un formulaire avec leur form builder. Maintenant que votre formulaire est créé, vous allez pouvoir l'intégrer à votre site web. Il vous faut cliquer sur **code** et choisir le type d'intégration.

Personnellement je préfère la version HTML/CSS code car elle me permet de gérer moi même le style de mon formulaire.


### La page 404
La page 404 est différente des autres pages car elle suit plusieurs règles :

  1. elle ne peut pas utiliser de tag liquid et doit donc être entièrement en HTML (pas de possibilité d'utiliser les fichiers créés dans **_includes**)
  2. le fichier **404.html** doit être à la racine de votre site.

Faites bien attention à suivre ces règles. Un dernier point à retenir, faites en sorte de faire évoluer le markup de cette page suivant l'évolution de votre site si vous souhaitez garder une cohérence.

### Conclusion
Notre site est maintenant prêt ! Nous allons voir dans le dernier chapitre comment le mettre en ligne sur GitHub et ainsi disposer d'un hébergement geek et gratuit.
