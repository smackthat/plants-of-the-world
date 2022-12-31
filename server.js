const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.set("port", process.env.PORT || 3001);

const apiUrl = 'https://trefle.io/api/v1/';

//#region Plants

/** Gets all the native plants for a distribution zone */
app.get("/api/plants/forRegion/:regionId", async (req, res) => {

    const regionId = req.params.regionId;
    const page = req.query.page || 1;

    const response = await runRequest(`${apiUrl}/plants?zone_id=${regionId}&order[common_name]=asc&token=${process.env.TREFLE_API_KEY}&page=${page}`, res);

    res.status(200).json(response);
});

/** Gets a single plant with id */
app.get("/api/plants/:plantId", async (req, res) => {

    const plantId = req.params.plantId;
    const response = await runRequest(`${apiUrl}/species/${plantId}?token=${process.env.TREFLE_API_KEY}`, res);

    res.status(200).json(response);
});

/** Searchs for plants by query string */
app.get("/api/plants/search/:query", async (req, res) => {

    const query = req.params.query;

    const response = await runRequest(`${apiUrl}/plants/search?q=${query}&token=${process.env.TREFLE_API_KEY}`, res);

    res.status(200).json(response);
})

//#endregion Plants

app.listen(app.get("port"), () => {
    console.log(`Server listening at port ${app.get("port")}`);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

async function runRequest(reqString, res) {

    try {
        const response = await fetch(reqString);
        return await response.json();
    } catch (error) {
        res.status(500).send(error);
    }
}
