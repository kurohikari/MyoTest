const Css: string = `
html, body {
    width: 100%;
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}

div.title {
    margin-top: 2ch;
    padding-left: 10%;
    padding-right: 10%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 0.5ch;
    font-size: 200%;
    font-weight: bold;
}

div.analysis {
    width: 80%;
    padding-top: 1ch;
    padding-left: 3ch;
    padding-right: 3ch;
    padding-bottom: 1ch;
    margin-left: 10%;
    margin-bottom: 2ch;
    border-radius: 1ch;
    background-color: rgba(230,230,230,1);
    font-size: 125%;
}

div.divider {
    width: 90%;
    height: 6px;
    padding-left: 10%;
    padding-right: 10%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 2ch;
    border-radius: 3px 3px 3px 3px;
    background-color: rgba(100,150,255,1);
}

div.ok-test {
    display: flex;
    width: 80%;
    padding-top: 1ch;
    padding-bottom: 1ch;
    margin-top: 0.5ch;
    margin-left: 10%;
    margin-bottom: 0.5ch;
    border-radius: 1ch;
    background-color: rgba(70,255,70,1);
    justify-content: center;
    align-items: center;
}

div.ko-test {
    display: flex;
    width: 80%;
    padding-bottom: 1ch;
    margin-top: 0.5ch;
    margin-left: 10%;
    margin-bottom: 0.5ch;
    border-radius: 1ch;
    background-color: rgba(255,150,150,1);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
}

div.ko-head {
    display: flex;
    width: 100%;
    padding-top: 1ch;
    padding-left: 10%;
    padding-bottom: 1ch;
    background-color: rgba(255,70,70,1);
    justify-content: center;
    align-items: center;
}

div.test-name {
    width: 80%;
    font-size: 150%;
    text-align: left;
    text-decoration: underline;
}

/* The side navigation menu */
.sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #111; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
    color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
    transition: margin-left .5s;
    padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
}
`;

export { Css };