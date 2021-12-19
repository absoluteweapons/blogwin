---
layout: post
title: Speed up your Ghost blog with InstantClick
date: 2014-12-25T00:00:00.000Z
---


**- UPDATE 21/06/15 -**

The latest Ghost update makes this much easier, and future proofs it against updates.

Get the latest version of Ghost, navigate to *Settings*, *Code Injection* and paste the InstantClick snippet I've included below.

	<!-- Load and activate InstantClick (http://instantclick.io/) -->

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/instantclick/3.0.1/instantclick.min.js"></script>

    <script data-no-instant>InstantClick.init();</script>

**- - -**

Recently I published a post about a JavaScript plugin that will [speed up your website](https://jamiegoodwin.uk/lightning-fast-websites-with-instantclick/), called [InstantClick](http://instantclick.io/).

It preloads links when you hover over them, and if you click, replaces the current page's `<body>` with the page from the link...pretty much instantly (hence the name)!

Well, with relative ease you can add InstantClick to your Ghost blog, without even having to download anything thanks to [CDNJS](https://cdnjs.com/).

**Important Note**

Because it effectively makes your site a single-page application, some scripts that run on page load (such as Google/Universal Analytics) will need a little extra work to get them loading. Check out the [InstantClick website](http://instantclick.io/scripts) for help.

###### The Automated Way

This method applies to Ghost's default theme, **casper**. If you're running a different theme, either follow the manual way further down or amend `content/themes/casper/default.hbs` to match the default.hbs file from your current theme (if you know what you're doing).

This uses `sed` to insert the InstantClick `<script>` tags before your closing `</body>` tag.

`cd` into your Ghost directory:

	cd /path/to/ghost

Then run:

	sed -i 's@.*</body>.*@    <!-- Load and activate InstantClick (http://instantclick.io/) -->\n    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/instantclick/3.0.1/instantclick.min.js"></script>\n    <script data-no-instant>InstantClick.init();</script>\n&@' content/themes/casper/default.hbs

That's it! Restart Ghost and check your site out. You should notice that links feel instant or near-instant (depending on how long you hover over them).

Read on for more of an explanation.

- - -

###### The Manual Way

If you'd prefer to know what's happening, or just want an explanation of the command you've just run, read on.

`cd` into your Ghost theme's directory (casper, if you haven't changed it):

	cd /path/to/ghost/content/themes/casper

Edit its `default.hbs` in your favourite editor (I use `nano`):

	nano default.hbs

Move down to the end of the file, and right before the closing `</body>` tag, add the following lines:

	<!-- Load and activate InstantClick (http://instantclick.io/) -->

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/instantclick/3.0.1/instantclick.min.js"></script>

    <script data-no-instant>InstantClick.init();</script>


Your file should look similar to this:

![InstantClick in Ghost](/assets/images/uploads/Screenshot-2014-12-25-16-51-11.png)

Save the file, restart Ghost and enjoy your snappy new website!

Post your problems and happiness in the comments.
