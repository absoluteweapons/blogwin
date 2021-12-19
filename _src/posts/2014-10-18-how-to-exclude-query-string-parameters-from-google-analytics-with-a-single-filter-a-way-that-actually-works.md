---
layout: post
title: Exclude query string parameters from Google Analytics for a more accurate page views statistic
date: 2014-10-18T00:00:00.000Z
cover: /assets/images/uploads/photo-1477013743164-ffc3a5e556da.jpeg
---
---

*If you know what you're doing and are just looking for the right regex, this is for you:*

	([^\?]+)(\?.*)?

*Then use **$A1** to output the URL without its query string.*

*Head to http://regexr.com/39o0i if you want to tinker. Otherwise, read on...*

---

They're the bane of any Google Analytics user's life. Query string parameters.

For the uninitiated, query string parameters are:

> www.test.com/?**this=bit**

They're fine for telling your server bits of information, like which product you're looking at or what you've just searched for, but in your Google Analytics reports they can be quite troublesome because they create separate pageviews, e.g.

- *www.test.com/basket*
- *www.test.com/basket?id=qwerty123*
- *www.test.com/basket?id=qwerty123&affiliate=894*

Would each show as a separate URL and page view in GA (totalling 3 different views of the same /basket page). Sometimes this is fine, it's exactly the behaviour you want (www.test.com/products?item=super-cool-binoculars), but if it isn't, here's how to get rid.

---

1. Open Google Analytics, switch to **Admin**

	![Google Analytics | Admin Section](/assets/images/uploads/Screenshot-2014-10-18-19-04-24.png)

2. Create a new **View** in your chosen **Property**, or switch to the **View** you'd like to remove query strings from

	![Google Analytics | New View](/assets/images/uploads/Screenshot-2014-10-18-19-10-44.png)

3. In your new **View**, switch to **Filters**

	![Google Analytics | Filters](/assets/images/uploads/Screenshot-2014-10-18-19-13-17.png)

4. Then press **+NEW FILTER**

	![Google Analytics | Filters | Create New](/assets/images/uploads/Screenshot-2014-10-18-19-13-25.png)

5. Enter or choose the following:
	- **Create new Filter**
	- **Filter Name**: [Call it what you want]
	- **Filter Type**: Custom > Advanced
    - **Field A -> Extract A**: Request URI `([^\?]+)(\?.*)?`
    - **Field B -> Extract B**: [Leave blank]
    - **Output To -> Constructor**: Request URI `$A1`
    - **Field A Required**: [Tick]
    - **Field B Required**: [No tick]
    - **Override Output Field**: [Tick]
    - **Case Sensitive**: [No tick]

Now, before we go on I'll explain the most important bit. It's this *regular expression* in **Field A -> Extract A**'s **Request URI**:

> ([^\?]+)(\?.*)?

That's a very complicated way of saying:

- Capture everything **before** the **?** as group **1**
- Capture everything **after** and including the **?** as group **2**

Giving Google Analytics `$A1` tells it that we want to insert **group 1** from **field A** into the new **Request URI** - omitting group two :-)

![Google Analytics | Filters | Remove Query String Parameters](/assets/images/uploads/Screenshot-2014-10-18-19-56-25.png)

---

That's it!

Save your filter then switch to **Real-Time > Overview** in **Reporting** to see it in action. You should get a much clearer picture of your most popular pages.

Hope it helps, let me know in the comments if you get stuck.
