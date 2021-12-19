---
layout: post
title: How to install Varnish Cache on a Raspberry Pi
date: 2014-02-19T00:00:00.000Z
---
---

**You will need:** *Raspberry Pi + Raspbian (HF), the Internet, basic SSH skills*

**Estimated duration:** *30 minutes*

---

![Varnish Cache](/assets/images/uploads/varnoishcache_rgb_gimp2_alpha.png)

This tutorial combines two excellent ones from [technion](https://lolware.net/raspberryvarnish.html) and [Weed Pi](http://www.weedpi.com/how-to/install-varnish-in-raspberry-pi/), with a few modifications of my own. I've written it primarily for using Varnish in front of Ghost on node.js, but it should work for general installations too.

First off, let's install the prerequisites:

	sudo apt-get install autotools-dev autoconf libpcre3-dev libedit-dev libncurses5-dev automake libtool groff-base python-docutils pkg-config -y

Now get yourself into your home folder so you don't have to `sudo` everything, and clone Varnish Cache:

	cd ~
    git clone git://git.varnish-cache.org/varnish-cache

Next we'll configure and make the Varnish install:

	cd varnish-cache
    sh autogen.sh
    sh configure --enable-diagnostics --enable-debugging-symbols
    make

The `make`'ll take a while. Put the kettle on. When it's done, you need to create the necessary folder and add a default.vcl for Varnish:

	sudo make install
    sudo ldconfig -n /usr/local/lib/
    sudo useradd varnishd
    cd /usr/local/etc
    sudo mkdir varnish
    cd varnish
    sudo nano default.vcl

Now, if you're here because you're installing Varnish in front of Ghost, paste the following into your default.vcl and save it (courtesy of [Lucius Rizzo](http://we.je/using-varnish-not-nginx-to-run-ghost/) and [Lasse Karstensen](https://gist.github.com/lkarsten/6683179), with my modifications):

    vcl 4.0;
    backend default {
        .host = "127.0.0.1";
        .port = "2368";
    }

    sub vcl_recv {
        if (req.http.cache-control ~ "no-cache") {
            set req.hash_always_miss = true;
        }

        set req.http.x-pass = "false";
        if (req.url ~ "^/(api|signout)") {
            set req.http.x-pass = "true";
        } elseif (req.url ~ "^/ghost" && (req.url !~ "^/ghost/(img|css|fonts)")) {
            set req.http.x-pass = "true";
        }

        if (req.http.x-pass == "true") {
            return(pass);
        }
        unset req.http.cookie;
    }

If, however, you're setting Varnish up for another purpose, you'll need to add your own configuration. You can pick up a version of Varnish's default.vcl from *reifman* on GitHub at his Gist, [here](https://gist.github.com/reifman/4651531#file-default-vcl).

Now create a Varnish startup script. You can put this wherever you want, I put mine into `/var/www` but you could put it in your `~/varnish-cache` folder:

	cd /var/www
    sudo nano start-varnish.sh

Paste the following into it:

	#!/bin/sh
    ulimit -n 10240
	ulimit -l 16384
	/usr/local/sbin/varnishd -f /usr/local/etc/varnish/default.vcl -a 0.0.0.0:80 -s malloc,16M -l 8m,1m,+ -u varnishd

Make it executable:

	sudo chmod +x start-varnish.sh

And run it with:

	sudo sh start-varnish.sh

To get Varnish running.

### Start it at boot

If you're following my guides to get Varnish running in front of Ghost, you should already have a boot script for Ghost at `/etc/init.d/ghost.sh` so edit that (skip ahead if you're not following my Ghost guides):

	sudo nano /etc/init.d/ghost.sh

And add the line:

	sudo sh /var/www/start-varnish.sh

To the end. Update and reboot:

	sudo update-rc.d ghost.sh defaults
    sudo reboot

Check Varnish is running okay at:

[http://www.isvarnishworking.com/](http://www.isvarnishworking.com/)

It's likely that the site will report your installation of Varnish is "sort of" working. This is because Varnish is running, but Ghost isn't setup to cache by default [at the moment](https://ghost.org/forum/installation/185-cache-control-header/).

For the time being, we can *encourage* it to cache by making just a single change. This might not fully cache everything, but it's the easiest way I've figured out so far (remember, change `/var/www` if you've installed Ghost elsewhere):

	sudo nano /var/www/ghost/core/server/middleware/middleware.js


You're looking for this:

    // ### CacheControl Middleware
    // provide sensible cache control headers
    cacheControl: function (options) {
        /*jslint unparam:true*/
        var profiles = {
                'public': 'public, max-age=XXX',

With the value after `max-age=` probably being 0. Change that to something more suitable, depending on how often you'll update the site - I've set mine to `604800` - in seconds. Here are some useful values:

- `60` (1 minute)
- `3600` (1 hour)
- `86400` (1 day)
- `604800` (1 week)
- `2419200` (28 days)

***Remember, because of our default.vcl you can force-clear the cache using shift + refresh.***

Reboot:

	sudo reboot

Then hop along to [http://www.isvarnishworking.com/](http://www.isvarnishworking.com/) again and see the magic!

---

***If you're not following my guides***, make yourself a startup script:

	sudo nano /etc/init.d/varnish.sh

And paste the following:

	#!/bin/sh
	sudo sh /var/www/start-varnish.sh

(Change `/var/www/` if you've put your varnish start script elsewhere)

Update rc.d and reboot.

	sudo update-rc.d varnish.sh defaults
    sudo reboot

Check Varnish is running okay at:

[http://www.isvarnishworking.com/](http://www.isvarnishworking.com/)

Pop questions in the comments when I have them!

---

**Following "how to run Ghost effectively from a Raspberry Pi?"**

*Next tutorial:*
[How to setup CloudFlare CDN on your Raspberry Pi with automatic dynamic DNS updates](/how-to-automatically-update-cloudflare-with-your-ip-address/)
