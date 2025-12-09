const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

// Get cart
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if the cart already contains this product
    let cartItem = await Cart.findOne({ product: productId });

    if (cartItem) {
      // If the item exists, increase the quantity
      cartItem.quantity += quantity;
    } else {
      // If the item does not exist, create a new cart item
      cartItem = new Cart({
        product: productId,
        quantity,
      });
    }

    // Save the cart item
    await cartItem.save();
    res.status(200).json(cartItem); // Send the updated cart item back as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Remove item from cart
router.delete('/remove/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the cart item and remove it
    const result = await Cart.deleteOne({ product: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/get', async (req, res) => {
  try {
    const cart = await Cart.find().populate('product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
