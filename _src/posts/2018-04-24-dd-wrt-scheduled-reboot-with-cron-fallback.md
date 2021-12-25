---
layout: post
title: DD-WRT scheduled reboot (with cron fallback)
date: 2018-04-24T21:31:48.000Z
cover: /assets/images/uploads/00100dPORTRAIT_00100_BURST20180424222321310_COVER.jpg
meta_description: Workarounds to DD-WRT's reboot scheduler using cron to enable automatic reboots.
---
If your DD-WRT router occasionally ~~craps out~~ struggles or stops working properly (usually after being on for a while), try scheduling a reboot. It should help clear the memory and keep everything running smoothly (in my experience).

> *Side note: this post is as much for me as it is you :-) Every time I want to do this I have to search through forums until I find [this one](https://www.dd-wrt.com/forum/viewtopic.php?t=301441&view=next&sid=565f217e9e26e6714000ab35e97b0418), to get the final script I got to that worked.*

## First, try the built in method

1. Login to your DD-WRT router's web interface, usually at `192.168.0.1` or `192.168.1.1`
2. Navigate to:
    - Administration
    - Keep Alive
3. Switch on **Scheduled Reboot**
4. Set it to reboot as often as you like at a time when you're unlikely to miss the Internet for a few minutes (e.g. daily at 3AM)
    ![Screen-Shot-2018-04-24-at-21.39.41](/assets/images/uploads/Screen-Shot-2018-04-24-at-21.39.41.png)
5. Click **Apply Settings**
6. Navigate to:
    - Administration
    - Management
7. **Reboot Router** at the bottom of the page

### Is it working?

There are two ways to check. Either wait until tomorrow, login and check the uptime (top right corner) to see if it's the right number of hours after your rooter rebooted this morning.

Or...set the scheduled reboot to a time that's about 10 minutes in the future from when you set it. Reboot and watch your WiFi. Very soon it should disconnect while your router reboots so you know it's working (you can check the uptime when it's back).

## If that doesn't work, get scripting

Here's the punchline. That doesn't work for me :-( Scheduled reboot is...scheduled. But my router never reboots. If the same happens to you, try this:

1. Disable the built in **Scheduled Reboot** if you enabled it (e.g. above)
2. Navigate to:
    - Administration
    - Commands
3. Copy and paste the following code into the big text box:

    ```sh
    echo "#!/bin/sh" > /tmp/restart_router 
    echo "startservice run_rc_shutdown; /sbin/reboot" >> /tmp/restart_router 
    chmod a+x /tmp/restart_router 
    echo "0 3 * * * root /tmp/restart_router" > /tmp/cron.d/restartrouter
    ```
    
    It'll look like this:
    
    ![Screen-Shot-2018-04-24-at-22.11.18](/assets/images/uploads/Screen-Shot-2018-04-24-at-22.11.18.png)

4. Click **Save Startup**, now it'll look like this:

    ![Screen-Shot-2018-04-24-at-22.11.33](/assets/images/uploads/Screen-Shot-2018-04-24-at-22.11.33.png)
    
5. Navigate to:
    - Administration
    - Management
6. **Reboot Router** at the bottom of the page

### What this does

The script will, every time your DD-WRT router boots, create a shell script that reboots your router. It modifies that script's permissions to make it executable. Then it creates a cron job to run that script at 3AM every day.

If 3AM every day isn't right for you, adjust the `0 3 * * *` portion to suit your needs. You can use [crontab.guru](https://crontab.guru/#0_3_*_*_*) to see what you're doing.

Same as above, you can either check it works by checking the next day to see if your uptime's right; or you can set it to a shorter time in the future and check then.

Hope it helps :-)

Jamie