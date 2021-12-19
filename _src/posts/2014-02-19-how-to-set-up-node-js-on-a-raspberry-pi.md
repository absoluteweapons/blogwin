---
layout: post
title: How to set up node.js on a Raspberry Pi
date: 2014-02-19T00:00:00.000Z
---
---

**You will need:** *Raspberry Pi + Raspbian (HF), the Internet, basic SSH skills.*

**Estimated duration:** *5 minutes*

---

Thanks to the fantastic work of Raspberry Pi forum user [nathanjohnson320](http://www.raspberrypi.org/forums/viewtopic.php?f=66&t=54817), installing [node.js](http://nodejs.org/) on a Raspberry Pi is as easy as...pie!

![node.js](/assets/images/uploads/nodejs_1024x768.png)

Move into your user (or, wherever your want) folder:

	cd ~
    
Grab a copy of the latest node.js build from Nathan's Heroku app:

	wget http://node-arm.herokuapp.com/node_latest_armhf.deb
*For peace of mind: he runs a 4-hourly cron job to rebuild this from the latest stable release as soon as they're updated.*

Install node.js from the `.deb` file:

	sudo dpkg -i node_latest_armhf.deb
    
Once it's finished, run the following to check that it's installed; and to find out what version you're running:

	node -v
    
Done!

Pop over to [Nathan's original post](http://www.raspberrypi.org/forums/viewtopic.php?f=66&t=54817) to say thank you.

--- 

**Following "how to run Ghost effectively from a Raspberry Pi?"**

*Next tutorial:* 
[How to set up the Ghost blogging platform (with node.js and Forever) on a Raspberry Pi](/how-to-set-up-ghost-blogging-platform-with-node-js-and-forever-on-a-raspberry-pi/)