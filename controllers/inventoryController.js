const Item = require("../models/item");
// const catchAsyncError = require("../middlewares/catchAsyncError");

// Get inventory page
exports.getInventory = async (req, res, next) => {
  const allDetails = await Item.find({});
  res.render("inventory", { details: allDetails });
};

// Add new item
exports.addItem = async (req, res, next) => {
  const { i1: item_name, i2: description, i3: unit_price, i4: quantity } = req.body;

  const item = new Item({
    item_name,
    item_code: (await Item.countDocuments()) + 1,
    quantity,
    unit_price,
    description,
  });

  await item.save();
  const allDetails = await Item.find({});
  res.render("inventory", { details: allDetails });
};

// Update item
exports.updateItem = async (req, res, next) => {
  const { i1: item_code, i3: unit_price, i4: quantity } = req.body;

  await Item.findOneAndUpdate({ item_code: parseInt(item_code) }, { unit_price, quantity });

  const allDetails = await Item.find({});
  res.render("inventory", { details: allDetails });
};
