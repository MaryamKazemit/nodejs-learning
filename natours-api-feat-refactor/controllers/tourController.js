/* eslint-disable no-undef */
const Tour = require('../model/toursModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = async (req, res, next) => {
  console.log('here in alias');
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      // stage
      {
        // name of stage
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // what we want to group by
          // _id: null,
          _id: { $toUpper: '$difficulty' },
          // _id: '$ratingsAverage',
          numTours: { $sum: 1 },
          numRating: { $sum: '$ratingsQuantity' },
          // name of the field inside the '$ratingsAverage'
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        // we need to specify the filter that we used up in the group no longer old names exist here the group items are our doc that we can use
        $sort: { avgPrice: 1 },
      },
      // we can do match multiple time in different stages
      {
        $match: { _id: { $ne: 'EASY' } },
      },
    ]);
    res.status(200).json({ status: 'success', data: { stats } });
  } catch (error) {
    res.status(404).json({ status: 'failed', msg: error });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          // 0 hide 1 show for the item you don't want to show up
          _id: 0,
        },
      },
      {
        // -1=desc 1=asc
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({ status: 'success', data: { plan } });
  } catch (error) {
    res.status(404).json({ status: 'failed', msg: error });
  }
};
