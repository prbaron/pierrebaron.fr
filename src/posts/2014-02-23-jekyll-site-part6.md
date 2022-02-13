---
title: Créer un site avec Jekyll. Partie 6 - Déploiement
description: ''
date: 2014-02-23
tags: ['tutorial']
layout: layouts/post.njk
keywords: jekyll, tutoriel, jekyll french
demo: http://pierrebaron.fr/tuto_blog_jekyll/
---

Notre site est terminé, nous allons maintenant le rendre accessible au monde entier.
<!-- excerpt -->

1. [Partie 1 - Introduction & Installation]({{ '/blog/2013-10-13-jekyll-site-part1' | url }})
2. [Partie 2 - Création des pages]({{ '/blog/2013-10-13-jekyll-site-part2' | url }})
3. [Partie 3 - Création du blog]({{ '/blog/2013-12-14-jekyll-site-part3' | url }})
4. [Partie 4 - Gestion des catégories]({{ '/blog/2014-02-08-jekyll-site-part4' | url }})
5. [Partie 5 - Finitions]({{ '/blog/2014-02-08-jekyll-site-part5' | url }})
6. [Partie 6 - Déploiement]({{ '/blog/2014-02-23-jekyll-site-part6' | url }})
### GitHub
Nous avons prévu de réaliser ce site Jekyll pour GitHub. En effet, Jekyll est très adapté pour GitHub, il a même été réalisé pour cet usage à la base, afin de permettre aux développeurs de proposer rapidement et facilement une démonstration de leur code.

#### Pourquoi Github ?
Pourquoi utiliser Github comme plate-forme d’hébergement ? Tout simplement car c’est gratuit, rapide, vous pouvez utiliser votre propre nom de domaine, vous n’avez pas à vous soucier de l’administration système et réseaux, c’est directement versionné et vous n’avez pas à générer votre site avant de l’uploader. En effet, il n’est pas nécessaire d’envoyer le fameux dossier **_site**. Vous pouvez donc le supprimer du versionning en ajoutant la ligne suivante dans votre fichier **.gitignore**.

```bash
_site/
```

Après réflexion, j’ai décidé de ne pas expliquer en détail comment héberger son projet Jekyll sous GitHub car il y a énormément de tutoriels concernant GitHub. Je vais donc tout simplement vous les lister :

  * [http://www.grafikart.fr/tutoriels/internet/versioning-130](http://www.grafikart.fr/tutoriels/internet/versioning-130)
  * [http://www.grafikart.fr/tutoriels/internet/git-github-131](http://www.grafikart.fr/tutoriels/internet/git-github-131)
  * [https://help.github.com/articles/using-jekyll-with-pages](https://help.github.com/articles/using-jekyll-with-pages)

Pour savoir si vous pouvez utiliser le déploiement automatique de GitHub, vous pouvez installer Github Pages. Ce Ruby Gem va vous permettre de disposer de tous les éléments installés sur la plateforme GitHub, ainsi que des versions associées.

Pour ce faire, ouvrez un terminal et naviguez jusque votre site jekyll et entrez la commande suivante :

```bash
gem install github-pages
```

Cette commande va installer toutes les dépendances nécessaires pour votre projet, (cette commande peut être très longue). Il vous faudra réitérer le process pour chaque projet.

#### Prérequis pour le déploiement GitHub automatique (pour un site)

Cette manipulation ne peut être réalisée que pour un site personnel et qui respecte toutes les contraintes imposées par GitHub.

  * Le nom du repository doit être {pseudo github}.github.io (ex : prbaron.github.io)
  * Si vous souhaitez utiliser la génération automatique par GitHub, il n’est pas nécessaire d’uploader le dossier **_site**. Attention, dans ce cas, vous ne pouvez PAS utiliser de plugins, car GitHub les considère comme non protégés.
  * Vous devez utiliser la branche ``master`` pour que votre site soit fonctionnel.
  * Vous pouvez voir le résultat à l’adresse http://{pseudo GitHub}.github.io.

#### Prérequis pour le déploiement GitHub automatique (pour un projet open source)

Cette manipulation ne peut être réalisée que pour un projet hébergé sur GitHub et qui respecte toutes les contraintes imposées par GitHub.

  * Si vous souhaitez utiliser la génération automatique par GitHub, il n’est pas nécessaire d’uploader le dossier **_site**. Attention, dans ce cas, vous ne pouvez PAS utiliser de plugins, car GitHub les considère comme non protégés.
  * Vous devez utiliser la branche ``gh-pages`` pour que votre site soit fonctionnel.
  * Vous pouvez voir le résultat à l’adresse http://{pseudo GitHub}.github.io/{Nom du Projet}.

#### Déploiement GitHub manuel / hébergement personnel

Vous pouvez choisir de ne pas utiliser la génération automatique de GitHub pour héberger votre site (par choix, ou bien car vous utilisez des plugins Jekyll) ou bien vouloir héberger votre site sur un hébergement divers.

Prérequis

   * Vous devez générer votre site avant l’upload sur le serveur (avec la commande ``jekyll serve``.
   * Vous ne devez uploader QUE le contenu de **_site**, il s’agit de votre site généré par la commande précédente. Le reste n’est pas nécessaire.

Pour un site personnel sur GitHub :

  * Le nom du repository doit être {pseudo github}.github.io (ex : prbaron.github.io)
  * Vous devez utiliser la branche ``master`` pour que votre site soit fonctionnel.
  * Vous pouvez voir le résultat à l’adresse http://{pseudo GitHub}.github.com.

Pour une documentation de projet :

  * Vous devez utiliser la branche ``gh-pages`` pour que votre site soit fonctionnel.
  * Vous pouvez voir le résultat à l’adresse http://{pseudo GitHub}.github.com/{Nom du Projet}.

Pour un hébergement personnel, il n'y a pas de règle particulière, il vous suffit d'uploader le contenu de **_site** sur votre serveur via FTP.

#### Nom de domaine pour GitHub
Voici le tutoriel expliquant comment utiliser son propre nom de domaine avec un site sous Jekyll hébergé sur Github : [https://help.github.com/articles/setting-up-a-custom-domain-with-pages](https://help.github.com/articles/setting-up-a-custom-domain-with-pages).

### Conclusion
Cette série de tutoriel sur Jekyll est maintenant terminée, vous êtes maintenant capable de créer votre propre site facilement et gratuitement. Jekyll est aussi pratique pour un blog personnel ou pour des pages statiques, pour une démonstration de projets par exemple, alors je vous invite à en user et en abuser.
