---
title: Déboguer efficacement vos pages web sur Android
description: ''
date: 2013-08-30
tags: ['tutorial']
layout: layouts/post.njk
keywords : débogage, débuggage, android, web, mobile
---

Comme vous le savez tous, le développement web mobile peut être un peu fastidieux, lorsqu'il s'agit de déboguer du code JavaScript exécuté uniquement sur un téléphone par exemple.
<!-- excerpt -->

Il existe des sites permettant de tester votre site sous différentes résolutions ([http://screenqueri.es/](http://screenqueri.es/) en est un exemple parmi tant d'autres) mais il est plus difficile d'analyser le DOM, de tester du code sans mettre des <code>alert()</code> partout. 

Google a répondu à ce problème par un plugin pour Chrome appelé [ADB](https://chrome.google.com/webstore/detail/adb/dpngiggdglpdnjdoaefidgiigpemgage) pour Android Device Bridge. Les personnes travaillant dans le développement Android le connaissent bien car c'est un des composants installés avec le SDK Android.
Ce plugin va nous permettre de détecter un appareil Android connecté via USB sur votre ordinateur et ainsi d'utiliser la console de débogage de Google Chrome desktop sur une page affichée depuis Google Chrome Android.

:::info
Attention, il vous faut au minimum la version 28 pour Chrome Desktop et la version 24 pour Chrome Android.
:::

### Installer le plugin ADB pour Google Chrome 28

Il suffit d'installer le plugin [ADB](https://chrome.google.com/webstore/detail/adb/dpngiggdglpdnjdoaefidgiigpemgage) comme n'importe quel autre plugin Chrome en cliquant sur le bouton **Installer**. L'icône suivante va s'afficher à droite de votre barre d'adresse.  
![bouton ADB plugin](/img/2013/08/30/adb-plugin-button.png)


### Préparer le téléphone pour le débogage USB
Nous allons préparer le téléphone au débogage USB en activant la bonne option dans les options développeurs des paramètres du téléphone.

Si vous utilisez Android 4.2+, ces options sont camouflées. Pour les afficher, il vous faut réaliser les étapes suivantes : 

  * Cliquez sur l'icône **Paramètres**
  * Cliquez sur **A propos de ce téléphone**
  * tapotez 4 fois sur le numéro de build
  * Revenez dans les paramètres générales, l'onglet va se trouver juste avant **A propos de ce téléphone**

Une fois que vous êtes dans les options développeur, il vous faut cocher l'option **Débogage USB**. 
![Activer le débogage USB dans les paramètres](/img/2013/08/30/settings-activate-usb-remote.png)


### Activer le débogage USB dans Chrome Android
Nous allons maintenant activer le débogage USB pour Google Chrome Android, ce qui permettra au plugin ADB de reconnaitre notre appareil Android et d'afficher les pages web.

Pour cela :

  * Ouvrez **Google Chrome Android**
  * Allez dans les **Paramètres**
  * Allez dans **Outils de Développement**
  * cochez **Activer le déblocage USB pour le web**
  
![Activer le débogage USB dans Google Chrome Android](/img/2013/08/30/chrome-activate-usb-remote.png)

  
### Utiliser le plugin
Tout est complètement configuré, nous allons maintenant pouvoir utiliser le plugin. Pour cela, veuillez brancher votre téléphone Android à votre ordinateur via USB. Vous pouvez ouvrir votre site web préféré sur votre téléphone.

Veuillez cliquez sur l'icône ajoutée à votre barre d'adresse puis sur **Start ADB**. Cela va permettre au plugin de rechercher votre appareil Android.  
![Activer ADB](/img/2013/08/30/adb-plugin-menu.png)

Veuillez cliquer sur **View Inspection targets**.  
![Activer ADB](/img/2013/08/30/adb-plugin-menu-active.png)

Cela vous mènera sur la page  [chrome://inspect/](chrome://inspect/).
Vous pourrez ainsi voir toutes les pages ouvertes sur votre téléphone Android. Il vous suffit de cliquer sur **Inspect** pour ouvrir la console de débogage et ainsi avoir la puissance de Chrome Desktop sur votre appareil mobile.

En savoir plus sur le remote debugging sur Android : [https://developers.google.com/chrome-developer-tools/docs/remote-debugging#install-adbplugin](https://developers.google.com/chrome-developer-tools/docs/remote-debugging#install-adbplugin)
   
  
