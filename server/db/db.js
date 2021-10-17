const uuidv4 = require("uuid").v4;
const knex = require("knex");
const config = require("../../knexfile");
const env = process.env.NODE_ENV || "development";
const connection = knex(config[env]);

const getTickers = (db = connection) => {
  return db("tickers");
};

const insertTicker = (ticker, db = connection) => {
  return db("tickers").insert({
    id: uuidv4(),
    ticker: ticker
  }).then(ids => db("tickers"));
};

const updateTicker = (id, price, db = connection) => {
  return db("tickers").where({id}).update({price}).then(ids => db("tickers"));
};

const deleteTicker = (id, db = connection) => {
  return db("tickers").where({id: id}).del().then(() => db('tickers'));
};

module.exports = {
  getTickers,
  insertTicker,
  deleteTicker,
  updateTicker,
};