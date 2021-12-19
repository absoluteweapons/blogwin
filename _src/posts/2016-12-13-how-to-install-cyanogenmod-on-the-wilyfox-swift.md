---
layout: post
title: How to install CyanogenMod on the Wilyfox Swift
date: 2016-12-13T00:00:00.000Z
cover: /assets/images/uploads/photo-1480694313141-fce5e697ee25.jpeg
---


<h5 style="color:red">Update: the CyanogenMod project has ceased and it is becoming <a href="https://www.lineageos.org/">LineageOS</a>. I'll update this, or write a new guide when I know more.</h5>

<p style="color:red">You can download nightly builds of LineageOS for your Wileyfox here: <a href="https://download.lineageos.org/crackling">https://download.lineageos.org/crackling</a>. At the time of writing, there is no LineageOS recovery. From what I've read on forums, TWRP is superior anyway - you can download it here for the Swift: <a href="https://twrp.me/devices/wileyfoxswift.html">https://twrp.me/devices/wileyfoxswift.html</a>.</p>

<p style="color:red">I <em>have not tested them</em> as I gave my Swift away to a family member. The steps should be similar to below but as you'll be using a different recovery software, they'll look slightly different. Proceed carefully and Google if you get stuck. There are some very helpful forums out there, which have helped me get out of a bind or two before.</p>

<p style="color:red">If you do test them, I'd love to know how it goes in the comments below, and good luck :-)</p>

***

<a class="btn btn-red" href="https://www.google.co.uk/search?q=bricked+android">Warning: modifying your phone may brick it or void its warranty</a>

**This guide was written for Mac OS X.** You'll need to substitute some instructions if you're following on Windows/Linux - Google is your friend.

Also, it was written for the **Wileyfox Swift 1**. I have not tested it on the Swift 2; if you do, take care and let me know how it goes in the comments.

***

I've got to admit, this took me some time to figure out. I was following the [CyanogenMod guide here](https://wiki.cyanogenmod.org/w/Install_CM_for_crackling). Right up until step 7 of 'Unlocking the bootloader', everything was great. But then I got stuck with  `< waiting for any device >` in Terminal.

I gave it a few tries and realised the only commands that weren't working were the ones that included the **vendor ID**. I discovered that my device's vendor ID is different from what CyanogenMod's guide suggests it should be (I'm not sure why). This guide will include finding your own vendor ID to ensure your Fastboot commands work.

There were a few other things that didn't work for me as they were specified in CyanogenMod's guide, so I've written this to cover the whole process (including installing Google Apps).

