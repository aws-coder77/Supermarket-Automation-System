const express = require("express");

const dotenv = require("dotenv");
const app = require("./app");
const connenctDatabase = require("./config/databaseConnection");

// connection the database
connenctDatabase();

// listening on port 4000
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!!..`);
});
