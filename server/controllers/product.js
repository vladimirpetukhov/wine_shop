const { ProductModel, UserModel } = require('../models');
const fs = require('fs');
const path = require('path');

module.exports = {
  getProducts: (req, res, next) => {
    const { id } = req.params;
    ProductModel.find({})
      .then((products) => {
        res.json(products);
      })
      .catch(next);
  },
  getSingleProduct: (req, res, next) => {
    const { id } = req.params;
    ProductModel.find({ _id: id })
      .then((products) => {
        res.status(200).json(products);
      })
      .catch(next);
  },
  getUserProduct: (req, res, next) => {
    const { _id: userId } = req.user;
    ProductModel.find({ creatorId: userId })
      .then((products) => {
        res.status(200).json(products);
      })
      .catch(next);
  },
  postProduct: (req, res, next) => {
    const newProduct = req.body;
    const { _id: userId } = req.user;

    const { year, size, price, description, name, type, quantity } = req.body;
    if (isNaN(year) || isNaN(size) || isNaN(price)) {
      res
        .status(400)
        .send({ msg: "field 'year','quantity', 'size', 'price' must be numbers " });
        return;
    }
    if (!description || !name || !price || !year || !size || !type || !quantity) {
      res
        .status(400)
        .send({ msg: "All field should be filled" });
        return;
    }
    ProductModel.create({ ...newProduct, creatorId: userId })
      .then((product) => {
        Promise.all([
          UserModel.updateOne(
            { _id: userId },
            { $push: { products: product._id } }
          ),
          product,
        ]);
      })
      .then(() => {
        res.status(201).send({ msg: 'Successful create product' });
      })
      .catch(next);
  },
  putProduct: (req, res, next) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    ProductModel.updateOne({ _id: id }, { ...updatedProduct })
      .then((data) => {
        res.send({ msg: 'Successful updated product', data });
      })
      .catch(next);
  },
  delProduct: (req, res, next) => {
    const { id } = req.params;
    const { id: userId } = req.user;

    ProductModel.deleteOne({ _id: id })
      .then(() => {
        return UserModel.updateOne(
          { _id: userId },
          { $pull: { products: id } }
        ); // Check!!!
      })
      .then(() => {
        res
          .status(200)
          .send({ msg: `Successful updated product with id: ${id}` });
      })
      .catch(next);
  },
  postCheckoutProduct: (req, res, next) => {
    const { cart, client } = req.body;
    const data = JSON.stringify({client, cart})
      Promise.resolve(
        cart.map(product => {
          ProductModel.updateOne(
            {_id: product._id}, 
            {...product, quantity: product.quantity - product.productQuantityCart}
            )
      })).then(() => {
        res.status(200).send({msg: 'Product quantity is update'})
      }).catch(next)
  }
};
