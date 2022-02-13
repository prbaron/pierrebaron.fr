---
title: Les bonnes pratiques pour développer un projet à plusieurs
description: ''
date: 2013-04-05
tags: ['tutorial']
layout: layouts/post.njk
keywords : bonnes pratique, développement plusieurs, projet web, projet mobile
---

Vous souhaitez réaliser un projet complet et ne savez pas comment vous y prendre ? Vous trouvez qu'il manque un petit quelque chose pour que votre projet devienne incontournable ? Nous allons ici lister les bonnes pratiques, utilisées en entreprise, afin de mener efficacement un projet à son terme.
<!-- excerpt -->

### Analysez
Bien qu'elle ne soit pas la plus stimulante, la phase de définition du projet est une phase très importante de votre projet. Plus votre projet sera correctement défini, plus le développement sera aisé. Dans cette phase, vous devez être capable de répondre à ces questions :

* Quelles sont les fonctionnalités de mon projet ?
* Quels sont les problèmes potentiels ?
* Comment les résoudre ?
* Quels sont les éléments matériels dont nous avons besoin ?

Résoudre chacune de ces questions le plus finement possible vous permettra d'éviter tout un tas de changements en milieu de projet ou d'avoir des frais annexes non souhaités.

### Définissez des standards
> "Your code has to look like only one person wrote it"
> <small>Mark Otto (Fondateur de Twitter Bootstrap)</small>

Avant de développer, il vous faut définir des standards de codage. Ceci vous permettra d'avoir un code unifié entre les différents développeurs. Les anciens développeurs pourront ainsi reprendre du code réalisé par d'autres plus facilement et les nouveaux développeurs pourront rentrer dans un projet déjà entamé en douceur.
Il vous faut définir des standards pour chaque langage utilisé dans votre projet. Il doit être le plus complet possible.

