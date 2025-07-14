const express = require("express");

const dotenv = require("dotenv");
const app = require("./app");
const connenctDatabase = require("./config/databaseConnection");

// connection the database
connenctDatabase();

// listening on port 4000
const server = app.listen(process.env.PORT || 4000, process.env.APPLICATION_IP, () => {
  console.log(`Listening on port ${process.env.PORT}!!..`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
