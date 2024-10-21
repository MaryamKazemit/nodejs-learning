const fs = require('fs');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../model/toursModel');

dotEnv.config({ path: './config.env' });

const db = process.env.DATABASE_LOCAL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connection successful!');
  });

// read json turned to object by parse
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);
// import data to db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
// delete all prev data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted!');
    // aggressive command to exit from the running process
    // process.exit();
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

console.log(process.argv);
//node .\dev-data\data\import-dev-data.js
// node .\dev-data\data\import-dev-data.js --import

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
