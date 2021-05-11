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

  // image: {
  //     type: Buffer,
  //     contentType: String
  // },

  owner: {
      type: String
  }


});

const Items = mongoose.model("Items", itemsSchema);

module.exports = Items;
