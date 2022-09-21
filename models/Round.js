const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const roundSchema = new Schema({
  distance:
  {
    type: String,
  },
  puttsMade:
    {
      type: String,
    },
  firstIn: {
    type: Boolean,
  },
  lastIn: {
    type: Boolean,
  },
  allMade: {
    type: Boolean,
  },
  roundId:{
    type: String,
  }
});

module.exports = roundSchema;
