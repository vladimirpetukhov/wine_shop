const mongoose = require('mongoose');
const { String, ObjectId, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  alcohol: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    // validate: {
    //   validator: (v) => v.startsWith('http'),
    //   message: 'imageUrl must be valid link',
    // },
  },
    creatorId: { type: ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Product', ProductSchema);
