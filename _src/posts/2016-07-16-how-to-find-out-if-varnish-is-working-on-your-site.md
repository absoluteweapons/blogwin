---
layout: post
title: How to find out if Varnish is working on your site
date: 2016-07-16T00:00:00.000Z
cover: /assets/images/uploads/photo-1454165205744-3b78555e5572.jpeg
---


The good folks over at Varnish Software have built the handy [Varnish Cache](https://varnish-cache.org/) to help folks like us speed up our websites.

Varnish does some really neat stuff. It sits in front of your web server and 'remembers' what that server spits out.

On subsequent requests for the same content, it hands out a cached copy almost instantly rather than making your server do loads of work.

It's best explained in this handy 2(:32) minute video from Varnish themselves:

<iframe width="560" height="315" src="https://www.youtube.com/embed/fGD14ChpcL4" frameborder="0" allowfullscreen></iframe>

But once you've got it installed, how do you know it's working? Well, fortunately Varnish have included some handy headers to help you out:

`X-Varnish` tells you Varnish is up and running, and your traffic's going through it.

However, that doesn't mean it's working *properly.* It could be failing to cache your content and requesting it from the server each time.

`X-Cache` solves that mystery by telling you if Varnish **HIT** the cache, or if your request suffered a cache **MISS**. If you get a MISS value in that header, Varnish is (for some reason) unable or unwilling to cache your content.

To find these headers, you'll have to:

1. Open your browser's developer tools
2. Switch to the network view (where you should be able to inspect each network request)
3. Inspect the headers of the request you want to check **X-Varnish** and **X-Cache** for (probably just the / or index page)..

If that sounds waaay to complicated for you, you're welcome to use my free site: [Is Varnish working](https://isvarnishworking.uk/)

Enjoy! Post here in the comments if you find anything wrong with the site.
