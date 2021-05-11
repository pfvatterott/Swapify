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

  createdAt: {
      type: Date,
      required: true,
      default: Date.now
  },

  image: {
      type:Buffer,
      required: true
  },

  imageType: {
    type: String,
    required: true
  }


});

const Items = mongoose.model("Items", itemsSchema);

module.exports = Items;
