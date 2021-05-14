import axios from "axios";

export default {
  // Gets all books
//   getBooks: function() {
//     return axios.get("/api/users");
//   },
//   // Gets the book with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/users/" + id);
//   },
  // Saves a book to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },

  saveItem: function(itemData) {
    return axios.post("/api/items", itemData)
  },

  getUserItems: function(userID) {
    return axios.get("/api/items/user/" + userID)
  },

  getAllItems: function() {
    return axios.get("/api/items/")
  },

  updateUser: function(userId, userData) {
    return axios.put("/api/users/" + userId, userData)
  },

  updateItem: function(itemId, itemData) {
    return axios.put("/api/items/" + itemId, itemData)
  },

  getItem: function(itemId) {
    return axios.put("/api/items/" + itemId)
  },

  getAllMatches: function() {
    return axios.get("/api/matches/")
  },

  postMatch: function(matchInfo) {
    return axios.post("/api/matches", matchInfo)
  }
};
