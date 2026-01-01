console.log("player.js is injected into the tab");

const player = document.getElementById('playerSvg');

let playerX = 0;
let playerY = 0;

let playerCurrentX = 0;
let playerCurrentY = 0;

const playerMovementSpeed = 23; //40px is the arrow key scroll speed


let playerStartingOffset = 10;
let playerSize = 50;
let playerBottomPadding = 30;
let playerBottomOffset;
const webpageHeight = document.documentElement.scrollHeight;
const webpageWidth = document.documentElement.scrollWidth;



document.addEventListener('keydown', function(event) {
    // if (event.key === 'w' || event.key === 'W' && event.key === 'd' || event.key === 'D') {
    // walk_UP_RIGHT();
    // console.log("Walking Sideways!");
    // }
    if (event.key === 'w' || event.key === 'ArrowUp') {
    walk_UP();
    } else if (event.key === 's' || event.key === 'ArrowDown') {
    walk_DOWN();
    } else if (event.key === 'd' || event.key === 'ArrowRight') {
    walk_RIGHT();
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {
    walk_LEFT();
    } else if (event.key === 'Enter'){
    check_for_link();
    var datetime = "LastSync: " + new Date().today() + " @ " + new Date().timeNow();
    console.log(datetime);
    }
    // else {
    //     console.log("This is the space key: " + event.key);
    // }
});

function walk_UP() {
    playerY = playerY - playerMovementSpeed;

    if (playerY < 0 ) {
        player.style.top = playerStartingOffset + "px";
        playerY = playerStartingOffset;
    } else {
        player.style.top = playerY + "px";
    }
}

function walk_DOWN() {                                  //  if(playerY ">" or "<" idk webpage-height)
    playerY = playerY + playerMovementSpeed;
    playerBottomOffset = playerBottomPadding + playerSize;

    if (playerY > webpageHeight - playerBottomOffset) {             
        player.style.top = webpageHeight - playerBottomOffset + "px";
        playerY = webpageHeight - playerBottomOffset;
    } else {
        player.style.top = playerY + "px";
    }
}

function walk_RIGHT() {
    playerX = playerX + playerMovementSpeed;
    console.log(webpageWidth, playerX);


    if (playerX > webpageWidth) {
        player.style.left = webpageWidth + "px";
        playerX = webpageWidth;
    } else {
        player.style.left = playerX + "px";
    }

}

function walk_LEFT() {
    playerX = playerX - playerMovementSpeed;

    if (playerX < 0 ) {             
        player.style.left = "10px"
        playerX = 10;
    } else {
        player.style.left = playerX + "px";
    }

}

// function walk_UP_RIGHT(){
//     playerY = playerY - playerMovementSpeed;
//     player.style.top = playerY + "px";

//     playerX = playerX + playerMovementSpeed;
//     player.style.left = playerX + "px";
// }

function check_for_link() {
    let playerHitbox = player.getBoundingClientRect();

    //elementFromPoint is allways detecting the playerSvg not the element under it
    playerCurrentY = playerHitbox.top - 20;
    playerCurrentX = playerHitbox.left + playerHitbox.width / 2;

    console.log("Player Top: " + playerCurrentY + " " + "Player Left: " + playerCurrentX);

    let possible_link = document.elementFromPoint(playerCurrentX, playerCurrentY);
    

    if (possible_link !== null) { // (possible_LINK.nodeName === 'A' || possible_LINK.nodeName === 'a' && possible_LINK !== null)
    console.log(possible_link.nodeName + " was clicked.");
    possible_link.click();
    }
}







Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}
