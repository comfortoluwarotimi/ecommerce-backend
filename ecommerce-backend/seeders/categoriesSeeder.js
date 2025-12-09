const mongoose = require('mongoose');
const Category = require('../models/Category');
const dotenv = require('dotenv');
dotenv.config();

const categories = [
  { name: 'Electronics' },
  { name: 'Fashion' },
  { name: 'Home & Kitchen' },
  { name: 'Sports & Outdoors' },
  { name: 'Books' },
];

const seedCategories = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log('SeederRunning: Categories');
    }).catch((err) => {
      console.log(err);
    })


    // Delete all existing categories before seeding
    await Category.deleteMany();

    // Insert new categories
    await Category.insertMany(categories);
    console.log('Categories seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding categories:', error);
    mongoose.disconnect();
  }
};

seedCategories();
