const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new mongoose.Schema({

  name: {
    type: String,
  },
 
  description: {
    type: String,
  },

  price: {
      type: Number,
  },

  productImage: {
    type: String,
    required: true
  },

  owner: {
      type: String
  }


});

const Items = mongoose.model("Items", itemsSchema);

module.exports = Items;
