const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRecommendations,
} = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.route('/')
  .get(getAllProducts)
  .post(protect, authorizeRoles('admin'), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorizeRoles('admin'), updateProduct)
  .delete(protect, authorizeRoles('admin'), deleteProduct);

router.route('/:id/recommendations').get(getRecommendations);

module.exports = router;
