const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesSchema = new Schema({
  item_code: {
    type: Number,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
  },
  //total
});

module.exports = mongoose.model("Sales", salesSchema);
