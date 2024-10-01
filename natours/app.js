const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
// 1-middlewares
// morgan will gave us the http method,url,status code,time it took to send back the res,size of res in bytes
app.use(morgan('dev'));
// no coloring status code
app.use(morgan('tiny'));

// created a middleware to get the data from req in express(wew wont have req.body if we dont write the line below)
app.use(express.json());
// root url and get http method in the 2nd argument we discuss what we want to do
// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello from the server side!');
//   res
//     // .status(200)
//     .status(404)
//     .json({ message: 'Hello from the server side!', app: 'natours' });
// });
// // cant get any response on postman if the method is not the same as we defined the route
// app.post('/', (req, res) => {
//   // 200 status code is default if we do not specify the value for it
//   //  also by using json it will set content type to application json
//   res.send('you can post to this endpoint...');
// });

// 3rd argument is always the next parameters this is a global mw
app.use((req, res, next) => {
  // this mw applies to every req cuz we did not specified it
  console.log('Hello from the middle ware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2-route handlers
app.get('/api/v1/tours', (req, res) => {
  console.log(req.requestTime);
  res.status(200).send({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: tours,
  });
});

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  // while we are using console we need to send back the data to finish this req-res cycle
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 200 ok 201 created
      res.status(201).json({ status: 'success', data: newTour });
    }
  );
  //   we can't use res.send and res.json at the same time!
  //   res.send('done');
});

app.get('/api/v1/tours/:id', (req, res) => {
  // convert string to numbers
  const id = req.params.id * 1;
  //   if (id > tours.length) {
  //     return res.status(404).json({ status: 'failed', message: 'invalid id' });
  //   }
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'failed', message: 'invalid id' });
  }
  res.status(200).send({ status: 'success', data: { tour } });
});

// if we move this mw here it wont clg because it's in order of our code and applies to the next ones
app.use((req, res, next) => {
  console.log('Hello from the middle ware!');
  next();
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'failed', message: 'invalid id' });
  }
  res.status(200).json({ status: 'success', data: 'updated tour here' });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'failed', message: 'invalid id' });
  }
  res.status(204).json({ status: 'success', data: null });
});

// 4-start the server
const port = 3000;
// start a server
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
