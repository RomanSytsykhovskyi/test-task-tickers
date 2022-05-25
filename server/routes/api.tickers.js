const express = require("express");
const router = express.Router();

//db
let tickers = require("../db/tickers.js");

router.get("/", async (req, res) => {
  res.send(tickers);
});

module.exports = router;
