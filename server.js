const express = require('express');
const https = require('https');
require('dotenv').config();

// console.log(process.env.TREFLE_API_KEY);

const app = express();
app.set("port", process.env.PORT || 3001);

app.get("/api/test", (req, res) => {

    // console.log('Got a request! ', req);
    res.status(500).json([]);
});

/** Gets Trefle API JWT token */
app.get("/api/auth", (req, res) => {

    const params = {
        origin: process.env.SITE_ORIGIN,
        ip: req.ip,
        token: process.env.TREFLE_API_KEY
    };

    console.log('Params? ', params)

    var request = https.request("https://trefle.io/api/auth/claim", {
        method: 'post',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    }, function (res) {
        console.log(res);
        res.json(res);

    });
});

app.listen(app.get("port"), () => {
    console.log(`Server listening at port ${app.get("port")}`);
});
