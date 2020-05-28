const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth')


//GET
router.get('/', (req, res) => {
  res.send({ status: 'Much welcome to my nodePhotoApp!' });
});

router.use('/photos', require('./photos'));
router.use('/albums', require('./albums'));
router.use('/users', require('./users'));
router.use('/profile', [auth.basic], require('./profile'));


module.exports = router;