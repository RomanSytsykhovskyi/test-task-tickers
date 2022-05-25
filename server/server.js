"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

//routes
const routes = require("./routes/api.tickers.js");

//functions
const randomValue = require("./functions/randomValue.js");

//db
let tickers = require("./db/tickers.js");

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket) {
  tickers.forEach(
    (ticker, id) =>
      (tickers[id] = {
        ...ticker,
        exchange: "NASDAQ",
        price: randomValue(100, 300, 2),
        change: randomValue(0, 200, 2),
        change_percent: randomValue(0, 1, 2),
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
      })
  );

  socket.emit("ticker", tickers);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  let timer = setInterval(() => {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on("change interval", (interval) => {
    socket.emit("ticker", tickers);

    clearInterval(timer);

    timer = setInterval(() => {
      getQuotes(socket);
    }, 20000);
  });

  socket.on("delete ticker", (name) => {
    let index = 0;
    tickers.forEach((ticker, id) => {
      if (ticker.ticker === name) {
        return;
      }
      tickers[index] = tickers[id];
      ++index;
    });

    tickers.pop();

    socket.emit("ticker", tickers);
  });

  socket.on("add a ticker", (name) => {
    tickers.push({ ticker: name });

    getQuotes(socket);
  });

  socket.on("disconnect", () => {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
