const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const requestsRouter = require("../requests/requests-router.js");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger);

server.use("/api/request", requestsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>ChaseMe DB<h2>`);
});

function logger(req, res, next) {
  console.log(
    `A ${req.method} request was made to ${req.url}, it returned a status code of ${res.statusCode}`
  );
  next();
}
module.exports = server;
