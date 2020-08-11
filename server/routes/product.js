const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const {
  postProduct,
  getProducts,
  putProduct,
  delProduct,
  getSingleProduct,
  getUserProduct,
  postCheckoutProduct
} = require('../controllers/product');

// @route GET api/products
// @desc get all products
router.get('/',auth(false), getProducts);

// @route POST api/products
// @desc create product
router.post('/',auth(), postProduct);

// @route GET api/products/my-products
// @desc get product by id
router.get('/my-products',auth(), getUserProduct);

// @route GET api/products
// @desc get product by id
router.get('/:id',auth(false), getSingleProduct);

// @route PUT api/products
// @desc update product
router.put('/:id',auth(), putProduct);

// @route DELETE api/products
// @desc delete product
router.delete('/:id',auth(), delProduct);

// @route POST api/checkout
// @desc update products in cart
router.post('/checkout',auth(false), postCheckoutProduct);

module.exports = router;
