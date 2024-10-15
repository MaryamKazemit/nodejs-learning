/* eslint-disable no-undef */
/* eslint-disable-next-line no-console */

const dotEnv = require('dotenv');

const mongoose = require('mongoose');

dotEnv.config({ path: './config.env' });

const app = require('./app');

// console.log(app.get('env'));
// all environment variable are set at the moment the process started
// console.log(process.env);

const db = process.env.DATABASE_LOCAL;
console.log(db);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('connect to db');
  });

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    // validating data of schema
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  // rating: Number,
  price: {
    type: Number,
    // add default value
    required: [true, 'a tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

// create a new object out of the class(es6)
// const testTour = new Tour({
//   name: 'the forest hiker',
//   rating: 4.7,
//   price: 497,
// });

// const testTour = new Tour({
//   name: 'the park camper',
// });

const testTour = new Tour({
  name: 'the park camper',
  price: 997,
});

// save doc instance in db
// testTour.save();
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('error', err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
