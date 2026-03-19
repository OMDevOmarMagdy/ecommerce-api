const Order = require('../models/Order');

const createOrder = async (orderData) => {
  const order = await Order.create(orderData);
  return order;
};

const getOrderById = async (id) => {
  const order = await Order.findById(id).populate('user', 'name email').populate('orderItems.product');
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId });
  return orders;
};

const getAllOrders = async () => {
  const orders = await Order.find({}).populate('user', 'id name');
  return orders;
};

const updateOrderToPaid = async (id, paymentResult) => {
  const order = await Order.findById(id);
  console.log("Payment Result: ", paymentResult);

  if (!order) {
    throw new Error('Order not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: paymentResult.id,
    status: paymentResult.status,
    update_time: paymentResult.update_time,
    email_address: paymentResult.email_address,
  };

  const updatedOrder = await order.save();
  return updatedOrder;
};

const updateOrderToDelivered = async (id) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error('Order not found');
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  return updatedOrder;
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
};
