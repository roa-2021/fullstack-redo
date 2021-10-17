const express = require("express");
const router = express.Router();

const db = require("../db/db");

router.get("/", (req, res) => {
  return db
    .getTickers()
    .then((tickers) => {
      return res.json(tickers);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send("500 error :(");
    });
});

router.post("/:ticker", (req, res) => {
  return db
    .insertTicker(req.params.ticker)
    .then((tickers) => {
      return res.json(tickers);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send("500 error :(");
    });
});

router.put("/:ticker", (req, res) => {
  if (!isNumeric(req.query.price)) {
    //If price is invalid, juts return list
    return db
      .getTickers()
      .then((tickers) => {
        return res.json(tickers);
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).send("500 error :(");
      });
  }
  return db
    .updateTicker(req.params.ticker, req.query.price)
    .then((tickers) => {
      return res.json(tickers);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send("500 error :(");
    });
});

router.delete("/:id", (req, res) => {
  return db
    .deleteTicker(req.params.id)
    .then((tickers) => {
      return res.send(tickers);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send("500 error :(");
    });
});

module.exports = router;

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
