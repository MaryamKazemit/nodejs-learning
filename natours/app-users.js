const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).send({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: tours,
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'failed', message: 'invalid id' });
  }
  res.status(200).send({ status: 'success', data: { tour } });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: newTour });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'failed', message: 'invalid id' });
  }
  res.status(200).json({ status: 'success', data: 'updated tour here' });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'failed', message: 'invalid id' });
  }
  res.status(204).json({ status: 'success', data: null });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

// create a new router and use it as a middle ware to connect with our app so we said app.route in the upper line
// here we created a sub-app for each resources
const tourRouter = express.Router();
const userRouter = express.Router();

// we used tourRouter so we are already in /api/v1/tours and no need to write that again
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// this is called mounting a new router on a route we cant use it before we declare them(tourRouter,userRouter)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
