---
layout: post
title: Automatic SEO-friendly "nofollow" links with Jekyll (works with GitHub Pages)
date: 2017-04-11T00:00:00.000Z
cover: /assets/images/uploads/photo-1460925895917-afdab827c52f.jpeg
---
I've recently been looking for a way to automatically **rel="nofollow"** my _outbound_ links in Jekyll, so that they're SEO-friendly and I can add some custom styling to them.

There were a fair few plugins that would do the job, which I managed to figure out with some trial and error. However, since I'm using [GitHub Pages](https://pages.github.com/) to build and publish my site, I could either change my workflow (build locally, publish the built site) or find a way to do this using only [supported plugins](https://pages.github.com/versions/). In the end, I figured out how to do it without plugins at all!

Jekyll's built in Liquid templating has a [replace](https://shopify.github.io/liquid/filters/replace/) filter, which is perfect for the job.

### How to do it:

_This assumes you're using standard Markdown for your off-site links, in the format `[link text](http://link.com)`, and **relative** internal links, in the format `[link text](/local/link)`_

1. Locate your **default.html** layout
   * _It should be in _layouts_
2. Look for a variable for the page content, like this `{% raw %}{{content}}{% endraw %}`
3. Replace it with either:
   * `{% raw %}{{ content | replace: '<a href="http', '<a rel="nofollow noopener noreferrer" href="http' }}{% endraw %}`
4. Or, if you want to open off-site links in a new tab
   * `{% raw %}{{ content | replace: '<a href="http', '<a rel="nofollow noopener noreferrer" target="_blank" href="http' }}{% endraw %}`
5. Save, build and test

### How it works

As long as you're using standard Markdown links, all of your off-site links will look like this:

```
<a href="http...
```

And your internal links like this:

```
<a href="/...
```

The filter above takes the content of your website, as Jekyll produces it, and replaces the search string `<a href="http` with the same, but with _rel="nofollow"_ before it.

**Update:** thanks to Ashish in the comments for providing the [security additions](https://support.performancefoundry.com/article/186-noopener-noreferrer-on-my-links) of `noopener` and `noreferrer`. 

It's pretty simple, and pretty dumb. You may need to troubleshoot if your setup is different (e.g. single instead of double quotes), and it won't work if you link to your local site with absolute links. However, it will work for most scenarios, including _https_ links (because it just takes up to and including the 'p').

Give it a whirl, see if it works. Let me know below if you get into trouble.

Jamie
