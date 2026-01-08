let playerColor;
let PlayerColorID = 0;

let isExtensionOn = 'off';

const playerSprite = document.getElementById("player-color-showcase");
const startButton = document.getElementById("start-button");
const noOff = document.getElementById("on_off");



startButton.addEventListener("click", () => {
    

    chrome.runtime.sendMessage({ action: "runBackend" });
    if (isExtensionOn = 'off') {
        noOff.style.fill = "red";
        const isExtensionOn = 'on';
    } else if (isExtensionOn = 'on'){
        noOff.style.fill = "#b9c724";
        const isExtensionOn = 'off';
    }

    // function delay(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    
    // delay(1000).then(() => {

    // const player = document.getElementById('playerSvg');
    // let playerChildren = player.querySelectorAll('rect');

    // if (PlayerColorID == 0){
    //     playerChildren.forEach((rect, index) => {
    //         rect.style.fill = "#b9c724";
    //     });
    // } else if (PlayerColorID == 1){
    //     playerChildren.forEach((rect, index) => {
    //         rect.style.fill = "red";
    //     });
    // } else if (PlayerColorID == 2){
    //     playerChildren.forEach((rect, index) => {
    //         rect.style.fill = "blue";
    //     });

    // } else if (PlayerColorID == 3) {
    //     playerChildren.forEach((rect, index) => {
    //         rect.style.fill = "purple";
    //     });

    // } else if (PlayerColorID == 4) {
    //     playerChildren.forEach((rect, index) => {
    //         rect.style.fill = "#f8a813";
    //     });

    // }

    // });

});

document.getElementById("color-selector-back").addEventListener("click", () => {

playerColorID--;
if (PlayerColorID <= -1){
    PlayerColorID = 4;
}

setPlayerColor(PlayerColorID);

});

document.getElementById("color-selector-forward").addEventListener("click", () => {

PlayerColorID++;
if (PlayerColorID >= 5){
    PlayerColorID = 0;
}

setPlayerColor(PlayerColorID);

});

function setPlayerColor() {

    if (PlayerColorID == 0){
    playerSprite.style.fill = "#b9c724";

    } else if (PlayerColorID == 1){
    playerSprite.style.fill = "red";

    } else if (PlayerColorID == 2){
    playerSprite.style.fill = "blue";

    } else if (PlayerColorID == 3) {
    playerSprite.style.fill = "purple";

    } else if (PlayerColorID == 4) {
    playerSprite.style.fill = "#f8a813";
    }

    return PlayerColorID;
}

