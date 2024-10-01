const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
} = require('../controllers/tourController');

const router = express.Router();

// create a checkbody mw check if body contains the name and price property if not, send back 400(bad req) also add it to post handler
router.param('id', (req, res, next, val) => {
  console.log(`tour is id: ${val}`);
  next();
});

router.param('id', checkId);

router.route('/').get(getAllTours).post(checkBody);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
