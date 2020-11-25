import React from "react";


export async function getImage(response) {
    const teenage = await response;
    let newurl = "";
    const redefined = teenage.split(" ");

    const name = redefined[0]

    const xhr = await new XMLHttpRequest();

    xhr.onload = () => {
        if (xhr.status === 200) {
            newurl = "https://logo.clearbit.com/spotify.se"
        } else {
            newurl = "https://logo.clearbit.com/spotify.se"
        }
    };

    /**/
    /*const name = redefined[0]*/
    console.log("name", name)
    console.log("dsdsdsdsdsdsdsdsdds", redefined)

    /*console.log("https://logo.clearbit.com/${url}.se", `https://logo.clearbit.com/${name}.se`)*/


    const theory = newurl;
    console.log("newurlnewurlnewurlnewurl", newurl)
    console.log("newurlnewurlnewurlnewurl", theory)

    xhr.open('HEAD', `https://logo.clearbit.com/spotify.se`);
    xhr.send();
    return theory;
};