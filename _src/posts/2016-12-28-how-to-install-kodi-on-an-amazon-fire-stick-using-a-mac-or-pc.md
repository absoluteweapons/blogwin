---
layout: post
title: How to install Kodi on an Amazon Fire Stick (using a Mac or PC)
date: 2016-12-28T00:00:00.000Z
cover: /assets/images/uploads/kodi.jpg
---
### Before you begin - protect yourself

I recommend Private Internet Access (PIA), a well-priced (&#36;3.33 a month if you pay for a year) VPN to secure and encrypt your internet activity.

*Full disclosure: I make a little money from your subscription. But I've been using PIA for years and wouldn't recommend them otherwise.*

<a href="https://www.privateinternetaccess.com/pages/buy-vpn/jgoodwin" target="_blank" class="btn btn-green">Protect my privacy</a>

Link opens in a new tab so you can carry in with the tutorial :-)

---

<a href="javascript:null;" rel="nofollow" target="_blank">These links</a> will open in a new tab, you can close them when you're done.

<a href="#instructions" class="btn btn-blue">Skip to instructions</a>

If you're after a little more than just 'out of the box' functionality, you could try giving yourself the ability to [watch live TV from your Amazon Fire Stick](/2016-07-24-how-to-stream-live-tv-from-amazons-fire-stick) using the TV Player app.

If that's not enough for you, it's time to give [Kodi](https://kodi.tv/about/) a whirl. It'll give you access to all of the amazing add ons that a world of awesome developers has created. It'll also allow you to connect to your home network and stream your movies and TV shows directly through your Fire Stick.

<a name="instructions"></a>

#### Step 1 - on your Fire Stick

###### 3rd party apps, USB debugging, IP address

1. Navigate to **Settings**
1. &gt; **System**
1. &gt; **Developer Options**
1. Enable **USB Debugging** and **Apps from Unknown Sources**
1. Go back to **System**
1. &gt; **About**
1. &gt; **Network**
1. Note your Fire Stick's **IP Address** or leave it on this screen

##### Step 2 - on your PC or Mac

###### Download Kodi and install it to your Fire Stick

1. Download and install [adbLink from Jocala](http://jocala.com)
    - Tip: use the "Mirror" links.
1. Download [Kodi 17.1 "Krypton" ARM x86](http://mirrors.kodi.tv/releases/android/arm/kodi-17.1-Krypton-armeabi-v7a.apk)
    - If that fails to install, try one of these older versions:
      - [Kodi 17.0 "Krypton" ARM x86](http://mirrors.kodi.tv/releases/android/arm/kodi-17.0-Krypton-armeabi-v7a.apk)
      - [Kodi 16.1 "Jarvis" ARM x86](http://mirrors.kodi.tv/releases/android/arm/old/kodi-16.1-Jarvis-armeabi-v7a.apk)
      - Visit [http://mirrors.kodi.tv/releases/android/arm/](http://mirrors.kodi.tv/releases/android/arm/) for more links.
1. Launch **adbLink** on your computer
    ![adbLink for OS X](/assets/images/uploads/Screen-Shot-2016-12-27-at-17.50.49.jpg)
1. Click **New**
1. Enter **Description** `Fire Stick`
1. In **Address**, enter the IP address displayed on your Fire Stick
1. Press **Save**
    ![adbLink - add new device](/assets/images/uploads/Screen-Shot-2016-12-27-at-17.55.15.jpg)
1. Choose **Fire Stick** under **Current device** if it's not already selected
1. Press **Connect**
1. Once it's connected, you'll see your device's IP address under **Connected devices**
    ![adbLink - connected devices](/assets/images/uploads/Screen-Shot-2016-12-27-at-18.05.24.jpg)
1. Click **Install APK**, top left of the bottom buttons
1. Locate and choose the **Kodi** file you downloaded in **2**
    ![adbLink - installing Kodi](/assets/images/uploads/Screen-Shot-2016-12-27-at-18.23.52.jpg)
1. Choose **Yes** at the confirmation prompt
    ![adbLink - installing Kodi (prompt)](/assets/images/uploads/Screen-Shot-2016-12-27-at-18.25.36.jpg)

adbLink is now installing Kodi to your Fire Stick. You'll see its progress in the bottom right of the window.

When it's finished, you'll be able to launch Kodi from your Fire Stick by navigating to:

**Home** > **Apps** > **Kodi**

The icon looks like the one in the picture at the top of this post. After you've used it, it'll show up in your **Recent** menu at the top.

Enjoy :-)

Trouble? Pop it in the comments and I'll try to help.

---

**Update 2017-04-26**

- *Added direct links to Kodi.*
- *Simplified adbLink instructions.*
