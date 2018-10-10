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
`;

export { Css };