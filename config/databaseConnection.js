const mongoose = require("mongoose");

const connenctDatabase = () => {
  mongoose.connect(process.env.DB_LOCAL_URI, {}).then((res) => {
    console.log(`MongoDB Database connected with host ${res.connection.host}`);
  });
};

module.exports = connenctDatabase;
