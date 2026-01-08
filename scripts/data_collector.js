const dontDeleteIDs = ["playerSvg"];

(async () => {
  console.log("=== PAGE & BROWSER INFO ===");
    // if (node.tagName === "IMG") {
    //     node.remove();
    //     console.log('deleted IMG');
    // } else if (node.tagName === "SVG" && !dontDeleteIDs.includes(node.id)) {
    //     node.remove();
    //     console.log('deleted SVG');
    // }

  // 1. Cookies
  console.log("Cookies:", document.cookie || "(no accessible cookies)");
    if (document.cookie){
        var foundCookie = document.createElement("p");
        document.body.appendChild(foundCookie);
        foundCookie.classList.add('foundCookie');
        foundCookie.innerHTML += "cookie";
    }
  // 2. User Agent
  console.log("User Agent:", navigator.userAgent);

  // 3. Screen Resolution
  console.log(
    "Screen Resolution:",
    `${screen.width}x${screen.height}`
  );

  // 4. Time Zone
  console.log(
    "Time Zone:",
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  console.log("=== FETCH /api/data ===");

  try {
    const response = await fetch("/api/data");


    const data = await response.json();
    console.log("API Data:", data);
  } catch (error) {
    console.log("Fetch failed:", error.message);
  }
})();



// const observer = new MutationObserver(mutations => {
//   mutations.forEach(mutation => {
//     mutation.addedNodes.forEach(node => {
//       if (node.tagName === "IMG") {
//         node.remove();
//         console.log('deleted IMG');
//     } else if (node.tagName === "SVG" && !dontDeleteIDs.includes(node.id)) {
//         node.remove();
//         console.log('deleted SVG');
//     }
//     });
//   });
// });


// observer.observe(document.body, { childList: true, subtree: true })

// const allText = document.body.innerText;

function extractTextWithLinks() {
  const clone = document.body.cloneNode(true);

  clone.querySelectorAll(
    "script,style,noscript,iframe,canvas,svg,img,picture,video,audio,source,track,embed,object,link,meta"
  ).forEach(el => el.remove());

  clone.querySelectorAll(
    "nav, footer, header, aside"
  ).forEach(el => el.remove());

  clone.querySelectorAll("*").forEach(el => {
    el.removeAttribute("class");
    el.removeAttribute("id");
  });

  clone.querySelectorAll("*").forEach(el => {
    [...el.attributes].forEach(attr => {
      if (attr.name.startsWith("on")) {
        el.removeAttribute(attr.name);
      }
    });
  });

  clone.querySelectorAll("*").forEach(el => {
  if (!["P", "A", "H1", "H2", "H3", "UL", "OL", "LI", "BLOCKQUOTE"].includes(el.tagName)) {
    el.replaceWith(...el.childNodes);
  }
});

  return clone.innerHTML;
}

const content = extractTextWithLinks();

chrome.runtime.sendMessage({
  action: "SAVE_PAGE_HTML",
  html: content
});



// chrome.runtime.sendMessage({
  
//   action: "SAVE_PAGE_TEXT",
//   text: allText
// });

document.body.innerText = "";

chrome.storage.local.get(["savedPage_new", "savedPage_old", "commonWords"], (result) => {
  if (!result.savedPage_new) return;
      console.log("New: " + result.savedPage_new);
      console.log("Old: " + result.savedPage_old);
    var reworkedText = document.createElement("p");
    reworkedText.classList.add('reworkedText');
    reworkedText.innerHTML = result.savedPage_new;
    document.body.appendChild(reworkedText);
    console.log("Pages saved & compared. Common words:", result.commonWords);
});






