const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchesSchema = new mongoose.Schema({

 item1Id: {
    type: String
 },

 item1Owner: {
    type: String
 },

 item2Id: {
    type: String
 },

 item2Owner: {
    type: String
 },

 item2Read: {
     type: Boolean,
     default: false
 }

});


const Matches = mongoose.model("Matches", matchesSchema);

module.exports = Matches;
