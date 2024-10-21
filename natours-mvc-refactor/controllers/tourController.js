const Tour = require('./../model/toursModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).send({
      status: 'success',
      results: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(400).json({ status: 'failed', msg: err });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // const tour = await Tour.findOne({ _id: req.params.id });
    res.status(200).send({ status: 'success', data: tour });
  } catch (error) {
    res.status(404).json({ status: 'failed', msg: error });
  }
};

exports.createTour = async (req, res) => {
  try {
    // call the method on a new document tour created from model then we use this save method on that document that is a method accessed
    // const newTour = new Tour({});
    // newTour.save()

    // call the method directly on tour
    // instead of Tour.create({}).then(); we have added await and async to our code
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: 'success', data: newTour });
  } catch (err) {
    // res.status(400).json({ status: 'failed', msg: err });
    res.status(400).json({ status: 'failed', msg: 'invalid data sent!' });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      // this will help us to return the new updated document to the client
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', tour });
  } catch (error) {
    res.status(404).json({ status: 'failed', msg: error });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    // in rest api do not send back any data to client when there is a delete operation
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(404).json({ status: 'failed', msg: error });
  }
};
