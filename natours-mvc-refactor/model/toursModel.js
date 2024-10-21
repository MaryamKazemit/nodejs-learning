const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    // validating data of schema
    required: true,
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'a tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'a tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  // rating: Number,
  price: {
    type: Number,
    // add default value
    required: [true, 'a tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    // trim only works on string remove whitespace in beginning or in the end of the string
    trim: true,
    required: [true, 'a tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'a tour must have a cover image'],
  },
  images: [String],
  // automatically created time stamp
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
