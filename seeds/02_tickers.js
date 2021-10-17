const uuidv4 = require("uuid").v4;

exports.seed = (knex) => {
  return knex("tickers")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tickers").insert([
        { id: uuidv4(), ticker: "AAPL", price: 144.84 },
        { id: uuidv4(), ticker: "TSLA", price: 843.03 },
        { id: uuidv4(), ticker: "BRK.A", price: 427701.0 },
        { id: uuidv4(), ticker: "SQ", price: 249.00 },
      ]);
    });
};