**If you just want to see how to get your vendor ID, [jump to that section](#vendorid).**

##### What's in the guide?

1. [Prerequisites](#prerequisites)
    - Safety precautions to protect your phone
    - Installing ADB and Fastboot
    - Downloading CyanogenMod, CyanogenMod recovery image and Google Apps (GAPPS)
1. [Unlocking your Wileyfox Swift's bootloader](#bootloader)
    - Enabling the developer menu, USB debugging and OEM unlocking
    - Finding your vendor ID
    - Rebooting to recovery
    - Using Fastboot to unlock your bootloader
1. [Installing CyanogenMod recovery](#recovery)
    - Flashing via Fastboot
1. [Installing CyanogenMod and Google Apps (GAPPS)](#cyanogenmod)
    - Factory data reset
    - Sideloading via ADB

***

<a id="prerequisites"></a>
##### Prerequisites

- ###### Safety Precautions
    1. [Back up your data](https://www.google.co.uk/search?q=back+up+android)
    1. Use a good quality USB cable.
        - Seriously. The first time I tried this I got stuck because my USB cable was crappy. I recommend using your official Wileyfox cable as it's the best fit for the phone's USB port.
    1. Make sure your Mac (PC if you're using one) won't go to sleep during the process.
        - Consider [Caffeine for Mac](http://lightheadsw.com/caffeine/) or [Caffeinated for Windows](http://desmondbrand.com/caffeinated/).
    1. Be sensible. If you don't understand something, Google it.
    1. Keep [this link](https://cyngn.com/support) handy, use it to download stock Cyanogen OS if you want to set your phone back to factory.

- ###### Installing ADB and Fastboot (from **Terminal**)
    1. Install [Homebrew](http://brew.sh):
        - `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
    1. Install ADB & Fastboot:
        - `brew install android-platform-tools`
    1. Confirm both, entering:
        - `which adb`
            - Should return `/usr/local/bin/adb`
        - `which fastboot`
            - Should return `/usr/local/bin/fastboot`

- ###### Download everything you need
    1. [CyanogenMod](https://download.cyanogenmod.org/get/crackling-snapshot.zip) and [CyanogenMod Recovery](https://download.cyanogenmod.org/get/crackling-snapshot-recovery.img)
        - Or download whichever version you want from the CyanogenMod page: https://download.cyanogenmod.org/?device=crackling
    1. [Google Apps](http://opengapps.org)
        - You need the **ARM64** version of the Android matching your CyanogenMod.
        - I recommend *Nano*, it provides the basic framework, then you can download whatever else you want from the Play Store; saving space and memory. (*Stock* was too big for my 'fox anyway).
        - Find out which version of Android your CyanogenMod download is running [here](https://en.wikipedia.org/wiki/CyanogenMod#Version_history).
        - Compare Open GApps versions [here](https://github.com/opengapps/opengapps/wiki/Package-Comparison).

<a id="bootloader"></a>

##### Unlocking your Wileyfox Swift's bootloader

- ###### Enabling the developer menu, USB debugging and OEM unlocking
    1. Open **Settings**.
    1. Scroll down to the bottom and navigate to **About phone**.
    1. Locate the **Build number**.
    1. Tap it until the screen displays the message:
        - `You have enabled development settings!`
            ![Enable Development options on Android](/assets/images/uploads/Screenshot_20161204-205207.png)
    1. Navigate back to **Settings**.
    1. Open **Developer options**.
    1. Scroll down to and enable **OEM unlocking**.
    1. Scroll further down to and enable **Android debugging**.
        - You will be asked to *Allow USB debugging?* at this point, and presented with an RSA key fingerprint. First tick **Always allow from this computer**, then press **Ok**.

- ###### Rebooting to Fastboot
    1. Open **Terminal**.
    1. Run the following command:
        - `adb reboot bootloader`

<a id="vendorid"></a>

- ###### Finding your vendor ID

    You're running this *after* rebooting to Fastboot deliberately. While in Fastboot my Swift reports a different vendor ID (one from Google Inc. according to System Information). You need the Fastboot vendor ID to run the following commands.

    1. With your Wileyfox still plugged into your Mac, open **System Information** (search for it in Spotlight).
    1. Click on **USB** on the left, then on **Android**.
    1. Copy your **Vendor ID** from the main screen.
    ![Wileyfox Swift vendor ID](/assets/images/uploads/Screen-Shot-2016-12-04-at-21.52.56.png)
    1. Verify the vendor ID by entering the following command (replacing `0x18d1` with your vendor ID, unless it's the same):
        - `fastboot -i 0x18d1 devices`
    1. You should see something like this:
        - `983ee483	fastboot`

- ###### Using Fastboot to unlock your bootloader
    1. Run the following command:
        - `fastboot -i 0x18d1 oem unlock-go`
        <a class="btn btn-red">THIS. WILL. ERASE. ALL. DATA.</a>
    1. Choose "yes" by using the **volume down** followed by **power** buttons.
    ![Unlock Wileyfox Swift bootloader](/assets/images/uploads/IMG_0300.JPG)
    1. Now choose **Reboot to Android**.

***

It'll take time to optimise apps so make yourself a cuppa/coffee/long glass of water.

When it's done, go through the setup screens (you're resetting again so *skip everything*) then **[re-enable USB debugging](#bootloader)** (come back here afterwards).

***

<a id="recovery"></a>

##### Installing CyanogenMod recovery

- ###### Flashing via Fastboot

    1. With USB debugging enabled again, go back to Terminal and enter:
        - `adb reboot bootloader`
    1. Verify the connection:
        - `fastboot devices`
    1. If you see your device, enter:
        - `fastboot flash recovery /path/to/cyanogen/recovery`
        - Replace `/path/to/cyanogen/recovery` with the full path to your CyanogenMod **Recovery** file.
        - **TIP:** Drag and drop the recovery file into Terminal from Downloads.
        ![Flashing CyanogenMod Recovery](/assets/images/uploads/Screen-Shot-2016-12-12-at-19.26.30.png)
    1. On your Wileyfox, select **Reboot to Recovery** (volume up/down to move, power to choose).
    ![CyanogenMod Recovery](/assets/images/uploads/IMG_0319.JPG)

<a id="cyanogenmod"></a>

##### Installing CyanogenMod and Google Apps (GApps)

- ###### Factory data reset

    1. Choose **Factory reset** from the menu.
    1. Choose **Yes** from the next menu.
    1. Choose **Full factory reset** if asked.
    <a class="btn btn-red">THIS. WILL. ERASE. ALL. DATA...AGAIN.</a>
    1. Press the **back button** at the bottom (left triangle) to return to the main menu.

- ###### Sideloading via ADB

    1. Choose **Apply update**.
    1. Choose **Apply from ADB**.
    1. In Terminal enter:
        - `adb sideload /path/to/cyanogenmod/rom`
        - Replacing `/path/to/cyanogenmod/rom` with the full path to the CyanogenMod **ROM** (not recovery) you downloaded earlier.
        - Don't forget to drag and drop into Terminal.
    1. Wait for it to finish uploading.
        - **DO NOT unplug the USB cable.
        - DO NOT let your computer sleep.**
        - If you downloaded and haven't activated Caffeine(ated), now is the time to activate.

    *Now do the same for the Google Apps package you downloaded. Skip this if you don't want Google Apps (you won't have a Play Store).*

    1. **Apply update**.
    1. **Apply from ADB**.
    1. `adb sideload /path/to/gapps`
        - In Terminal, replace `/path/to/gapps` with the real path.
    1. Wait patiently.

When all's said and done, **Reboot system now** and get excited. Your device should boot into a clean, crapware-free CyanogenMod. Ready for you to install whatever you want :-)

If you run into problems, post in the comments. I'll do what I can to help.

Further reading (careful, I'm inviting you into a rabbit hole now; I've spent many a night tinkering with people's custom ROMs from XDA): http://forum.xda-developers.com/wileyfox-swift

Enjoy.

Jamie
