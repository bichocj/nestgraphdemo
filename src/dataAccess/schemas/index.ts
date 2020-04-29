import * as mongoose from 'mongoose';


export const CategorySchema = new mongoose.Schema({
  name: String
});

export const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  cost: Number,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  extras: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      price: Number
    }
  ]
});

export const RestaurantSchema = new mongoose.Schema({
  name: String,
  address: String
});