
console.log("Element creator is injected into the tab.");

const injected_style = document.createElement("style");
document.head.appendChild(injected_style);
const fontStyleSheet = injected_style.sheet;

console.log("Created a refrence to extention style sheet.");

var fontURLrefrence = chrome.runtime.getURL("fonts/MyFontWOFF2.woff2");
fontStyleSheet.insertRule("@font-face {font-family: 'customFont'; src: url(" + fontURLrefrence + ") format('woff2'); font-weight : 400; ont-style : normal; font-display : swap;", 0);

console.log("Added icon_font refrence to style sheet.");

// var overlayCanvas = document.createElement("canvas");
// document.body.appendChild(overlayCanvas);
// overlayCanvas.classList.add("overlayCanvas");

// console.log("Created a canvas");

var playerSvg = document.createElement("div");
document.body.appendChild(playerSvg);
playerSvg.innerHTML += '<svg width="50px" height="50px" version="1.1" viewBox="0 0 270.93 270.93" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g transform="translate(88.9 26.988)"><rect x="-58.248" y="56.894" width="213.34" height="187.03" stroke-linecap="square" stroke-width="4.045" style="paint-order:markers fill stroke"/><rect transform="matrix(1 0 .0038016 .99999 0 0)" x="-31.112" y="-26.982" width="125.27" height="65.267" stroke-linecap="square" stroke-width="4.045" style="paint-order:markers fill stroke"/><path fill="black" d="m-88.675 108.5v-135.45h61.313v29.631h29.599v-29.631h29.599v29.631h-29.599v31.747h59.199v-61.378h120.51v270.91h-90.912v-59.262h31.714v-61.378h-31.714v-29.631h-29.599v-29.631h-59.199v59.262h-29.599v61.378h29.599v59.262h-90.912zm120.51 105.82v-29.631h29.599v59.262h-29.599z" stroke-width="1.0005"/></g></svg>';
playerSvg.id = 'playerSvg';

console.log("Player sprite has been added to " + playerSvg);
