const Sales = require("../models/sales");
const Item = require("../models/item");
// const catchAsyncError = require("../middlewares/catchAsyncError");

// Get statistics page
exports.getStats = async (req, res, next) => {
  const filter = 0;
  const salesData = await getSalesData();
  res.render("sales_stat", { ...salesData, filter });
};

// Filter statistics
exports.filterStats = async (req, res, next) => {
  const filter = req.body.filter;
  const salesData = await getSalesData();
  res.render("sales_stat", { ...salesData, filter });
};

// Helper function to get sales data
const getSalesData = async () => {
  const allsalesforpie = await Sales.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$item_name",
        total: { $sum: { $multiply: ["$quantity", "$unit_price"] } },
      },
    },
    { $addFields: { item_name: "$_id" } },
  ]);

  const allsales = await Sales.find({});
  const allDetails = await Item.find({});

  return { allsales, allDetails, allsalesforpie };
};
