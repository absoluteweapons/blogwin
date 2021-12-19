---
layout: post
title: How to easily insert buttons into Ghost blog posts
date: 2016-08-07T00:00:00.000Z
cover: /assets/images/uploads/photo-1482062364825-616fd23b8fc1.jpeg
---
There are some lovely buttons styles built into Ghost and the admin interface that we can't access in our Markdown by default.

In this post, I'll give you some CSS to add to your `{% raw %}{{Ghost Foot}}{% endraw %}`, which will allow you to use those button styles in your posts.

### The CSS

Before you can use the buttons, you'll need to add the CSS to your posts. It's available in the admin interface so I've extracted it from there and added a couple of lines for the outline buttons.

###### Copy the following script

```
<!-- Ghost button styles -->
<style> .btn-link.disabled, .btn-link[disabled], .btn.disabled, .btn[disabled], fieldset[disabled] .btn { opacity: 0.65; cursor: not-allowed; pointer-events: none; box-shadow: none; } .btn { margin-bottom: 0; padding: 9px 15px; border: 1px solid #dfe1e3; background: #fff; border-radius: 4px; color: #808284; text-transform: uppercase; text-shadow: none; white-space: nowrap; letter-spacing: 1px; font-size: 1.1rem; line-height: 1.428571429; transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease; font-family: "Open Sans", sans-serif; cursor: pointer; text-decoration: none; } a.btn { box-shadow: none; } .btn:focus, .btn:hover { border-color: #5ba4e5; color: #308ddf; } .btn-link:active, .btn-link:focus, .btn-link:hover { text-decoration: underline; } .btn.active:focus, .btn:active:focus, .btn:focus { outline: dotted thin; outline: -webkit-focus-ring-color auto 0; outline-offset: -2px; } .btn.active, .btn:active { outline: 0; background-image: none; box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2); } .btn-hover-green:active, .btn-hover-green:focus, .btn-hover-green:hover { border-color: #9fbb58; color: #859f41; } .btn-blue { border-color: #308ddf; background: #5ba4e5; color: #fff; } .btn-blue:active, .btn-blue:focus, .btn-blue:hover { border-color: #1e73be; background: #308ddf; color: #fff; } .btn-green { border-color: #859f41; background: #9fbb58; color: #fff; } .btn-green:active, .btn-green:focus, .btn-green:hover { border-color: #667b32; background: #859f41; color: #fff; } .btn-red { border-color: #d1341f; background: #e25440; color: #fff; } .btn-red:active, .btn-red:focus, .btn-red:hover { border-color: #a42919; background: #d1341f; color: #fff; } .btn-link, .btn-link:active, .btn-link:focus, .btn-link:hover { border-color: transparent; background: 0 0; color: #5ba4e5; } .btn-link.disabled, .btn-link[disabled] { color: #b2b2b2; } .btn-minor:active, .btn-minor:focus, .btn-minor:hover { border-color: #c1c1c1; background: #fff; box-shadow: none; color: #808284; } .btn-lg { padding: 12px 18px; border-radius: 4px; font-size: 1.4rem; line-height: 1.33; } .btn-sm { padding: 7px 10px; border-radius: 2px; font-size: 1rem; line-height: 1.5; } .btn-block { display: block; } .btn-block + .btn-block { margin-top: 5px; } .btn.btn-outline { background-color: #fff; } .btn.btn-blue.btn-outline { color: #5ba4e5; } .btn.btn-red.btn-outline { color: #e25440; } .btn.btn-green.btn-outline { color: #9fbb58; }</style>
```

###### Open Ghost settings and navigate to _Code Injection_

![Code Injection](/assets/images/uploads/Screen-Shot-2016-08-07-at-19-53-28-1.png)

###### Paste the script into _Blog Footer_

![Pasted Script](/assets/images/uploads/Screen-Shot-2016-08-07-at-19-53-50.png)

Now save the new footer (top right button) and open up a new post.

### Using the buttons

