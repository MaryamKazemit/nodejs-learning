const dotEnv = require('dotenv');
dotEnv.config({ path: './config.env' });

const app = require('./app');

// console.log(app.get('env'));
// all environment variable are set at the moment the process started
console.log(process.env);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
