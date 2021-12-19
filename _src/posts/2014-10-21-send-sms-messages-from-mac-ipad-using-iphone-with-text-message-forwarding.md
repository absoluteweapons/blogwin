---
layout: post
title: Enable Text Message Forwarding in iOS 8.1 (send SMS messages from your Mac or iPad)
date: 2014-10-21T00:00:00.000Z
cover: /assets/images/uploads/photo-1423784346385-c1d4dac9893a.jpeg
---
###### Quick links:

- [Send SMS from Mac (Yosemite)](#send-sms-from-mac-yosemite)
- [Send SMS from iPad](#send-sms-from-ipad)
- [No activation code fix](#no-activation)

---

One of the best features (in my opinion) of iOS 8 and OS X Yosemite is the ability to send SMS messages to your contacts from the *Messages* app in OS X.

With iOS 8.1, that just became a reality :-)

However, enabling it isn't as easy as it seems. I've scoured various posts online and found quite a few different suggestions (mostly in comments) so I've compiled a few of them here.

Hopefully, this will be a definitive guide (I'll endeavour to add anything that goes into the comments).

The most common problem is people not getting the activation code in Messages. If that's happening to you, [skip to this part](#no-activation).

---

<h4 id="send-sms-from-mac-yosemite">Send SMS from Mac (Yosemite)</h4>

---


1. Download iOS 8.1 on your iPhone, Yosemite on your Mac:
	- **iPhone**
    	1. Open *Settings*
    	2. Go to *General*
    	3. Go to *Software Update*
    	4. Download and install iOS 8.1
	- **Mac**
	    1. Open the *Mac App Store*
    	2. Search for or click on *Yosemite* <a href="https://itunes.apple.com/gb/app/os-x-yosemite/id915041082?mt=12" target="_blank">(direct link)</a>
	    3. Click *Free* > *Install App*
2. Once they're both installed, sign into *iCloud* and *iMessage* on both devices:
	- **iPhone**
    	1. Open *Settings*
        2. Go to *iCloud*
        3. Sign in
	- **Mac**
    	1. Open *System Preferences*
        2. Open the *iCloud* preference pane
        3. Sign in
        4. Open *Messages*
        5. Open preferences (cmd + , or *Messages* > "Preferences")
		![Messages Preferences](/assets/images/uploads/Screenshot-2014-10-21-20-20-42.png)
    	6. Make sure your *iCloud* account is there, and signed in
3. Now that you're signed in on both, it's time to start forwarding SMS messages:
	- **iPhone**
    	1. Open *Settings*
        2. Go to *Messages*
        3. Go to *Text Message Forwarding*
        4. Enable it for your Mac
		![Enable Text Message Forwarding in iOS 8](/assets/images/uploads/IMG_0326.jpg)
	- **Mac**
    	1. At this point, *Messages* should open in *Yosemite* if it isn't already
        2. Enter the code you see in *Messages* into your iPhone [(no code?)](#no-activation)
		![Activate Text Message Forwarding in Yosemite](/assets/images/uploads/SMS-Forwarding.jpg)

---

That's it! From now on you should be able to send and receive SMS messages in *Yosemite* on your *Mac*.

However, if like me you didn't see the activation code message in *Messages* on *Yosemite*, [here's your fix...](#no-activation)

---

<h4 id="send-sms-from-ipad">Send SMS from iPad</h4>

---

1. Download iOS 8.1 on your iPhone and iPad:
    1. Open *Settings*
    2. Go to *General*
    3. Go to *Software Update*
    4. Download and install iOS 8.1
2. Sign into *iCloud* on both devices:
    1. Open *Settings*
    2. Go to *iCloud*
    3. Sign in
3. Enable *Text Message Forwarding* to your iPad
	**On your iPhone**
    1. Open *Settings*
    2. Go to *Messages*
    3. Go to *Text Message Forwarding*
    4. Enable it for your iPad
    5. Enter the code you see on your iPad [(no code?)](#no-activation)
![Enable Text Message Forwarding to iPad](/assets/images/uploads/IMG_0006.jpg)

---

<h4 id="no-activation">Text Message Forwarding Yosemite - No Activation Code | Fix 1</h4>
###### Enable @icloud.com address

---

There are two popular methods online to fix it, but I think both cover essentially the same thing.

You **must have your *iCloud* email address enabled in Messages** (it might not necessarily have to be your @icloud.com one, but I recommend it to prevent problems).

That means:

- **Make sure you're signed into iCloud in iMessage on your iPhone**
	1. Open *Settings*
    2. Go to *Messages*
    3. Go to *Send and Receive*
    4. If your screen says "Use your Apple ID for iMessage", tap that and sign in
    5. If your screen says "Apple ID:" followed by your Apple ID, move on...
	![Sign into iCloud for iMessage](/assets/images/uploads/IMG_0792-1.jpg)

- **iOS 8**
	1. Open *Settings*
	2. Go to *Messages*
    3. Go to *Send & Receive*
    4. Enable you *@icloud.com* email address (tap it so it's ticked)
	![Enable iCloud email address in iMessage](/assets/images/uploads/IMG_0330.jpg)
- **Yosemite**
	1. Open *Messages*
    2. Open *Preferences*
    3. Switch to *Accounts*
    4. Tick the box next to your *@icloud.com* email address
	![Enable iCloud email address in Messages](/assets/images/uploads/Screenshot-2014-10-21-22-47-55.jpg)

Once you've enabled your *iCloud* email address on both devices, try enabling *Text Message Forwarding* again.

This is what fixed it for me, I have to thank commenter [C Mac on iDownloadBlog](http://www.idownloadblog.com/2014/10/20/how-to-use-text-message-forwarding-in-os-x-yosemite/#comment-1645768958) for providing this absolute gem!


---

#### No Activation Code | Fix 2
###### Sign out of and back into iCloud

---

If enabling your *iCloud* email address doesn't work, the next most popular suggestion in the comments is to sign out of *iCloud*, *iMessage* and even *FaceTime* on all of your devices, then sign in again one-by-one starting with your *iPhone*.

However, I get the impression that all this has for most is to enable the *@icloud.com* email address, because it's turned on by default.

---

Let me know how you get on in the comments. As I said, if anyone has any other problems / fixes I'll try to incorporate them into the post.

Jamie
