const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.TINK_CLIENT_SECRET;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

// Needed to make client-side routing work in production.


const base = "https://api.tink.se/api/v1";

// This is the server API, where the client can post a received OAuth code.
app.post("/callback", function (req, res) {
    getAccessToken(req.body.code)
        .then(response => getData(response.access_token))
        .then(response => sortData(response))
        .then(response => {
            res.json({
                response
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: err.toString()});
        });
});

app.post("/sort", function (req, res) {
    return readData().then(data => sortData(data));
});

app.post("/sorttwo", function (req, res) {
    return getData("eyJhbGciOiJFUzI1NiIsImtpZCI6ImZkOGNiNjRlLWVhODAtNDc3NC04MTJmLWFjNWM2NjliMWJhYiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDYyMjcxOTQsImlhdCI6MTYwNjIxOTk5NCwiaXNzIjoidGluazovL2F1dGgiLCJqdGkiOiJlYTA0YzIyYS02NWU4LTRkYTEtOTRiNi03Yjg5Y2ZhMDBjZTUiLCJvcmlnaW4iOiJtYWluIiwic2NvcGVzIjpbInVzZXI6cmVhZCIsInRyYW5zYWN0aW9uczpyZWFkIl0sInN1YiI6InRpbms6Ly9hdXRoL3VzZXIvNzAwMjBhMjM0OTdlNDE3MDg3Y2MzZmUwZDBkNzZiMTUiLCJ0aW5rOi8vYXBwL2lkIjoiNDQyZDE3YWQ3ZGMxNDEzYTkzYTY4NjI0MzdmMGIwNzUifQ.fj-df-EnnJ5p5MhUPq-69NHUIAUo21Ku0pxgkUL8MZLvUqlkq07-IHipuGAeKao8fjp_w6wa5I9gMS04SuBhNQ").then(data => sortData(data));
});


async function handleResponse(response) {
    const json = await response.json();
    if (response.status !== 200) {
        /*throw new Error(json.errorMessage);*/
        await response().catch(e => {
            throw e
        })
    }
    return json;
}

async function readData() {
    const fs = require('fs')
    data = fs.readFileSync('json.json')
    json = JSON.parse(data)
    return json;
}

async function getData(accessToken) {
    console.log("accessToken", accessToken)
    const transactionData = await (getTransactionData(accessToken))
    /*const [
    categoryData,
    userData,
    /!*accountData,
    investmentData,*!/
    transactionData
    ] = await Promise.all([
    getCategoryData(accessToken),
    getUserData(accessToken),
    /!*getAccountData(accessToken),
    getInvestmentData(accessToken),*!/
    getTransactionData(accessToken)
    ]);

    return {
    categoryData,
    userData,
    /!*accountData,
    investmentData,*!/
    transactionData
    };*/
    return transactionData;
}

async function sortData(data) {

    const newData = data.results;
    const newinput = [];
    const testdata = await newData;
    const parsedjson = [];

    testdata.forEach(function (i) {
        newinput.push(i.transaction);
    });

    var holder = {};

    newinput.forEach(function (d) {

        if (holder.hasOwnProperty(d)) {
            holder[d.formattedDescription] = holder[d.formattedDescription] + d;
        } else {
            holder[d.formattedDescription] = d;
        }
    });

    for (var prop in holder) {
        parsedjson.push({name: prop, data: holder[prop]});
    }

    //removes Swish
    const noswishjson = await parsedjson.filter(function (el) {
        if (!el.name.startsWith('46')) {
            return el
        }
    });

    const sorted = noswishjson.sort(function (a, b) {
        return a.data.amount - b.data.amount;
    });

    console.log("SORTED", sorted);

    return sorted;


}

async function getAccessToken(code) {
    const body = {
        code: code,
        client_id: CLIENT_ID, // Your OAuth client identifier.
        client_secret: CLIENT_SECRET, // Your OAuth client secret. Always handle the secret with care.
        grant_type: "authorization_code"
    };

    const response = await fetch(base + "/oauth/token", {
        method: "POST",
        body: Object.keys(body)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
            .join("&"),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    });

    return handleResponse(response);
}

async function getUserData(token) {
    const response = await fetch(base + "/user", {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    return handleResponse(response);
}

/*async function getAccountData(token) {
const response = await fetch(base + "/accounts/list", {
headers: {
"Content-Type": "application/json",
Authorization: "Bearer " + token
}
});

return handleResponse(response);
}*/

/*async function getInvestmentData(token) {
const response = await fetch(base + "/investments", {
headers: {
"Content-Type": "application/json",
Authorization: "Bearer " + token
}
});

return handleResponse(response);
}*/

/*Category: "EXPENSES",
categoryType: "EXPENSES"*/
async function getTransactionData(token) {
    const response = await fetch(base + "/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            categoryType: 'EXPENSES',

        },
        body: JSON.stringify({
            limit: 1000,
            startDate: "2020-01-01",
            endDate: "2020-12-31",
            categoryType: 'EXPENSES'
        })
    });
    return handleResponse(response);
}

async function getCategoryData(token) {
    const response = await fetch(base + "/categories", {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    return handleResponse(response);
}

if (!CLIENT_ID) {
    console.log(
        "\x1b[33m%s\x1b[0m",
        "Warning: REACT_APP_CLIENT_ID environment variable not set"
    );
}

if (!CLIENT_SECRET) {
    console.log(
        "\x1b[33m%s\x1b[0m",
        "Warning: TINK_CLIENT_SECRET environment variable not set"
    );
}

// Start the server.
const port = 8080;
app.listen(port, function () {
    console.log("Tink example app listening on port " + port);
});
