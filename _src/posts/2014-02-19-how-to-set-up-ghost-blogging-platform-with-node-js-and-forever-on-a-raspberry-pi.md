---
layout: post
title: How to set up the Ghost blogging platform (with node.js and Forever) on a Raspberry Pi
date: 2014-02-19T00:00:00.000Z
---
---

**You will need:** *Raspberry Pi + Raspbian (HF) + node.js, the Internet, basic SSH skills*

**Estimated duration:** *45 minutes*

---

![Ghost's dashboard to-be](/assets/images/uploads/53cb7cffa27c89a43bc91b40f604f7e2_large.jpg)

This tutorial will take you through installing the Ghost blogging platform on a Raspberry Pi, complete with Forever to keep it running.

It's based on the main tutorial from [ghost.org](http://docs.ghost.org/installation/linux/), but since I had a few problems with that I made some modifications.

First up, if you don't already have it install node.js from [my guide here](/2014-02-19-how-to-set-up-node-js-on-a-raspberry-pi/) (there's a link back to this page at the end).

With the latest version of node.js installed, grab yourself a copy of SQLite 3 - this should be installed during the Ghost installation but in my experience, preinstalling it reduces errors:

	sudo apt-get install sqlite3

Next, create a `www` folder in `/var`. If you'd rather run Ghost from somewhere else, you're free to amend this part. I just like having it in `/var/www/ghost/` because it feels right:

	cd /var
    sudo mkdir www
    cd www
    sudo curl -L https://ghost.org/zip/ghost-latest.zip -o ghost.zip
    sudo unzip -uo ghost.zip -d ghost
    sudo rm ghost.zip

*That last command deletes the Ghost zip file, you can skip it if you'd like to keep a backup.*

    cd ghost
    sudo npm install --production

This'll take a while. Mine took around 15 minutes. When it's done, Ghost is installed. You can run it in development mode with `npm start` if you want, but you won't see much for now.

Make a copy of the example configuration file, edit it and replace the production URL with the one you plan to run your blog at:

	sudo cp config.example.js config.js
    sudo nano config.js

You're looking for:

    production: {
        url: 'http://my-ghost-blog.com',

Don't bother changing the `development: {` URL because you won't be using development mode.

*If you want to access Ghost directly like this, you'll need to change its production port to :80 - if you want to put it behind Varnish Cache to dramatically speed it up and reduce load on your Raspberry Pi, follow the link at the end of this tutorial.*

Now let's get Forever running. This'll monitor your Ghost instance and make sure it's restarted if it fails for any reason:

	sudo npm install forever -g

Yeah, that's pretty much it for that one. Nice and simple. You can test Forever by running:

	sudo NODE_ENV=production forever start /var/www/ghost/index.js

Alternatively, skip it and create the Forever startup script instead:

	sudo nano /etc/init.d/ghost.sh

And paste the following into it:

	#!/bin/sh
    sudo NODE_ENV=production forever start /var/www/ghost/index.js

Make it executable and set it to run at startup:

	sudo chmod +x /etc/init.d/ghost.sh
    sudo update-rc.d ghost.sh defaults

Reboot:

	sudo reboot

And, when you've logged back into the Pi, check that it's working:

	sudo forever list

If everything went okay, you should see something similar to the following:

![Forever process list](/assets/images/uploads/Screenshot_2014_02_19_21_26_15.png)

If you do, great! You've got Ghost running 'Forever' automatically at boot on your Raspberry Pi.

Any problems, check the [original Ghost guide](http://docs.ghost.org/installation/deploy/) or drop me a line in the comments (when I enable them).

---

**Following "how to run Ghost effectively from a Raspberry Pi?"**

*Next tutorial:*
[How to install Varnish Cache on a Raspberry Pi](/how-to-install-varnish-cache-on-a-raspberry-pi/)
