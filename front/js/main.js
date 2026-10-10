// Loads every page section from its own HTML file (in the same folder as body.html), then starts its behaviour.
//
// A section file may contain elements with a data-mount="<id>" attribute; those
// go into that mount point instead of the section's default one (the background
// uses this to put the sky at the top of the page and the grass at the bottom).

import { initFlyingRainbowDash, initTreeShake } from "./background.js";
import { initGiftBook } from "./gift.js";
import { initCountdown } from "./event.js";
import { initDressSlider } from "./dress.js";

const sections = [
  {
    files: ["background.html"],
    mount: "background-top",
    init() {
      initFlyingRainbowDash();
      initTreeShake();
    },
  },
  { files: ["logo.html"], mount: "logo-container" },
  { files: ["intro.html"], mount: "intro-container" },
  { files: ["banner.html"], mount: "banner-container" },
  { files: ["godparents.html"], mount: "godparents-container" },
  {
    files: ["event.html"],
    mount: "event-container",
    init: initCountdown,
  },
  {
    files: ["dress.html"],
    mount: "dress-container",
    init: initDressSlider,
  },
  { files: ["frame.html"], mount: "frame-container" },
  { files: ["gift.html"], mount: "gift-container", init: initGiftBook },
];

async function fetchHtml(file) {
  const res = await fetch(file);
  if (!res.ok) throw new Error(res.status + " " + res.statusText);
  return res.text();
}

async function loadSection({ files, mount, init }) {
  try {
    // Fetch in parallel, insert in the listed order
    const htmls = await Promise.all(files.map(fetchHtml));

    for (const html of htmls) {
      const template = document.createElement("template");
      template.innerHTML = html;

      for (const node of Array.from(template.content.childNodes)) {
        const target = document.getElementById((node.dataset && node.dataset.mount) || mount);
        target.appendChild(node);
      }
    }

    if (init) init();
  } catch (err) {
    console.error("Could not load " + files.join(", ") + ":", err);
  }
}

sections.forEach(loadSection);
