---
layout: post
title: How to setup CloudFlare CDN on your Raspberry Pi with automatic dynamic DNS updates
date: 2014-02-23T00:00:00.000Z
---


For the uninitiated, CloudFlare is a fantastic *free* service that will improve the security and speed of your website.

![](/assets/images/uploads/Screenshot_2014_02_23_16_27_49.png)

They offer a DNS-managed CDN, which means your static content is *automa(t|g)ically* cached around the world. They also provide website security, by detecting and challenging malicious activity.

*At the time of writing, CloudFlare do not offer an affiliate program. I will make no money from them for singing their praises.*

If you haven't already done so, head over to CloudFlare and [set up an account](https://www.cloudflare.com/sign-up). Add your URL to it and follow the instructions to migrate your DNS to CloudFlare.

You should end up with a few records, the most important of which will be similar to this:

![](/assets/images/uploads/Screenshot_2014_02_23_13_58_18.png)

This is what we're going to point to the Pi. To do so, you'll need you API key. Leave the following page open in CloudFlare:

[https://www.cloudflare.com/my-account](https://www.cloudflare.com/my-account)

Next up, SSH into your Pi and create an empty script for the CloudFlare updates (put it wherever you like, for the purposes of this tutorial we'll stick it in our home folder):

	cd ~
    nano cfupdate.sh

Now we're going to use an excellent script from [Jim Drash](http://jimdrash.com/node/5), which does the actual updating:

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

Save it. Make it executable and run it to test:

	sudo chmod +x cfupdate.sh
    sh cfupdate.sh

Now set it to run on a cron job. Your timing here depends on your setup. I've set mine to update every minute, but I have it running on a separate Pi.

If you're setting this up on a Pi that's running your webserver, you *might* want to change it to every five minutes. Test a few different times out to see what works best:

	sudo crontab -e

And add the following line to the end:

    */1 * * * * sh ~/cfupdate.sh

Substituting the 1 for the frequency (in minutes) with which you want to run the script. Give it a reboot and you're ready to go:

	sudo reboot

Your Raspberry Pi is now updating CloudFlare as a dynamic DNS :-)

Want to check? Reboot your router, wait a few minutes and refresh your CloudFlare DNS list. Your Pi's IP address should update automatically.
