const Bill = require("../models/bill");
const Item = require("../models/item");
const Sales = require("../models/sales");
// const catchAsyncError = require("../middlewares/catchAsyncError");

// Get bill page
exports.getBill = async (req, res, next) => {
  const items = await Item.find({});
  res.render("bill", { items });
};

// Create new bill
exports.createBill = async (req, res, next) => {
  const bill = req.body;
  const date = new Date();
  bill.date = date;

  const billItems = [];

  for (let i = 0; i < bill.code.length; i++) {
    const item = await Item.findOne({ item_code: bill.code[i] });

    if (!item) {
      req.flash("error", `Item with code ${bill.code[i]} not found`);
      return res.redirect("/bill");
    }

    if (item.quantity < bill.qty[i]) {
      req.flash("error", `Insufficient quantity for ${item.item_name}`);
      return res.redirect("/bill");
    }

    // Update inventory
    await Item.findOneAndUpdate({ item_code: bill.code[i] }, { quantity: item.quantity - bill.qty[i] });

    billItems.push({
      item_code: bill.code[i],
      name: item.item_name,
      quantity: bill.qty[i],
      unit_price: bill.price[i],
    });

    // Record sale
    const sale = new Sales({
      item_code: bill.code[i],
      item_name: item.item_name,
      unit_price: bill.price[i],
      quantity: bill.qty[i],
      date: date,
    });
    await sale.save();
  }

  const newBill = new Bill({
    items: billItems,
    total_cost: bill.sub_total,
    date: bill.date,
  });
  await newBill.save();

  bill.id = await Bill.countDocuments();
  bill.bill_items = billItems;

  res.render("print_bill", { bill });
};

// Print bill
exports.printBill = (req, res) => {
  res.render("print_bill");
};
