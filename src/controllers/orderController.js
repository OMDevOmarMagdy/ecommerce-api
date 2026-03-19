const orderService = require('../services/orderService');
const Cart = require('../models/Cart');

const createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }
    const {
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
    } = req.body;

    if (cart.items.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      // Calculate the total price after adding shipping price and tax price
      const totalPrice = cart.totalPrice + shippingPrice + taxPrice;
      const orderData = {
        orderItems: cart.items,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.totalPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const createdOrder = await orderService.createOrder(orderData);
      // Delete the cart after the order is created
      await Cart.deleteOne({ user: req.user._id });
      
      res.status(201).json({
        message: "Order created successfully",
        order: createdOrder,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.user._id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const updateOrderToPaid = async (req, res, next) => {
  try {
    const updatedOrder = await orderService.updateOrderToPaid(
      req.params.id,
      req.body
    );
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const updateOrderToDelivered = async (req, res, next) => {
  try {
    const updatedOrder = await orderService.updateOrderToDelivered(req.params.id);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
};
