const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getAllProductsTesting,
  addProduct
} = require('../controllers/products');


router.route('/').get(getAllProducts);
router.route('/testing').get(getAllProductsTesting);
router.route('/').get(getAllProducts).post(addProduct);

module.exports = router;