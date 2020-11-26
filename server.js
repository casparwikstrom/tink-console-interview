const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");
const fs = require('fs')

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.TINK_CLIENT_SECRET;
//Testing the api
/*const AUTH_TOKEN = "";*/

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

// Needed to make client-side routing work in production.
const base = "https://api.tink.se/api/v1";

// This is the server API, where the client can post a received OAuth code.
app.post("/callback", function (req, res) {
    getAccessToken(req.body.code)
        .then(response => getTransactionData(response.access_token, 1000, '2020-01-01', '2020-12-31', 'EXPENSES'))
        .then(response => getTopMerchants(response))
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

//Testing the api
app.post("/test_api_local", function (req, res) {
    return readTestData("json.json").then(data => getTopMerchants(data));
});

app.post("/test_api_real_data", function (req, res) {
    return getTransactionData(AUTH_TOKEN, 1000, '2020-01-01', '2020-12-31', 'EXPENSES').then(data => getTopMerchants(data));
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

async function readTestData(path) {
    data = fs.readFileSync(path)
    json = JSON.parse(data)
    return json;
}

async function getTopMerchants(transactionData) {

    const transactions = await transactionData.results;
    let merchantMap = {};

    transactions.forEach(function (transaction) {
        if (merchantMap[transaction.transaction.formattedDescription]) {

            merchantMap[transaction.transaction.formattedDescription] = merchantMap[transaction.transaction.formattedDescription] + transaction.transaction
        } else {
            merchantMap[transaction.transaction.formattedDescription] = transaction.transaction
        }
    });

    var max = Number.NEGATIVE_INFINITY
    var topMerchant = []

    for (let key in merchantMap) {
        if (merchantMap[key]["amount"] > max) {
            max = merchantMap[key][["amount"]]
            topMerchant = {
                name: key,
                amount: merchantMap[key]["currencyDenominatedAmount"]["currencyCode"],
                currency: merchantMap[key]["amount"],
                img: "http://logo.clearbit.com/spotify.se",

            }
        }
    }
    return topMerchant;
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

async function getTransactionData(token, limit, starDate, endDate, categoryType) {
    const response = await fetch(base + "/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            categoryType: 'EXPENSES',

        },
        body: JSON.stringify({
            limit: limit,
            startDate: starDate,
            endDate: endDate,
            categoryType: categoryType,
        })
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
