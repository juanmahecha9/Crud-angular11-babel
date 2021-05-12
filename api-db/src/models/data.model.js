const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Data = Schema(
  {
    status: {
      type: Boolean,
      default: false,
    },
    Name: {
      type: String,
      default: "",
    },
    LastName: {
      type: String,
      default: "",
    },
    IdType: {
      type: String,
      default: "",
    },
    IdNumber: {
      type: String,
    },
    Country: {
      type: String,
      default: "",
    },
    City: {
      type: String,
      default: "",
    },
    Adress: {
      type: String,
      default: "",
    },
    Telephone: {
      type: String,
      default: "",
    },
    Email: {
      type: String,
      default: "",
    },
    FilePath: String,
    FileName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("data", Data);
