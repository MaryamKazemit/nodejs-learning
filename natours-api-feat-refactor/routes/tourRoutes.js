const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
} = require('../controllers/tourController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`tour is id: ${val}`);
  next();
});

router.route('/top-5-cheap').get(aliasTopTours, getAllTours); // this should be in higher order than get all and other items to run or else it will return error but why?
router.route('/tour-stats').get(getTourStats);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
