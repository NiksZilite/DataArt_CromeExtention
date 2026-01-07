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

const allText = document.body.innerText;

document.body.innerText = "";

    var reworkedText = document.createElement("p");
    document.body.appendChild(reworkedText);
    reworkedText.classList.add('reworkedText');
    reworkedText.innerHTML += allText;