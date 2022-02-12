---
title: Add your Twitter timeline to your CakePHP application
description: How to add your twitter timeline into your CakePHP application
note: I made a gist of the plugin, <a href="https://gist.github.com/prbaron/4725934">https://gist.github.com/prbaron/4725934</a>
date: 2012-10-23
tags: ['tutorial']
layout: layouts/post.njk
keywords : cakephp, cakephp twitter timeline
---

Twitter just changed its API, so I decided to write my own library to display my Twitter feeds on my website.

Today, I will share it to you and I will teach you how to use it in your CakePHP website. The first thing you have to do is to [download the class](https://gist.github.com/prbaron/4725934) and to place it in you Lib folder.

Below is the single public method to find your tweets with all the default options.

```php
<?php
$this->find(
    "prbaron", // Twitter account name
    array(
        'count'            => 10, // number of tweets returned
        'exclude_replies'  => true, // do not show replies tweets
        'include_entities' => true, // do not show
        'include_rts'      => true, // show retweets
        'trim_user'        => true // only show the status author numerical id
    ),
    array(
        'cache_duration' => '+30mins', // time of the cache
        'hashtag_class'  => 'pbtwitter-hashtag', // class of hashtag links
        'url_class'      => 'pbtwitter-url', // class of url links
        'user_class'     => 'pbtwitter-user' // class of user links
    )
);
?>
```


Now we can create our Twitter MVC, so go ahead and create your Twitter model (app/Model/Twitter.php) :

```php
<?php

 class Twitter extends AppModel{
    public $useTable = false; // we do not need a table in our Database
}
```

Twitter controller (app/Controller/TwitterController.php) :

```php
<?php
class TwitterController extends AppController{

    public function index(){
        // import the PBTwitter class from the Lib folder
        App::import('Lib', 'PBTwitter');

        // create a new instance of the class
        $Twitter = new PBTwitter();

        // find the last 3 tweets
        $d['tweets'] = $Twitter->find('prbaron', array('count' => 3));

        // set the tweets to my view
        $this->set($d);
    }
}
```

Twitter view (app/Views/Twitter/index.ctp) :

```php
<ul>
    <?php foreach($tweets as $k => $v): ?>
        <?php debug($v); // show the array of the tweet ?>
        <li><?php echo $v['text']; ?></li>
    <?php endforeach; ?>
</ul>
```

And that's all, now you can display your timeline to all your visitors.
