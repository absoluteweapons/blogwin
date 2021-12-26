---
layout: post
date: 2021-12-25T15:13:03Z
draft: true
title: Web development on an iPad Pro is finally here, but there’s a (small) cost
cover: "/assets/images/ce433dd3-ccf9-42d2-bae0-c848974da3ec.jpeg"
meta_description: ''

---
Say whaaa!? Yep. You can build websites on an iPad.

In fact, you’ve been able to build them on an iPad for a while (using [Code Server](https://github.com/coder/code-server "Code Server - VS Code-based browser-accessible IDE")) but it’s been fiddly to set up and (for me) a little temperamental.

Now however, GitHub have made their own browser-based implementation of VS Code called [GitHub Codespaces](https://github.com/features/codespaces "GitHub Codespaces: browser-based implementation of VS Code") and it works…really quite well!

Combine this with a good browser inspector and web dev is truly possible on an iPad Pro.

# The catches and caveats

It’s not quite perfect. I’d say it’s good enough for casual coders (me) or if you want multi-device coding so you can do the odd bit while you’re away with your iPad.

1. **It’s not free**

   There’s a waitlist for what _might_ be a free version.The paid version costs **$4 per month, plus $0.18 per hour of use.**
2. **It’s not touch-friendly**

   Some of the VS Code features aren’t “touchable” - like the status bar buttons. So far **I’ve found ways around this**.
3. **It’s not (totally) iOS-friendly**

   While Codespaces isn’t active it begins to timeout. If I’ve gone to a different app (e.g. a web browser) on the iPad, often I come back and Codespaces has to reload. Again, **I’ve worked around this**.

# That said, give it a try!

It’s still by far the best setup I’ve had for coding on an iPad and it is absolutely usable when you get used to it. I’ve finished migrating the build system for my blog from Jekyll to Eleventy and I did the last bits - including git merging into master and handling merge conflicts - on the iPad Pro.

The main thing is, I love it! My iPad is my primary device for casual web browsing and I can use it for casual coding too. This is what I bought it for a few years ago and that dream is finally becoming a reality.

# How to do web development on an iPad Pro 👌

## Option one: wait for free

From what I can tell it looks like there’ll be a free version - but you need to join a waitlist:

[https://github.com/features/codespaces/signup](https://github.com/features/codespaces/signup "https://github.com/features/codespaces/signup")

I was on it for a few months and didn’t get an invite.

## Option two: pay $4/mo + $0.18 per hour

If you can’t wait you can pay to access it now. This requires you to convert your GitHub account to an organisation (or set up a new organisation).

It costs **$4 a month** for a GitHub Team organisation, **plus $0.18 per hour of use** for the base GitHub Codespaces instance, **and $0.07 per GB stored**. You set a spending cap on the usage costs.

To put this into context, at **19.5 hours** coding and a **5GB** site so far this month my bill is **$7.97 total**.

To reduce my storage cost I’m going to set up separate image storage like [Git LFS from GitHub](https://git-lfs.github.com/ "Git Large File Storage from GitHub").

[Pricing for GitHub organisations](https://github.com/pricing "GitHub pricing")

[Pricing for GitHub Codespaces](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-codespaces#codespaces-pricing "Pricing for GitHub Codespaces")

### Step one: set up an organisation

Navigate to [**Organisations**](https://github.com/settings/organizations "GitHub organisations") in your GitHub account area and either upgrade your account to an organisation, or set up a new organisation.

> Tip: I set up a new organisation and regretted it. I had to move my repositories into the organisation and reconnect all apps and services. I wish I’d upgraded my account instead.

### Step two: enable Codespaces on your account