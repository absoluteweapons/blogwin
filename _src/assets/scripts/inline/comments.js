((document, storage) => {
  const insertComments = () => {
    // stop observing
    observer.disconnect();

    // hyvor settings
    window.HYVOR_TALK_WEBSITE = 4759;
    window.HYVOR_TALK_CONFIG = {
      url: "{{page.url}}",
      palette: (storage.theme === "dark") ? palettes.dark : palettes.light
    };

    // hyvor js
    const hyvor = document.createElement("script");
    hyvor.src = "https://talk.hyvor.com/web-api/embed.js";
    document.body.appendChild(hyvor);
  }

  window.setCommentPalette = (dark) => {
    (dark) ? hyvor_talk.setPalette(palettes.dark) : hyvor_talk.setPalette(palettes.light);
  };

  // hyvor colour palettes
  const palettes = {
    light: {
      accent: "#F87171",
      accentText: "#111827",
      footerHeader: "#EFEFEF",
      footerHeaderText: "#111827",
      box: "#FFFFFF",
      boxText: "#111827",
      boxLightText: "#111827",
      backgroundText: "#111827"      
    },
    dark: {
      accent: "#F87171",
      accentText: "#FFFFFF",
      footerHeader: "#1A243C",
      footerHeaderText: "#FFFFFF",
      box: "#111827",
      boxText: "#FFFFFF",
      boxLightText: "#FFFFFF",
      backgroundText: "#FFFFFF"
    }
  };

  // load when nearly in view
  const options = {
    rootMargin: '300px'
  };

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) insertComments();
  }, options);

  const commentSection = document.getElementById("hyvor-talk-view");
  console.log(document, commentSection);
  observer.observe(commentSection);
})(document, sessionStorage);
