const mongoose = require("mongoose");
const { randomABC } = require("../ran.js");
var today = new Date();
var day =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
const DOCSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      // required: true,
    },
    docs_URL: {
      type: String,
      required: true,
    },
    id_URL: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tag: {
      type: Array,
      required: true,
    },
    isPrivate: { type: Boolean, required: true },
    like: {
      type: Array,
    },
    view: {
      type: Number,
      default: 0,
    },
    creatorsName: {
      type: String,
      required: true,
    },
    creatorsId: {
      type: String,
      required: true,
    },
    creatorsPhoto: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: day,
    },
  },
  { timestamps: true }
);

const Docs = mongoose.model("docs", DOCSchema);
module.exports = Docs;


      