const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const dotenv = require('dotenv');
dotenv.config();
const products = [
  {
    name: 'Samsung Galaxy S21',
    description: 'Latest Samsung Galaxy smartphone',
    price: 799.99,
    imageUrl: 'https://example.com/samsung-galaxy-s21.jpg',
    categoryName: 'Electronics',
  },
  {
    name: 'Nike Air Max',
    description: 'Comfortable and stylish sneakers',
    price: 129.99,
    imageUrl: 'https://example.com/nike-air-max.jpg',
    categoryName: 'Fashion',
  },
  {
    name: 'Blender 5000',
    description: 'Powerful kitchen blender for smoothies',
    price: 49.99,
    imageUrl: 'https://example.com/blender-5000.jpg',
    categoryName: 'Home & Kitchen',
  },
  {
    name: 'Basketball',
    description: 'Official NBA basketball',
    price: 29.99,
    imageUrl: 'https://example.com/basketball.jpg',
    categoryName: 'Sports & Outdoors',
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic novel by F. Scott Fitzgerald',
    price: 12.99,
    imageUrl: 'https://example.com/great-gatsby.jpg',
    categoryName: 'Books',
  },
];

const seedProducts = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log('SeederRunning: Products');
    }).catch((err) => {
      console.log(err);
    })

    // Delete all existing products before seeding
    await Product.deleteMany();

    // Loop through the products and insert them
    for (const product of products) {
      const category = await Category.findOne({ name: product.categoryName });
      if (!category) {
        console.log(`Category '${product.categoryName}' not found, skipping product.`);
        continue;
      }

      const newProduct = new Product({
        name: product.name,
        description: product.description,
        price: product.price,
        category: category._id,
        imageUrl: product.imageUrl,
      });

      await newProduct.save();
    }

    console.log('Products seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.disconnect();
  }
};

seedProducts();
