const path = require('path')
const express = require('express')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

const tickerRoutes = require("./routes/tickers");
server.use("/api/tickers", tickerRoutes);

module.exports = server
