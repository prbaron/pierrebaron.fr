---
title: Créer un site avec Jekyll. Partie 1 - Introduction & Installation
description: ''
date: 2013-10-13
tags: ['tutorial']
layout: layouts/post.njk
keywords: jekyll, tutoriel, jekyll french
demo: http://pierrebaron.fr/tuto_blog_jekyll/
---

Lorsque l'on souhaite écrire un blog nous avons plusieurs solutions. Le CMS tel que WordPress, la plate-forme hébergée comme Blogger ou bien créer un site personnel avec un framework. On oublie bien souvent les générateurs de blogs statiques. Dans cette série de tutoriels, nous allons voir comment créer un site avec Jekyll et l'héberger sur GitHub.
<!-- excerpt -->

  1. [Partie 1 - Introduction & Installation]({{ '/blog/2013-10-13-jekyll-site-part1' | url }})
  2. [Partie 2 - Création des pages]({{ '/blog/2013-10-13-jekyll-site-part2' | url }})
  3. [Partie 3 - Création du blog]({{ '/blog/2013-12-14-jekyll-site-part3' | url }})
  4. [Partie 4 - Gestion des catégories]({{ '/blog/2014-02-08-jekyll-site-part4' | url }})
  5. [Partie 5 - Finitions]({{ '/blog/2014-02-08-jekyll-site-part5' | url }})
  6. [Partie 6 - Déploiement]({{ '/blog/2014-02-23-jekyll-site-part6' | url }})

### Présentation

[Jekyll](http://jekyllrb.com/) est un générateur de blog statique, cela signifie que vous aller écrire vos templates d'un côté et le contenu d'un autre côté. Jekyll se chargera ensuite de générer les pages HTML que vous pourrez uploader sur votre serveur.  Le template se code en HTML/CSS et JavaScript, quand au contenu, on le rédige en Markdown.

**Avantages de Jekyll**

  * Facile à développer :  il ne faut que des connaissances basiques en web
  * Rapide : en effet, les  pages HTML étant générées avant la mise en ligne, le dialogue client/serveur devient très rapide.
  * Simple à maintenir  : pas de base de données, pas de version de langage à gérer.
  * Peu couteux : Un hébergement gratuit suffit pour utiliser Jekyll
  * Concentré sur le contenu : Contrairement aux autres exemples cités dans le premier paragraphe, Markdown permet de se concentrer sur le fond de votre article sans vous soucier du design.

**Inconvénients de Jekyll**

  * Pas de langage serveur : Cela signifie pas de traitement et d'analyse de données. Il faudra donc passer par des services annexes pour avoir un formulaire de contact ou de commentaires sur son site.

### Jekyll for GitHub

Jekyll a été développé pour permettre aux développeurs de créer rapidement des sites web afin de présenter des démos de leur projet au grand public. Jekyll est donc très bien implémenté dans GitHub et cela va nous être bénéfique.

Nous allons voir comment utiliser GitHub pour héberger notre propre blog. Il est parfaitement possible d'utiliser Jekyll sur un hébergement mutualité ou dédié, j'expliquerai en aparté comment faire.

**Avantages**

  * Simple : GitHub se charge de l'administration serveur
  * Rapide à déployer : Il suffit de créer un repository git et c'est en ligne.
  * Puissant : vous possédez toute la force de git, c'est à dire que vous pouvez garder un historique, gérer des brouillons, réfléchir à une autre version de votre article, ...

**Inconvénients**

  * Obscur : Comme GitHub se charge de l'administration serveur, nous n'avons pas la maîtrise de la machine.
  * Pas de plugins : les plugins permettent d'ajouter des fonctionnnalités à Jekyll (comme la recherche d'articles par exemple), seulement GitHub lance Jekyll en mode safe, les plugins sont donc désactivés. Nous verrons qu'il existe un moyen de contourner cela. Les autres hébergements ne sont pas touchés par cet inconvénient.

### Installation

#### Ruby

Jekyll est développé en Ruby, il faut donc vous assurer que ce dernier est présent sur votre machine. Pour linux, un simple `apt-get install` devrait suffire

```bash
$ sudo apt-get install ruby1.9.1
```

Pour MacOS X, vous avez une version de ruby (1.8.7), ce n'est pas la dernière mais elle est suffisante pour nos besoins. Si néanmoins vous souhaitez avoir la dernière version, le mieux est de faire la mise à jour avec Homebrew.

```bash
$ ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
$ brew install ruby
```

Pour Windows, le plus simple est d'utiliser l'installeur. Vous pouvez le télécharger à cette adresse : [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/).

#### Jekyll

Une fois Ruby installé, il vous suffit de lancer la commande suivante dans un terminal pour installer Jekyll :

```bash
$ gem install jekyll
```

### Conclusion
Cette première partie nous a permis de voir les avantages et inconvénients de Jekyll et de préparer l'installation afin de pouvoir travailler. Nous verrons dans le chapitre suivant, comment créer nos propres pages.
