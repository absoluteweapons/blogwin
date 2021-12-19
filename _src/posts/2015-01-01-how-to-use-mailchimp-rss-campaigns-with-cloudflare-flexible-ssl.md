---
layout: post
title: How to use MailChimp RSS campaigns with CloudFlare Flexible SSL
date: 2015-01-01T00:00:00.000Z
---


MailChimp is a great (free, and I love free) way to allow people to subscribe to email updates from your blog. As soon as I can figure out some of Ghost's RSS kinks, I'll enable it for this blog (in addition to RSS subscriptions).

[Jump to solution](#fix)

However, if like me you've been using CloudFlare's Flexible SSL and you followed CloudFlare's guide to get it working, you're probably going to run into this error when you try to setup an RSS-driven campaign in MailChimp"

![MailChimp RSS Feed Error](/assets/images/uploads/Screenshot-2015-01-01-13-01-59.png)

Despite the fact that (in my case at least) W3C validates your RSS feed perfectly.

That's because of the way CloudFlare's Flexible SSL works. Instead of providing full SSL, it only secures the traffic between your **reader** and **CloudFlare**. Best explained [by CloudFlare](https://support.cloudflare.com/hc/en-us/articles/200170416-What-do-the-SSL-options-Off-Flexible-SSL-Full-SSL-Full-SSL-Strict-mean-) using this diagram:

![How CloudFlare's SSL options work](https://images.ctfassets.net/slt3lc6tev37/AVQoALCTVYbAL2sYeBfl6/01dd917f7e6c2b386f542dc936db99bd/hc-import-ssl_tls_flexible.png)

MailChimp seems to detect that your origin server (the one providing the RSS feed) doesn't have SSL enabled and so rejects the feed. To work around the problem, you'll need to add a page rule to CloudFlare.

<h5 id="fix">How to fix it</h5>

1. [Login to CloudFlare](https://www.cloudflare.com/login).
2. Open "Page Rules" for the website you want to fix.
3. Create a **new rule**.
4. For the pattern, use the full **http** URL of your RSS feed (not https), for example, mine is `http://jamiegoodwin.uk/rss/`.
5. In the rule's settings, scroll down to **SSL** and switch it **off** (make sure "Always use https" is off).

	![Disable SSL in CloudFlare Rules](/assets/images/uploads/Screenshot-2015-01-01-13-05-40.png)

6. Save the rule.
7. In the rules overview, use the bars to the left of your new rule to move it **above** the "Always use https" rule for your blog.

You should end up with something that looks similar to this:

![RSS & SSL Rules in CloudFlare](/assets/images/uploads/Screenshot-2015-01-01-13-06-02.png)

Go back to MailChimp and give it the **non-HTTPS** version of your feed (e.g. for me: `http://jamiegoodwin.uk/rss/`)

Enjoy your new email campaigns!

Problems? Stick 'em in the comments :-)
