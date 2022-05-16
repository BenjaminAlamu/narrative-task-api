const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var dataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Device Location', 'Device Behavior', 'ID Mapping'],
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

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
