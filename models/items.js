const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new mongoose.Schema({

  itemName: {
    type: String,
  },
 
  itemDescription: {
    type: String,
  },

  itemPrice: {
      type: Number,
  },

  imageURL: {
      type: String
  },

  itemOwner: {
      type: Number
  }

});

const Items = mongoose.model("Items", itemsSchema);

module.exports = Items;
