const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var buyOrderSchema = new mongoose.Schema(
  {
    maxPrice: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dataId: {
      type: Schema.Types.ObjectId,
      ref: "Data",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const BuyOrder = mongoose.model("BuyOrder", buyOrderSchema);

module.exports = BuyOrder;
