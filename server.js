const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.set("port", process.env.PORT || 3001);

//#region Plants

/** Gets all the native plants for a distribution zone */
app.get("/api/plants/forRegion/:regionId", async (req, res) => {

    const regionId = req.params.regionId;
    const page = req.query.page || 1;
    
    const response = await fetch(`https://trefle.io/api/v1/plants?zone_id=${regionId}&order[common_name]=asc&token=${process.env.TREFLE_API_KEY}&page=${page}`);

    const json = await response.json();
    res.status(200).json(json);
});

/** Gets a single plant with id */
app.get("/api/plants/:plantId", async (req, res) => {

    const plantId = req.params.plantId;
    const response = await fetch(`https://trefle.io/api/v1/species/${plantId}?token=${process.env.TREFLE_API_KEY}`);

    const json = await response.json();
    res.status(200).json(json);
});

/** Searchs for plants by query string */
app.get("/api/plants/search/:query", async (req, res) => {

    const query = req.params.query;
    const response = await fetch(`https://trefle.io/api/v1/plants/search?q=${query}&token=${process.env.TREFLE_API_KEY}`);

    const json = await response.json();
    res.status(200).json(json);
})

//#endregion Plants

app.listen(app.get("port"), () => {
    console.log(`Server listening at port ${app.get("port")}`);
});
