/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.overflow = "auto";
    //document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.overflow = "hidden";
    //document.getElementById("main").style.marginLeft = "0";
}

/* Shows the failures divs and hides the successes. Shows all if Successes are already hidden */
function ShowFailures() {
    let oks = document.querySelectorAll("div.ok-test");
    let kos = document.querySelectorAll("ko-test");
    // Checks if successes are already hidden
    if(oks[1].style.height === "0px") ShowAll();
    else {
        for(let ok of oks) ok.style.height = "0px";
        for(let ko of kos) ko.style.height = "auto";
    }
}

/* Shows the successes divs and hides the failures. Shows all if failures are already hidden */
function ShowSuccesses() {
    let oks = document.querySelectorAll("div.ok-test");
    let kos = document.querySelectorAll("ko-test");
    // Checks if successes are already hidden
    if(kos[1].style.height === "0px") ShowAll();
    else {
        for(let ok of oks) ok.style.height = "auto";
        for(let ko of kos) ko.style.height = "0px";
    }
}

/* Shows all failures and successes */
function ShowAll() {
    let oks = document.querySelectorAll("div.ok-test");
    let kos = document.querySelectorAll("ko-test");
    for(let ok of oks) ok.style.height = "auto";
    for(let ko of kos) ko.style.height = "auto";
}

document.addEventListener("DOMContentLoaded", () => {
    closeNav();
});