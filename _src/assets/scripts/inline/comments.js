((document, storage) => {
  const insertComments = (hyvorContainer) => {
    // stop observing
    observer.disconnect();

    // dynamically add hyvor to avoid posthtml-minify-classnames minifying id
    const hyvorDiv = document.createElement("div");
    hyvorDiv.id = "hyvor-talk-view";
    hyvorContainer.appendChild(hyvorDiv);

    // hyvor settings
    window.HYVOR_TALK_WEBSITE = 4759;
    window.HYVOR_TALK_CONFIG = {
      url: "{{page.url}}",
      palette: 
        (storage.theme === "dark" || (!("theme" in storage) && prefersDark))
        ? palettes.dark
        : palettes.light,
    };

    // hyvor js
    const hyvorScript = document.createElement("script");
    hyvorScript.src = "https://talk.hyvor.com/web-api/embed.js";
    document.body.appendChild(hyvorScript);
  };

  window.setCommentPalette = () => {
    let palette = storage.theme === "dark" ? palettes.dark : palettes.light;
    typeof hyvor_talk === "object" && hyvor_talk.setPalette(palette);
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
      backgroundText: "#111827",
    },
    dark: {
      accent: "#F87171",
      accentText: "#FFFFFF",
      footerHeader: "#1A243C",
      footerHeaderText: "#FFFFFF",
      box: "#111827",
      boxText: "#FFFFFF",
      boxLightText: "#FFFFFF",
      backgroundText: "#FFFFFF",
    },
  };

  const hyvorContainer = document.querySelector("[data-comments-container]");

  // load when nearly in view
  const options = {
    rootMargin: "300px",
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) insertComments(hyvorContainer);
  }, options);

  observer.observe(hyvorContainer);
})(document, localStorage);
