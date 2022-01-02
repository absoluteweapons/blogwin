const path = require('path')
// JSDOM for DOM manipulation
const { JSDOM } = require("jsdom");

module.exports = async (content, outputPath) => {
  // only apply transforms if the output is html (not xml or css or something)
  if (outputPath.endsWith(".html")) {
    // feed the content into jsdom
    const dom = new JSDOM(content);
    const document = dom.window.document;

    // find all outbound links
    const anchors = document.querySelectorAll(
      "a[href*='http']"
    );

    // no outbound links? crack on
    if (anchors.length === 0) {
      return content;
    }

    // loop through and add rel, etc
    const processLinks = async () => {
      await Promise.all(
        Object.keys(anchors).map(async (i) => {
          anchors[i].setAttribute("rel", "nofollow noopener noreferrer");
          anchors[i].setAttribute("target", "_blank");
        })
      );

      return `<!DOCTYPE html> ${document.documentElement.outerHTML}`;
    };

    return await processLinks();
  } else {
    return content;
  }
};
