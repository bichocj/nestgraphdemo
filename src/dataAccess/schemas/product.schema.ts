import * as mongoose from 'mongoose';


export const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  cost: Number,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  }
});