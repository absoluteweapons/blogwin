---
layout: post
title: Adding estimated reading time to Ghost blog posts
date: 2016-10-22T00:00:00.000Z
cover: /assets/images/uploads/photo-1456574808786-d2ba7a6aa654.jpeg
---


Fancy giving your users a bit of a reading time estimate?

This script will count the number of words in your post and estimate, based on the average user's reading speed (200 words per minute), how long it'll take to read.

It then displays that at the top of the post (you should see it on top of mine and in the meta data for each post on the homepage.

*It's designed to work with the **Casper** theme. If you're using a custom theme you'll need to customise the JavaScript at the end.*

Here's how:

1. Copy the script at the end of this post
1. Open **Ghost settings**
1. Open **Code Injection**
1. Scroll down to **Blog Footer**
1. Paste the script into the text box
1. Press <button class="blue-btn">Save</button>

![Add reading time estimate to Ghost posts](/assets/images/uploads/Screen-Shot-2016-10-22-at-19.00.10-1.png)

That's it!

Load up your blog and check out your new reading time estimate.

If you want to adjust the times, change the two `wordsPerMinute` values - for example, I've changed mine to `50` because people will be following instructions, which is a much slower process.

Enjoy :-)

Any issues, hit me up in the comments.

```
<!-- Reading Time (https://github.com/michael-lynch/reading-time) -->
<script>!function(e){e.fn.readingTime=function(n){var t={readingTimeTarget:".eta",wordCountTarget:null,wordsPerMinute:270,round:!0,lang:"en",lessThanAMinuteString:"",prependTimeString:"",prependWordString:"",remotePath:null,remoteTarget:null,success:function(){},error:function(){}},i=this,r=e(this);i.settings=e.extend({},t,n);var a=i.settings;if(!this.length)return a.error.call(this),this;if("it"==a.lang)var s=a.lessThanAMinuteString||"Meno di un minuto",l="min";else if("fr"==a.lang)var s=a.lessThanAMinuteString||"Moins d'une minute",l="min";else if("de"==a.lang)var s=a.lessThanAMinuteString||"Weniger als eine Minute",l="min";else if("es"==a.lang)var s=a.lessThanAMinuteString||"Menos de un minuto",l="min";else if("nl"==a.lang)var s=a.lessThanAMinuteString||"Minder dan een minuut",l="min";else if("sk"==a.lang)var s=a.lessThanAMinuteString||"Menej než minútu",l="min";else if("cz"==a.lang)var s=a.lessThanAMinuteString||"Méně než minutu",l="min";else if("hu"==a.lang)var s=a.lessThanAMinuteString||"Kevesebb mint egy perc",l="perc";else var s=a.lessThanAMinuteString||"Less than a minute",l="min";var u=function(n){if(""!==n){var t=n.trim().split(/\s+/g).length,i=a.wordsPerMinute/60,r=t/i;if(a.round===!0)var u=Math.round(r/60);else var u=Math.floor(r/60);var g=Math.round(r-60*u);if(a.round===!0)e(a.readingTimeTarget).text(u>0?a.prependTimeString+u+" "+l:a.prependTimeString+s);else{var o=u+":"+g;e(a.readingTimeTarget).text(a.prependTimeString+o)}""!==a.wordCountTarget&&void 0!==a.wordCountTarget&&e(a.wordCountTarget).text(a.prependWordString+t),a.success.call(this)}else a.error.call(this,"The element is empty.")};r.each(function(){null!=a.remotePath&&null!=a.remoteTarget?e.get(a.remotePath,function(n){u(e("<div>").html(n).find(a.remoteTarget).text())}):u(r.text())})}}(jQuery);</script>
<script>
    if ( $("body").hasClass("post-template") ) {
        $(".post-meta").append("<br/><span class='eta'></span><span class='eta-read' style='display:none;'> read</span>");
        $(".post-content").readingTime({
        	wordsPerMinute: 200,
            success: function () {
                $(".eta-read").show();
            }
        });
    } else if ( $("body").hasClass("home-template") ) {
        $(".post").each(function() {
            $(this).find(".post-meta").append("<span class='eta' style='display:inline-block;margin-left:8px;padding-left:12px;border-left:#d5dbde 1px solid;'></span><span class='eta-read' style='display:none;'> read</span>");
            var $path = $(this).find(".post-title a").attr("href"),
            	$eta = $(this).find(".eta");
            $(this).readingTime({
                wordsPerMinute: 200,
                remotePath: $path,
                remoteTarget: ".post-content",
                readingTimeTarget: $eta,
                success: function () {
                	$(".eta-read").show();
                }
            });
        });
    }
</script>
```