Alors que certains langages comme Java, possèdent un guide de codage complet (voir [http://www.oracle.com/technetwork/java/javase/documentation/codeconvtoc-136057.html](http://www.oracle.com/technetwork/java/javase/documentation/codeconvtoc-136057.html)), la plupart des langages du web ne proposent que des guides de bonnes pratiques. Il existe donc plusieurs manières d'écrire votre code, et il est donc nécessaire de l'unifier.

Vous n'êtes pas livré à vous mêmes cependant. La plupart des développeurs PHP suivent la convention PSR0-1-2 (voir [https://github.com/php-fig/fig-standards/tree/master/accepted](https://github.com/php-fig/fig-standards/tree/master/accepted)), par exemple. Pour les autres langages (JS, CSS, ...), le guide de codage est souvent proposé par la librairie utilisée.

Voici quelques exemples de guidelines venants de gros projets ou de librairies diverses.

* [http://codex.wordpress.org/WordPress_Coding_Standards](http://codex.wordpress.org/WordPress_Coding_Standards)
* [http://make.wordpress.org/core/handbook/coding-standards/css/](http://make.wordpress.org/core/handbook/coding-standards/css/)
* [http://contribute.jquery.org/style-guide/js/](http://contribute.jquery.org/style-guide/js/)

### Documentez

#### Commentez
> "Code Tells You How, Comments Tell You Why"
> <small>Jeff Atwood</small>

Derrière cette maxime vous devez comprendre que votre code ne suffit pas pour comprendre le projet dans sa totalité. Les commentaires vous permettent d'assimiler du code écrit plusieurs mois avant ou bien écrit par un autre développeur.
Vous avez deux types de commentaires :

1. Code blocks : ces commentaires se placent avant la définition de la méthode. Ils expliquent le fonctionnement de cette dernière et des paramètres à remplir pour l'appeler. Remplis correctement, ces code blocks permettent de générer automatiquement une documentation complète du projet.

2. Inlines : les commentaires inlines se placent dans une méthode et expliquent les différentes instructions de celle ci.

Attention cependant, n'en faites pas trop non plus, si votre code est explicite ce n'est pas la peine d'alourdir la compréhension en rajoutant des commentaires triviaux. L'exemple qui suit est un exemple de ce qu'il ne faut pas réaliser.


```php
// this function tells me if the value is pair or not
function isPair($value){
    return $value % 2 == 0;
}
```

Les commentaire de blocs sont très importants car ils peuvent vous permettre de générer très rapidement une documentation globale de votre projet. Ceci est très pratique si vous avez créé votre API et que vous souhaitez la diffuser sur Internet. Voici un exemple de commenter les écrire : [http://manual.phpdoc.org/HTMLframesConverter/default/](http://manual.phpdoc.org/HTMLframesConverter/default/). On peut remarquer que cette syntaxe est similaire à la syntaxe pour la Javadoc.

Voici quelques exemple de générateurs de documentation :

* [http://www.phpdoc.org/](http://www.phpdoc.org/)
* [https://github.com/fabpot/Sami](https://github.com/fabpot/Sami)
* [http://www.stack.nl/~dimitri/doxygen/](http://www.stack.nl/~dimitri/doxygen/)

#### Documentez
Les commentaires donnent une vision micro du projet, et permettent de comprendre le fonctionnement des classes. Mais cela est insuffisant pour comprendre un projet dans toute sa structure. Une documentation complète doit  aussi expliquer les modèles de données, la base de données ainsi que tous les éléments relatif au code (le serveur, l'hébergement, ...).

### Dialoguez
A partir de maintenant, vous avez un projet bien défini, correctement commenté et documenté, alors pourquoi encore des réunions ? Tout simplement car il est dangereux de n'avoir qu'une seule personne à connaitre une partie du code. Si cette personne quitte le projet, vous risquez de perdre du temps à le remplacer. Les astuces suivantes vous permettront d'éviter ce soucis.

#### Daily Meeting
Le daily meeting est une courte réunion que l'on effectue chaque jour dans laquelle toute l'équipe de développement est présente. Chaque membre doit répondre à ces trois questions :

1. Qu'ai-je fait hier ?
2. Quels ont été mes problèmes ?
3. Que vais je faire aujourd'hui ?

Cela permet à chaque membre du groupe d'avoir une vision quotidienne des éléments sur lesquels travaillent vos collègues.

#### Pair programming
Le pair programming est une méthode de travail dans lequel deux développeurs vont développer ensemble. Cela va ainsi générer un échange de compétences. Le deuxième avantage de cette méthode est que le code produit est plus propre, la solution étant souvent plus facile à comprendre et plus robuste que si le code n'avait été écrit par une seule personne. Il est donc recommandé de réaliser quelques sessions de pair programming tout au long du projet.

### Utilisez les bons outils

#### Gestionnaire de versions
Lorsque vous travaillez à plusieurs sur le même projet et surtout sur les mêmes fichiers, il devient indispensable de mettre en place un gestionnaire de versions. Vous avez surement déjà entendu parler de Git, mais il en existe d'autres comme Mercurial ou SVN par exemple. Ces gestionnaires vous permettent d'avoir une branche principale qui sera la branche de production. A chaque fois qu'un développeur doit travailler sur un point du projet, il va créer une nouvelle branche, parallèle à la branche principale, dans laquelle il pourrait faire ce qu'il souhaite sans s'inquiéter de modifier le code de ses collègues. Lorsque tout a été codé et testé, il ne restera plus qu'a faire une fusion avec la branche principale. Chaque sauvegarde est envoyée sur le serveur, vous pouvez donc retrouver des anciennes versions de votre code si vous avez besoin de faire un retour en arrière.

#### Workflow
* [http://leankit.com/](http://leankit.com/)
* [https://trello.com/](https://trello.com/)

Kanban est une méthodologie de développement basée sur les tableaux blancs et les post-it. Chaque feature, improvement, defect, note est représenté par un post it de couleur, assigné à un ou plusieurs développeurs. Votre tableau est découpé en colonnes (Todo, In progress, Done, In test, ...). Chaque membre du groupe devra déplacer les post-it dans la bonne colonne suivant où ils en sont sur l'élément à développer. Cela vous donne une vision micro et macro de votre projet. Micro car vous savez à tout moment où en est le développement, macro car vous voyez ce qu'il reste à faire sur le long terme.

#### Tests
> "Les tests, c'est pour ceux qui ne savent pas coder"
> <small>[Les joies du code](http://lesjoiesducode.tumblr.com/post/31452862688/quand-le-stagiaire-me-dit-que-les-tests-cest-pour)</small>

Faux, faux et re faux ! Les tests sont très importants afin d'être sûr de ne rien casser quand vous faites des modifications. Vous pouvez être sûr à 100% de votre code, mais quid de celui de vos collègues ? Les tests unitaires vont assurer que la méthode réagit toujours comme vous le souhaitez même après une modification de celle ci.

Pour les éléments de front end, vous avez aussi des outils de tests mais, à mon sens, la meilleure façon de tester ces fonctionnalités reste de faire tester par un autre développeur qui n'a pas eu le code entre les mains. Il est important que le testeur n'ai pas été impliqué dans le développement afin de garantir le fait d'avoir un regard neuf sur la fonctionnalité et son implémentation.

### Soyez curieux
Ce n'est pas parce que vous avez défini vos technologies dans la phase de déploiement que vous ne pouvez pas en changer. Vous allez acquérir de plus en plus d'expérience au fil du projet et vous allez vous rendre compte que certains choix, qui vous paraissaient acceptables au début, ne sont finalement pas les plus judicieux. Dans ces cas là, il ne faut pas hésiter à modifier vos projets si vous jugez que cela en vaut le coup. Avant de faire un changement, il vous faut poser ces questions :
1. Quels sont les coûts de changement
2. Quels sont les gains ?
3. Quels sont les pertes si la technologie s'avère inefficace ?

### Promotez
Beaucoup de développeurs n'ont pas compris pourquoi leurs applications ne se vendent pas alors qu'elles répondent à un besoin. La réponse est simple : ils n'ont pas fait parler de leur application pendant le développement mais seulement une fois qu'elle a été réalisée. Les premiers jours sont cruciaux pour la vente d'une application. Il vous faut donc vous assurer d'avoir un maximum d'utilisateurs potentiels à la sortie. Prenons l'exemple de Clear ou .Mail, des millions de personnes ont attendu ou attendent encore la sortie de ces applications.

Pour réussir ce projet, il vous faut un site web sur lequel vous allez promouvoir votre projet. Évitez cependant les longs paragraphes, les utilisateurs n'ont pas besoin de comprendre le fonctionnement complet. Une phrase d'accroche, une liste de fonctionnalités et beaucoup d'images suffisent. Un blog relatant les étapes de développement peut être un plus. Si vous prévoyez un achat ou un abonnement, ceux ci doivent être facilement identifiables. Une fois que le projet est en ligne, ce site doit être un tremplin vers l'assistance ou la faq.

### Expérimentez
J'ai fais en sorte de rester évasif sur les méthodes à utiliser car je souhaite que vous en expérimentiez plusieurs afin de trouver celle qui vous convient le mieux. Souvenez vous que chaque méthode n'est jamais qu'un moyen de travailler et qu'il est toujours possible de l'adapter avec d'autres méthodes.
