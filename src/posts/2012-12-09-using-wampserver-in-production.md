---
title: Using WampServer in production
description: How to update WampServer to use in production
date: 2012-12-09
tags: ['tutorial']
layout: layouts/post.njk
keywords : wampserver, production, online
---

WampServer is an awesome tool and famous in web development world. For those who do not know it, WampServer is a software installing Apache, PHP and MySQL. It is really useful to locally work on your websites. The problem is that it is for development and not for production because it is not secured.

Some months ago, I had to deploy WampServer on Windows 7 for my company (they developed softwares on Windows and I could not switch on Linux) so I decided to secure it the most I could. I will not explain how to install it because it is very easy but the steps begin just after the installation. Here what I did.

### Apache

#### Allowing PHP and MySQL from the Internet
Ok, you want your website to be online so the first important thing to do is to enable access to your computer from the Internet.  Do a left click on the WampServer icon and navigate to Apache > new alias > http://localhost/phpmyadmin/ and choose **edit alias**.

Look at these lines :

```bash
<Directory "c:/wamp/apps/phpmyadmin3.4.10.1/">
    Options Indexes FollowSymLinks MultiViews
    AllowOverride all
    Order Deny,Allow
    Deny from all
    Allow from 127.0.0.1
</Directory>
```

and replace it by these :

```bash
<Directory "c:/wamp/apps/phpmyadmin3.4.10.1/">
    Options Indexes FollowSymLinks MultiViews
    AllowOverride all
    Order Allow,Deny
    Allow from 192
</Directory>
```

Ok, now your computer can be accessed to every other on your local network. The problem is that your server can still just be call by local computers. We will open it to the world at the end of the tutorial.

#### Launch WampServer on computer start
We will configure Windows to lauch WampServer services on each restart. It is preferably to quit the application before executing the following steps. Now, type services on your search bar in the start Panel of Windows. Search for the wampapache and wampmysql services. Right click and choose **Automatic on launch**. Do the same way for wampmysql service.

Now Windows will launch the two needed services on each restart, you will not have to relauch it manually.

#### Windows firewall
Windows can cause some problems on Apache services so we will allowed them. Click on Configuration panel and choose **Windows firewall**. Look for each Apache HTTP Server install and check that they are all accepted by the firewall. If not, you can edit the preferences to check them manually.

Ok, it's well, we did some good and important things but it is not over, we have to secure PhpMyAdmin now, you do not want that anybody can edit your database do you?

### PhpMyAdmin

#### Delete root account
Access to PhpMyAdmin by typing http://localhost/phpmyadmin. You have to secure the root user because it has no password. You have two solutions :

  * Edit each root account by creating a password
  * Create new user for the three clients (localhost, 127.0.0.1, ::1).

Once you did it, you have to delete your three old root accounts.

#### Set a user and a password
Well, this step is not to secure your PhpMyAdmin panel but to help you to connect to it. You can set a username and a password (but I do not recommand it) by default on the login screen. To do it, check the config.inc.php file in _/{WampDirectory}/apps/phpmyadmin{version}/_ and check these lines :

```php
<?php
$cfg['Servers'][$i]['user']             = 'root';
$cfg['Servers'][$i]['password']         = '';
$cfg['Servers'][$i]['allowNoPassword']	= true;
```

You can set your default username and password (also I do not recommand it again!).

### Questions

#### What can I do next ?
Ok, now WampServer is totally secured and will be launched on each start of Windows. You will be able to host your website on your local computer. But it is not over, I suggest you to install and configure FileZilla Server to have a FTP server.

#### I still cannot see my website from the Internet
We allowed the local computers to check the website, but we have to open the server to the world. The problem here is that your server does not have a public IP to be accessible by everybody. You have to choose between two solutions :

  * Setup a public IP to your computer and enable it on your router
  * use dyndns to manage the routes form a ynamic IP.

### Conclusion
Ok, I will answer one important question. What to do if I want to create my own server ? Install Linux !!! Linux is the best way to configure and manage a server, it is scaled for and secure. The solution I gave you here is in the case that you do not have the choice of your operating system.

I hope you like this tutorial, and if I miss something do not hesitate to complete it in the comments. If you would like more informations on some steps, tell it in the comments !
