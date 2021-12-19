---
layout: post
title: How to run Ghost effectively, from a Raspberry Pi
date: 2014-02-23T00:00:00.000Z
---
---

**You will need:** *Raspberry Pi + Raspbian (HF), a USB stick (recommended), a CloudFlare account (recommended), the Internet, basic SSH skills*

**Estimated duration:** *120 minutes*

---

![My little pink Pi, powering this blog](/assets/images/uploads/pink_pi.jpg)

This tutorial is a slimmed (very little explanation, mostly just copiable code), combined version of five previous ones explaining how to run a viable blog on a Raspberry Pi using Ghost. If you want more detail, I recommend you follow the previous five one-by-one (each links to the next at the end).

1. [How to run a Raspberry Pi from a USB drive](/2014-02-16-how-to-run-a-raspberry-pi-from-a-usb-drive/)
2. [How to set up node.js on a Raspberry Pi](/2014-02-19-how-to-set-up-node-js-on-a-raspberry-pi/)
3. [How to set up the Ghost blogging platform (with node.js and Forever) on a Raspberry Pi](/2014-02-19-how-to-set-up-ghost-blogging-platform-with-node-js-and-forever-on-a-raspberry-pi/)
4. [How to install Varnish Cache on a Raspberry Pi](/2014-02-19-how-to-install-varnish-cache-on-a-raspberry-pi/)
5. [How to setup CloudFlare CDN on your Raspberry Pi with automatic dynamic DNS updates](/2014-02-23-how-to-automatically-update-cloudflare-with-your-ip-address/)

Otherwise, crack on.

Here's an outline of what we're going to do:

1. Move the core Raspbian files to a USB stick and run the Raspberry Pi from there.
2. a. Install node.js.
b. Install Ghost.
c. Install Forever & have it monitor Ghost.
d. Auto-start Ghost & Forever.
3. a. Install Varnish Cache
b. Set Varnish up in front of Ghost, using node.js as the server
4. Setup CloudFlare


Before I begin, I'd like to thank the following for their work and tutorials, which helped me build this one:

