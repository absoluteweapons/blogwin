---
layout: post
title: How to fix Ghost's slow login on Raspberry Pi
date: 2014-12-25T00:00:00.000Z
---


If you've got a copy of Ghost running on a Raspberry Pi (or perhaps another ARM-based server) you'll probably have noticed that it takes AAAAAGES to login.

To fix it, `cd` into your Ghost directory:

	cd /path/to/ghost

And run the following command:

	sudo npm install bcrypt && sudo sed -i "s/require('bcryptjs')/require('bcrypt')/" core/server/models/user.js

- - -

**Here's what happens**

1. `sudo npm install bcrypt` installs the bcrypt library into your Ghost installation.
2. `&&` makes sure that command completed successfully before running the next one
3. `sudo sed -i "s/require('bcryptjs')/require('bcrypt')/" core/server/models/user.js` finds the string `require=('bcryptjs')`, which is what tells Ghost to use the bcryptjs library, and replaces it with `require=('bcrypt')`, telling it to use your newly installed (faster) bcrypt library instead.

Enjoy your speedy new Ghost login!