Technically there are 18 buttons available, and it breaks down like this:

* 3 colours
* 3 sizes
* 2 styles

Use them by inserting either a `<button class="btn">` or an `<a class="btn">` tag into your posts.

There are three classes you can add to the `btn` class:

* `btn-COLOR`
  * Replace `COLOR` with `green`, `blue`, or `red`)
* `btn-SIZE`
  * Replace `SIZE` with `sm`, `md`, or `lg`
* `btn-outline`
  * Use as is to create an outline only button

For example, for a small red button you'd use:

`<button class="btn btn-red btn-sm">Small Red Button</button>`

<button class="btn btn-red btn-sm">Small Red Button</button>

For a large green outline button:

`<button class="btn btn-green btn-lg btn-outline">Large Green Outline Button</button>`

<button class="btn btn-green btn-lg btn-outline">Large Green Outline Button</button>

Or a medium blue link button:

`<a href="#" class="btn btn-blue btn-md">Medium Blue Link Button</a>`

<a href="#" class="btn btn-blue btn-md">Medium Blue Link Button</a>

- - -

That's it! Enjoy your new buttons and if you run into trouble, hit me up in the comments :-)

<style> .btn-link.disabled, .btn-link[disabled], .btn.disabled, .btn[disabled], fieldset[disabled] .btn { opacity: 0.65; cursor: not-allowed; pointer-events: none; box-shadow: none; } .btn { margin-bottom: 0; padding: 9px 15px; border: 1px solid #dfe1e3; background: #fff; border-radius: 4px; color: #808284; text-transform: uppercase; text-shadow: none; white-space: nowrap; letter-spacing: 1px; font-size: 1.1rem; line-height: 1.428571429; transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease; font-family: "Open Sans", sans-serif; cursor: pointer; text-decoration: none; } a.btn { box-shadow: none; } .btn:focus, .btn:hover { border-color: #5ba4e5; color: #308ddf; } .btn-link:active, .btn-link:focus, .btn-link:hover { text-decoration: underline; } .btn.active:focus, .btn:active:focus, .btn:focus { outline: dotted thin; outline: -webkit-focus-ring-color auto 0; outline-offset: -2px; } .btn.active, .btn:active { outline: 0; background-image: none; box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2); } .btn-hover-green:active, .btn-hover-green:focus, .btn-hover-green:hover { border-color: #9fbb58; color: #859f41; } .btn-blue { border-color: #308ddf; background: #5ba4e5; color: #fff; } .btn-blue:active, .btn-blue:focus, .btn-blue:hover { border-color: #1e73be; background: #308ddf; color: #fff; } .btn-green { border-color: #859f41; background: #9fbb58; color: #fff; } .btn-green:active, .btn-green:focus, .btn-green:hover { border-color: #667b32; background: #859f41; color: #fff; } .btn-red { border-color: #d1341f; background: #e25440; color: #fff; } .btn-red:active, .btn-red:focus, .btn-red:hover { border-color: #a42919; background: #d1341f; color: #fff; } .btn-link, .btn-link:active, .btn-link:focus, .btn-link:hover { border-color: transparent; background: 0 0; color: #5ba4e5; } .btn-link.disabled, .btn-link[disabled] { color: #b2b2b2; } .btn-minor:active, .btn-minor:focus, .btn-minor:hover { border-color: #c1c1c1; background: #fff; box-shadow: none; color: #808284; } .btn-lg { padding: 12px 18px; border-radius: 4px; font-size: 1.4rem; line-height: 1.33; } .btn-sm { padding: 7px 10px; border-radius: 2px; font-size: 1rem; line-height: 1.5; } .btn-block { display: block; } .btn-block + .btn-block { margin-top: 5px; } .btn.btn-outline { background-color: #fff; } .btn.btn-blue.btn-outline { color: #5ba4e5; } .btn.btn-red.btn-outline { color: #e25440; } .btn.btn-green.btn-outline { color: #9fbb58; }</style>
