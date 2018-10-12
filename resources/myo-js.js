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
    let kos = document.querySelectorAll("div.ko-test");

    // Don't do anything when there is either no failure or pass
    if(oks.length === 0 || kos.length === 0) return false;

    // Checks if successes are already hidden
    if(oks[0].style.display === "none") return ShowAll();
    else {
        for(let ok of oks) ok.style.display = "none";
        for(let ko of kos) ko.style.display = "flex";
        return false;
    }
}

/* Shows the successes divs and hides the failures. Shows all if failures are already hidden */
function ShowSuccesses() {
    let oks = document.querySelectorAll("div.ok-test");
    let kos = document.querySelectorAll("div.ko-test");

    // Don't do anything when there is either no failure or pass
    if(oks.length === 0 || kos.length === 0) return false;

    // Checks if successes are already hidden
    if(kos[0].style.display === "none") return ShowAll();
    else {
        for(let ok of oks) ok.style.display = "flex";
        for(let ko of kos) ko.style.display = "none";
        return false;
    }
}

/* Shows all failures and successes */
function ShowAll() {
    let oks = document.querySelectorAll("div.ok-test");
    let kos = document.querySelectorAll("div.ko-test");

    // Don't do anything when there is either no failure or pass
    if(oks.length === 0 || kos.length === 0) return false;

    for(let ok of oks) ok.style.display = "flex";
    for(let ko of kos) ko.style.display = "flex";
    return false;
}

function Toggle(event) {
    let elem = event.target;
    while(!(elem.classList.contains("ko-test") || elem.classList.contains("ok-test"))) {
        elem = elem.parentElement;
    }
    console.log(elem);
    elem = elem.querySelector("div.toggable");
    if(elem.style.display === "none") elem.style.display = "block";
    else elem.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    closeNav();
});