- [paulv - how to run Raspbian from a USB stick](http://www.raspberrypi.org/phpBB3/viewtopic.php?p=351659#p351659)
- [nathanjohnson320 - setting up node.js on a Raspberry Pi](http://www.raspberrypi.org/forums/viewtopic.php?f=66&t=54817)
- [Ghost - a guide to setting up Ghost](http://docs.ghost.org/installation/)
- [technion](https://lolware.net/raspberryvarnish.html) and [Weed Pi](http://www.weedpi.com/how-to/install-varnish-in-raspberry-pi/) for their excellent tutorials, which I combined
- [Jim Drash - for his script to automatically update CloudFlare](http://jimdrash.com/node/5)

---

### Step One
#### Migrate Raspbian to a USB stick
#####[Full Tutorial](/how-to-run-a-raspberry-pi-from-a-usb-drive/)

---


Write a fresh copy of Raspbian to your memory card [(download)](http://downloads.raspberrypi.org/raspbian_latest).

##### Mac/Linux (Terminal)

	sudo dd if=path_of_your_image.img of=/dev/rdiskN bs=1m
    # where N corresponds to your USB stick

#####[Windows](http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_Card_using_Windows)

Plug everything *except* your USB stick in. SSH into it, and configure:

	sudo raspi-config

Change the following (don't expand rootfs):

- User password (for security, you should always change this).
- Overclock (use 'Turbo' mode, it's covered by your warranty)
- Memory split (allocate 16M for GPU)

Reboot:

	sudo reboot

When it's done, plug your USB stick in and run:

	dmesg

Identify your drive (normally 'sda'), run *fdisk* on it:

	sudo fdisk /dev/sda

Delete existing partitions:

	d

Create a new one:

	n

Write changes:

	w

Format the drive:

	sudo mke2fs -t ext4 -L rootfs /dev/sda1

Mount it:

	sudo mount /dev/sda1 /mnt

Edit *fstab*:

	sudo nano /etc/fstab

Comment out the default rootfs, add a line for /dev/sda1:

	proc           /proc    proc    defaults         0    0
	/dev/sda1      /        ext4    defaults,noatime 0    1
	/dev/mmcblk0p1 /boot    vfat    defaults         0    2
	#/dev/mmcblk0p2 /        ext4    defaults,noatime 0    1
	# a swapfile is not a swap partition, so no using swapon|off from here on, use  dphys-swapfile swap[on|off]  for that

Copy everything to USB:

	sudo rsync -axv / /mnt

When it's done, backup cmdline.txt:

	sudo cp /boot/cmdline.txt /boot/cmdline.bak

Then edit it to point to /dev/sda and add a 5 second delay:

	sudo nano /boot/cmdline.txt

It should look similar to this:

	dwc_otg.lpm_enable=0 console=ttyAMA0,115200 kgdboc=ttyAMA0,115200 console=tty1 root=/dev/sda1 rootfstype=ext4 elevator=deadline rootwait rootdelay=5

Reboot:

	sudo reboot

Check everything went okay:

	dh -h

The size of your rootfs should reflect your USB stick.

Finally, now that you're running from the USB stick, you can update:

	sudo apt-get update
	sudo apt-get upgrade -y
	sudo apt-get autoremove

---

### Step Two
#### Set up node.js, Ghost and Forever
#####[Full Tutorial](/how-to-set-up-ghost-blogging-platform-with-node-js-and-forever-on-a-raspberry-pi/)

---

Install node.js:

	cd ~
    wget http://node-arm.herokuapp.com/node_latest_armhf.deb
    sudo dpkg -i node_latest_armhf.deb

Check it with:

	node -v


Install sqlite3 for Ghost:

	sudo apt-get install sqlite3

Download, unzip and install Ghost:

	cd /var
	sudo mkdir www
	cd www
	sudo curl -L https://ghost.org/zip/ghost-latest.zip -o ghost.zip
	sudo unzip -uo ghost.zip -d ghost
	sudo rm ghost.zip
	cd ghost
	sudo npm install --production

When it's done (about 15 minutes), copy and edit the config file:

	sudo cp config.example.js config.js
	sudo nano config.js

Change your production URL:

	production: {
	    url: 'http://my-ghost-blog.com',

Install Forever:

	sudo npm install forever -g

Create a startup script:

	sudo nano /etc/init.d/ghost.sh

Paste the following into it:

	#!/bin/sh
	sudo NODE_ENV=production forever start /var/www/ghost/index.js

Make it executable and reboot:

	sudo chmod +x /etc/init.d/ghost.sh
	sudo update-rc.d ghost.sh defaults
	sudo reboot

After reboot, check it's running before continuing:

	sudo forever list

---

### Step Three
#### Set up Varnish
#####[Full Tutorial](/how-to-install-varnish-cache-on-a-raspberry-pi/)

---

Install prerequisites:

	sudo apt-get install autotools-dev autoconf libpcre3-dev libedit-dev libncurses5-dev automake libtool groff-base python-docutils pkg-config -y

Clone, make and isntall Varnish Cache:

	cd ~
	git clone git://git.varnish-cache.org/varnish-cache
    cd varnish-cache
	sh autogen.sh
	sh configure --enable-diagnostics --enable-debugging-symbols
	make

This'll take a while. When it's done, install, create its user, add a default configuration:

	sudo make install
	sudo ldconfig -n /usr/local/lib/
	sudo useradd varnishd
	cd /usr/local/etc
	sudo mkdir varnish
	cd varnish
	sudo nano default.vcl

Put the following into it:

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

Create a Varnish startup script:

	cd /var/www
	sudo nano start-varnish.sh

Paste the following into it:

    #!/bin/sh
    ulimit -n 10240
    ulimit -l 16384
    /usr/local/sbin/varnishd -f /usr/local/etc/varnish/default.vcl -a 0.0.0.0:80 -s malloc,16M -l 8m,1m,+ -u varnishd

Make it executable:

	sudo chmod +x start-varnish.sh

Reopen your Ghost startup script:

	sudo nano /etc/init.d/ghost.sh

Add the line:

	sudo sh /var/www/start-varnish.sh

Update rc.d:

	sudo update-rc.d ghost.sh defaults

Now we need to enable caching in Ghost (it's turned off by default) for Varnish to work:

	sudo nano /var/www/ghost/core/server/middleware/middleware.js

Change max-age here to whatever you want in seconds:

    // ### CacheControl Middleware
    // provide sensible cache control headers
    cacheControl: function (options) {
        /*jslint unparam:true*/
        var profiles = {
                'public': 'public, max-age=XXX',

Reboot:

	sudo reboot

---

### Step Four
#### Set up CloudFlare
#####[Full Tutorial](/how-to-automatically-update-cloudflare-with-your-ip-address/)

---

Create an update script:

	cd ~
	nano cfupdate.sh

Add the following (edited for your account):

    #!/bin/bash

    # CloudFlare-registered email address
    CFU=joe@doe.com

    # API key
    CFP=435345245345346656

    # The first nameserver CloudFlare gave you
    CFNS=igor.ns.cloudflare.com

    # The URL you want to update the IP address for,
    # you can use a comma-separated list for multiple
    CFHOSTS=mycoolwebsite.com,myothercoolwebsite.com

    # Get our current external IP address
    CFIP=$(curl -s http://myip.dnsomatic.com/)

    # Build the URL you need to do the update
    CFURL="https://www.cloudflare.com/api.html?a=DIUP&hosts=$CFHOSTS&u=$CFU&tkn=$CFP&ip=$CFIP"

    # Check current CloudFlare-listed IP address
    CFHOSTIP=$(nslookup $(echo $CFHOSTS | cut -d ',' -f1)$CFNS | grep Address | tail -1 | cut -d ' ' -f2)

    # If IPs differ, update CloudFlare
    if [ "$CFIP" != "$CFHOSTIP" ]
    then
        /usr/bin/curl -s $CFURL
    fi

Make it executable:

    sudo chmod +x cfupdate.sh
    sh cfupdate.sh

Set it up on a cron job:

	sudo crontab -e

Give it a 1 minute interval (more if you want):

	*/1 * * * * sh ~/cfupdate.sh

Reboot:

	sudo reboot

---

#### Check everything

At this point, everything should be set up. If your cron job's run, CloudFlare should be pointing your domain's DNS record to your Pi.

Head over to your blog's URL to check it's running, and to make sure Varnish is running you can visit:

[www.isvarnishworking.com](http://www.isvarnishworking.com)

---

Any problems? Drop me a line in the comments.

Feel free to share this post, or reproduce it or parts of it (I'd appreciate a link back if you do).
