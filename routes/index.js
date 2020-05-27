const express = require('express');
const router = express.Router();

//GET
router.get('/', (req, res) => {
  res.send({ status: 'Much welcome to my nodePhotoApp!' });
});

router.use('/photos', require('./photos'));
router.use('/albums', require('./albums'));


module.exports = router;