---
title: New Player
description: New player
layout: layouts/project.njk
---

## The project

Our previous player looked outdated, and it was hard to implement new features. It was time to rewrite the web player using more up-to-date technologies.

[add a before/after image]

## Statistics

[add a chart with some data]

## Technical sheet

- VueJS / JavaScript
- HLS.js
- Karma/Chai/Sinon
- SCSS
- Webpack

## The constraints

The new player had to check the following requirements:

- small and fast
    - We want the viewers to play the video as fast as possible. Providing a small javascript bundle is only one part of the equation but it is still an important one. As such, any 1st and 3rd party code was thoroughly reviewed to make sure that the code is both understandable from a human and as small as possible
- accessible
    - We want the player to be usable by everybody. As such, we needed to put a big focus on accessibility. The player needs to work with all the different assistive technologies available nowadays.
- extensible
    - While we had a fixed set of features for the initial phase, we knew we would add more features through the years. We had to make sure that the code caters for future additions.

## Choosing a technical stack

The company was using AngularJS at the time (the project started in 2017). We made several proofs of concept in several frameworks (AngularJS, VueJS, Angular 2, React).

We decided to use VueJS and while it was a bold move in 2017, it proved to be successful.

We chose this framework for the following reasons:

- Small library. VueJS is only a fraction of the size of the other frameworks
- The syntax was really close to AngularJS. This would allow us to limit the number of informations to master
- Great developer experience: The VueJS devtools is extremely powerful and helped a lot. VueX, while simple to master, is incredibly powerful.

The main question people ask me when I talk about this project is “Why did you not use React as everybody is using it?”. While React is a great tool, here are the reasons why we did not pick it:

1. React was quite large (at the time). The v1.0 of the new player weighed 150KB. In 2017, React itself weighed around 120KB.
2. React has a different mindset than any other framework.
3. We had a product to deliver so we needed to limit the number of unknowns. VueJS’s syntax and mindset is close to AngularJS which allowed us to iterate quickly. This would not have been the case with React.

## Main challenges

It turns out that the main challenges revolved around two domains:

1. Video streaming and multi device compatibility. The company delivers the stream using Apple’s HLS technology. This protocol is available on Apple’s devices but require a JavaScript library on other browsers. Interestingly enough, it was harder to debug iOS as the implementation was a black box to us.
2. Customisation. We want the customers to be able to customise the player and make it their own. They are able to add a logo and change the theme. As with all projects requiring customisation, this feature added complexity to the platform as we now had to deal with an unknown amount of possibilities.

After 4 years using this player, I am incredibly proud of the result. All the requirements were achieved, new features have been added by multiple developers without any issues. Customers are impressed by the quality of this tool when they use it.
