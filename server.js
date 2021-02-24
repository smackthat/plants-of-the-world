const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.set("port", process.env.PORT || 3001);

app.get("/api/plants/forRegion/:regionId", async (req, res) => {

    const regionId = req.params.regionId;
    const page = req.query.page || 1;
    const response = await fetch(`https://trefle.io/api/v1/distributions/${regionId}/plants?filter%5Bestablishment%5D=native&token=${process.env.TREFLE_API_KEY}&page=${page}`);
    
    let json = await response.json();
    res.status(200).json(json);
});

app.listen(app.get("port"), () => {
    console.log(`Server listening at port ${app.get("port")}`);
});
