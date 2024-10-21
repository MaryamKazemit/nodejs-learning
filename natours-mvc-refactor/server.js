/* eslint-disable no-undef */
/* eslint-disable-next-line no-console */

const dotEnv = require('dotenv');
const mongoose = require('mongoose');

dotEnv.config({ path: './config.env' });

const app = require('./app');

const db = process.env.DATABASE_LOCAL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log('connect to db');
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
