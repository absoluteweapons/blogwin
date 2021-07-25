((window, document, storage) => {
  // dark class
  const darkClass = document
    .querySelector("[data-dark-class]")
    .getAttribute("class");
  // os preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // function to toggle class based on local storage or browser prefs
  const manageDark = () => {
    // change label
    const darkLabel = document.querySelector("[data-dark-label]");

    if (storage.theme === "dark" || (!("theme" in storage) && prefersDark)) {
      document.documentElement.classList.add(darkClass);
      darkLabel.textContent = "Dark Mode";
    } else {
      document.documentElement.classList.remove(darkClass);
      darkLabel.textContent = "Light Mode";
    }
  };

  // toggle radio input
  const darkToggle = document.querySelector("[data-dark-input]");

  // respect storage for pre-checked
  if (storage.theme === "dark" || (!("theme" in storage) && prefersDark)) {
    darkToggle.checked = true;
  } else {
    darkToggle.checked = false;
  }

  // listen for changes
  darkToggle.addEventListener("click", (event) => {
    // set correct state
    storage.theme = darkToggle.checked ? "dark" : "light";

    // apply new state
    manageDark();
  });

  // set on load
  manageDark();
})(window, document, sessionStorage);
