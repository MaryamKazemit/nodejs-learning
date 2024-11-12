const mongoose = require('mongoose');

// in schema we can pass object with the schema definition and object for the options
const tourSchema = mongoose.Schema(
  {
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
      // user wont see this
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// virtual properties
// name of the property goes inside ()
// we used this regular function instead of arrow because the arrow function will not get its own (this) keyword but here we need to point to the current document
// we can not query on this because it's not saved in db but we can do this every time after we get the query in controller but it's not the best practice because we want to separate business logic and app logic(fat model thin controller)
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
