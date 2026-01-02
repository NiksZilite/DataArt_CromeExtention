console.log("clock.js is injected into the tab");

const webpageRoot = document.documentElement;


console.log("clock.js got refrence to style sheet");

function remap_range(value, low1, high1, low2, high2) {
    if(value >= 0 && value <=30) {                                                          // 0 and 23 are Midnight, so 12 is Midday(noon)
        return Math.round(low2 + (high2 - low2) * (value - low1) / (high1 - low1));         // 0-23 = 0-100     Remaping value to 0-100
    } else if (value > 30) {
        return Math.round(high2 + (low2 - high2) * (value - low1) / (high1 - low1));        // 0-23 = 100-0     Remaping value to 100-0, lower value = higher remap value // higher value = lower remaped value
    }
}

function cycleStyle(value1, value2, percent1, percent2) {
    // webpageRoot.style.setProperty("--invertPrecent", percent + "%");
    webpageRoot.style.setProperty("--backgroundHUE", value1);
    webpageRoot.style.setProperty("--textColorHUE", value2);
    webpageRoot.style.setProperty("--backgroundLightness", percent1 + "%");
    webpageRoot.style.setProperty("--textColorLightness", percent2 + "%");
}

function timeNow(date = new Date()) {
    return (date.getSeconds());
    //     return (
    //     String(date.getHours()).padStart(2, "0") + ":" +
    //     String(date.getMinutes()).padStart(2, "0") + ":" +
    //     String(date.getSeconds()).padStart(2, "0")
    // );
}

(function getTime(){
    const currentHour = timeNow();
    console.log("Hour: " + currentHour);

    cycleStyle(remap_range(currentHour, 0, 59, 300, -300), remap_range(currentHour, 0, 59, 40, 520), remap_range(currentHour, 0, 59, 10, 170), remap_range(currentHour, 0, 59, 85, -25));

    // The REMAPED VALUE will stop growing and start shrinking after the ORIGINAL VALUES half way point (0-12 = growing, 12-23 = shrink). *because of the if statement in "remap_range"
    // The REMAPED VALUES RANGE has to be *2, so that when the ORIGINAL VALUE reaches the half way point the REMAPED VALUE will have reached the wanted peek value.
    // From the ORGINAL VALUES of 0-12 the REMAPED VALUES will go from 0-300, because the REMAPED VALUES RANGE is 0-600. From 12-23 the REMAPED VALUES will start droping from 300-0.

    // For growing values the REMAPED VALUES RANGE is doubled, by just *2 the destination value (0-300 the wanted destination value is "300").
    // For reversed remap values like 0-12 = 280-40, were the REMAPED VALUE has to shrink by default, not grow:
    // We get the REMAPED VALUES RANGE between the REMAPED VALUES (280-40=240), then we subtract the REMAPED VALUES RANGE from the second value(the wanted destination value "40", not the sarting value > 280).
    // What we get is a new value range of 280-(-200), were the half way point is 280-40, because the REMAPED VALUE RANGE is (240*2=480).

    // The staring value should be Midnights wanted values and the destination value should be Middays(Noons) wanted values. Because 0 and 23 is Midnight and 12 is Noon. 
    /*
    Dawn = 
    Noon = background-color: hsl(0, 100%, 90%), color: hsl(280, 100%, 30%)
    Dusk = 
    Midnight = background-color: hsl(300, 100%, 10%), color: hsl(40, 100%, 85%)
    */
    setTimeout(getTime, 1000);
})();
