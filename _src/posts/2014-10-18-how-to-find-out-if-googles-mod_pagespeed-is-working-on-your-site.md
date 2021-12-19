---
layout: post
title: Find out if Google's mod_pagespeed is working on your site
date: 2014-10-18T00:00:00.000Z
---


Google have built a free server add-on called **mod_pagespeed**, which implements a few of their recommended improvements to boost the speed of your site.

The tool supports *Nginx* and *Apache*, and in my experience is pretty straightforward to install.

Naturally, once you've installed it you'll want to check it's working...and how you do that might not be immediately obvious.

Thankfully, Google have included a few simple HTTP headers, which are:

- nginx
	- `X-Page-Speed`
- Apache
	- `X-Mod-Pagespeed`

To find them, you'll have to:

1. Open your browser's developer tools
2. Switch to the network view (where you should be able to inspect each network request)
3. Inspect the headers of the request you want to check **mod_pagespeed** for (probably just the / or index page)..

If that sounds waaay to complicated for you, you're free to use my free site: [Is mod_pagespeed working](https://ismodpagespeedworking.com)

Enjoy! Post here in the comments if you find anything wrong with the site.
