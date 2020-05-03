import * as mongoose from 'mongoose';
var uniqueValidator = require('mongoose-unique-validator');
import { messages } from './messages.es';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [4, messages['minlength']],
    maxlength: [20, messages['maxlength']],
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: [6, messages['minlength']],
    required: true,
    trim: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  isSuperuser: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  first_name: {
    type: String,
    minlength: [4, messages['minlength']],
    required: false,
    trim: true,
  },
  last_name: {
    type: String,
    minlength: [4, messages['minlength']],
    required: false,
    trim: true,
  },
});
UserSchema.plugin(uniqueValidator, { message: messages['unique'] });

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [6, messages['minlength']],
    maxlength: [20, messages['maxlength']],
    unique: true,
    required: true,
    trim: true,
  },
  isActive: Boolean,
  isPublished: Boolean,
});
CategorySchema.plugin(uniqueValidator, { message: messages['unique'] });

export const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [6, messages['minlength']],
    maxlength: [20, messages['maxlength']],
    required: true,
    trim: true,
  },
  description: {
    type: String,
    minlength: [6, messages['minlength']],
    maxlength: [100, messages['maxlength']],
    trim: true,
  },
  price: {
    type: Number,
    min: [0, messages['min']],
    max: [1000, messages['max']],
  },
  cost: {
    type: Number,
    min: [0, messages['min']],
    max: [1000, messages['max']],
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  extras: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      price: Number,
    },
  ],
  isActive: Boolean,
  isPublished: Boolean,
});

export const RestaurantUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rol: {
    type: String,
    default: "OTHER",
  },
});

export const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [6, messages['minlength']],
    maxlength: [20, messages['maxlength']],
    unique: true,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    minlength: [6, messages['minlength']],
    maxlength: [200, messages['maxlength']],
    required: true,
    trim: true,
  },
  users: {
    type: [RestaurantUserSchema],
    default: []
  },
  isActive: Boolean,
  isPublished: Boolean,
});
RestaurantSchema.plugin(uniqueValidator, { message: messages['unique'] });
