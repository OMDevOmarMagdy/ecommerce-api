const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });
    }
    res.json({
      message: "Cart fetched successfully",
      numberOfProducts: cart.items.length,
      numberOfItems: cart.items.reduce((acc, item) => acc + item.quantity, 0),
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId).select('price');
    const price = product.price;
    // console.log("price: ", price);

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity, price }],
        totalPrice: quantity * price,
      });
      return res.status(201).json({
        message: "Product added to cart successfully",
        cart,
      });
    }

    // Find the index of the product in the cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    // If the product already exists in the cart, update the quantity
    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      productItem.quantity += quantity;
      cart.items[itemIndex] = productItem;
    } else {
      cart.items.push({ product: productId, quantity, price });
    }

    // Calculate the total price of the items in the cart
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    await cart.save();
    res.status(201).json({
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    // Filter out the product to be removed
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    
    // Calculate the total price of the items in the cart
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    await cart.save();
    res.json({
      message: "Product removed from cart successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};
