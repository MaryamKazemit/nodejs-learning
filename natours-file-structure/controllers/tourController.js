const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(val)
  if (val * 1 > tours.length) {
    return res.status(404).json({ status: 'failed', message: 'invalid id' });
  }
  next();
};

exports.checkBody = (req, res) => {
  console.log(req.body);
  // next();
};

exports.getAllTours = (req, res) => {
  res.status(200).send({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: tours,
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).send({ status: 'success', data: { tour } });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({ status: 'success', data: 'updated tour here' });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};