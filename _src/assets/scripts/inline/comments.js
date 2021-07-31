((document) => {
  const insertComments = () => {
    // stop observing
    observer.disconnect();

    // hyvor settings
    window.HYVOR_TALK_WEBSITE = 4759;
    window.HYVOR_TALK_CONFIG = {
      url: {{page.url}},
    };

    // hyvor js
    const hyvor = document.createElement("script");
    hyvor.src = "https://talk.hyvor.com/web-api/embed.js";
    document.body.appendChild(hyvor);
  }

  // comment container
  const commentSection = document.createElement("div");
  commentSection.classList.add("mb-4", "mt-10");
  commentSection.setAttribute("id", "hyvor-talk-view");

  // load when nearly in view
  const options = {
    root: document,
    rootMargin: '300px',
    threshold: 0
  }

  const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting) insertComments();
  }, options);

  observer.observe(commentSection);

  // insert into end of <main>
  const main = document.querySelector("main");
  main.appendChild(commentSection);
})(document);
