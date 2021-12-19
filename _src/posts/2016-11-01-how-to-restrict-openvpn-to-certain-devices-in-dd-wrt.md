---
layout: post
title: How to restrict OpenVPN to certain devices in DD-WRT
date: 2016-11-01T00:00:00.000Z
cover: /assets/images/uploads/photo-1516044734145-07ca8eef8731.jpeg
---


OpenVPN on DD-WRT offers a great feature, whereby you can restrict the VPN to only specified IP addresses.

This means that you could:

- Only run the VPN on specific devices (for example, I have it running on my Fire Stick with Kodi).
- Use the VPN only when you want it by setting a custom IP on your device.

***

Here's how it works, in the DD-WT admin interface (e.g. 192.168.1.1):

###### Restrict your VPN device(s) to fixed IP addresses

This locks your devices to particular IP addresses, which you'll then use for the VPN.

1. Navigate to **Status** > **LAN**

    ![DD-WRT LAN status](/assets/images/uploads/Screen-Shot-2016-10-23-at-22.18.07.png)
1. Scroll down to **Active Clients** and locate your device; it may take a bit of guesswork

    ![DD-WRT Active Clients](/assets/images/uploads/Screen-Shot-2016-10-23-at-22.30.00.jpg)
1. Copy its `Hostname` and `MAC Address` - stick them in TextEdit/Notepad or similar
1. Navigate to **Services**
1. Under **DHCP Server**, hit `Add` to add a line to **Static Leases**
1. Paste the `MAC Address` and `Hostname` you copied earlier

    ![DD-WRT static lease](/assets/images/uploads/Screen-Shot-2016-10-23-at-22.36.09.jpg)
1. Type the IP address you'd like to lock this device to
1. Leave client lease time blank
1. Scroll to the bottom and **Save**


***

###### Restrict OpenVPN to specified IP addresses

1. Navigate to **Services** > **VPN**

      ![DD-WRT VPN](/assets/images/uploads/Screen-Shot-2016-10-23-at-22.06.33.png)
1. Scroll down to **OpenVPN Client**
1. Find the box labelled **Policy based Routing**
1. Add the IP addresses of the devices you want to access the Internet through the VPN

    ![DD-WRT OpenVPN Policy based Routing](/assets/images/uploads/Screen-Shot-2016-10-23-at-22.15.45.png)
1. **Save** and **Apply Settings**

***

###### Reboot to refresh IP addresses

There are other ways to do this but the simplest way to get your newly locked device onto the correct IP address, and therefore the VPN, is to reboot:

1. Navigate to **Administration**
1. Scroll to the bottom and hit **Reboot Router**
    ![DD-WRT reboot router](/assets/images/uploads/Screen-Shot-2016-10-23-at-23.10.08.png)

***

That's it!

Once your router reboots, you should be able to access the Internet VPN-free on all devices but the one(s) specified in **Policy based Routing**.
