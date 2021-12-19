---
layout: post
title: How to add Disqus comments to Ghost without editing core files
date: 2015-08-31T00:00:00.000Z
cover: /assets/images/uploads/photo-1517048676732-d65bc937f952.jpeg
---


**Update: 09/08/16**

*Added check to ensure this is only running on posts and not on non-post pages (e.g. homepage). Prevents JavaScript errors, which could interfere with other scripts.*

***

<a class="btn btn-blue" href="#full-snippet">Jump to full code snippet</a>

Ghost's code injection feature makes it dead easy to add external scripts without editing core files. This is especially useful for future-proofing those scripts against Ghost updates.

I recently added Disqus using this method, and would like to share my snippet with some explanation so that anyone else using Ghost can add comments in the same way.

If you know what you're doing and don't want the explanation, [jump down to the full code snippet](#full-snippet).

Otherwise, read on.

##### Before we start

You need to open your Disqus install page with your full Disqus snippet (the universal code). It's located at **/admin/settings/universalcode/** in your blog's configuration area on Disqus (so mine is https://jamiegoodwin.disqus.com/admin/settings/universalcode/).

Keep the page open, you'll be copying parts of the script into your blog.

![Disqus Universal Code](/assets/images/uploads/Screen-Shot-2015-08-31-at-09-54-02.png)

##### 1. Create the Disqus comments element

We can to use JavaScript to create and place the Disqus `<div>` where we want it to appear in our blog.

First, navigate to *Code Injection* in your blog's settings.

![Ghost Code Injection](/assets/images/uploads/Screen-Shot-2015-08-31-at-09-22-55.png)

Scroll down to *Blog Footer* and paste the following in the text area:

```
<script>
if ( $("body").hasClass("post-template") ) {
    var dsq_div = document.createElement('div'),
        dsq_hr = document.createElement('hr'),
        dsq_append = document
            .getElementsByClassName("post-template")[0]
            .getElementsByClassName("site-wrapper")[0]
            .getElementsByClassName("content")[0]
            .getElementsByClassName("post")[0];

    dsq_div.id = "disqus_thread";
    dsq_append.appendChild(dsq_hr);
    dsq_append.appendChild(dsq_div);
```

***What this does***

The first part, `hasClass("post-template")` checks that we're on a post page and not, for example, the homepage. This only allows Disqus to run on your post pages.

The second part, `var ...` creates three JavaScript variables:

1. `dsq_div`, which will hold our Disqus comments;
2. `dsq_hr`, which will add a horizontal rule between the end of your post and your comments (optional); and
3. `dsq_append`, which holds the post element and will allow us to append our comments to it after our post.

Next we give our `<div>` the ID *disqus_thread* so that Disqus can identify it. Then we append both our `<hr>` and our `<div>` to the end of our blog post.

##### 2. Add your Disqus short name

Now that we've created and added our Disqus comment holder, we can put the script in to identify our blog to Disqus:

    /* * * CONFIGURATION VARIABLES * * */
    var disqus_shortname = 'BLOGSHORTNAMEHERE';

Replace *BLOGSHORTNAMEHERE* with your blog's short name - or just copy and paste this bit from your Disqus snippet.

##### 3. Add the rest of the Disqus snippet

Finally, paste the rest of the Disqus snippet below your other code:

```
    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() { var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true; dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq); })();
}
</script>
```

##### Putting it all together

You should end up with something that looks like the **[full snippet](#full-snippet)** below. Once you have, save it (top right) and check your blog posts to make sure it worked.

Any problems? Post them in the (Disqus) comments below and I'll see what I can do :-)

![Disqus in Ghost](/assets/images/uploads/Screen-Shot-2016-08-09-at-23-17-52.png)

Enjoy!

- - -

<a name="full-snippet"></a>
##### Full Snippet

Add this to your `{{ghost_foot}}`.

*Don't forget to replace BLOGSHORTNAMEHERE with your blog's short name*

```
<script>
if ( $("body").hasClass("post-template") ) {
    var dsq_div = document.createElement('div'),
        dsq_hr = document.createElement('hr'),
        dsq_append = document
            .getElementsByClassName("post-template")[0]
            .getElementsByClassName("site-wrapper")[0]
            .getElementsByClassName("content")[0]
            .getElementsByClassName("post")[0];

    dsq_div.id = "disqus_thread";
    dsq_append.appendChild(dsq_hr);
    dsq_append.appendChild(dsq_div);

    /* * * CONFIGURATION VARIABLES * * */
    var disqus_shortname = 'BLOGSHORTNAMEHERE';

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() { var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true; dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq); })();
}
</script>
```
