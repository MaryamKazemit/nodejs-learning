/* eslint-disable no-undef */
const Tour = require('./../model/toursModel');

exports.aliasTopTours = async (req, res, next) => {
  console.log('here in alias');
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    console.log('im here');
    console.log(req.query);
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // const tours = await Tour.find(req.query);

    // create shallow copy(hard copy and destructure) of req.query object
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    // console.log(queryObj);
    // add $ for filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(queryStr);
    // all of Tour.find(queryObj) will return a query thats why we can chain methods like where,... await the query to get the data
    // const tours = await Tour.find(queryObj);
    // another way here we first build the query and then exe it
    // const query = Tour.find(queryObj);
    // const query = Tour.find(JSON.parse(queryStr));
    let query = Tour.find(JSON.parse(queryStr));
    // const tours = await query;
    // sort results by a passed query string
    if (req.query.sort) {
      // chain to the query so turned to let
      const sortBy = req.query.sort.split(',').join(' ');
      // console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      // projecting
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // pagination page=2&limit=10
    // convert str to number and add defaukt value of 1 by ||
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // throw err on not existing page
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      // throw error will auto and quickly move to catch block that we had
      if (skip >= numTours) throw new Error('This page does not exists');
    }
    query = query.skip(skip).limit(limit);

    // aliasing route to popular ones

    const tours = await query;
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
