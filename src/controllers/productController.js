const productService = require('../services/productService');
const { createProductValidation } = require('../validations/productValidation');

const getAllProducts = async (req, res, next) => {
  try {
    console.log("req.query: ", req.query);
    const { products, filteredCount, totalCount } = await productService.getProducts(req.query);
    res.json({ 
      message: "Products fetched successfully",
      filteredCount,
      totalCount,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { error } = createProductValidation(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    const productData = { ...req.body, user: req.user._id };
    const product = await productService.createProduct(productData);
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);  
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};


const getRecommendations = async (req, res, next) => {

  try {
    // get product 
    const recommendations = await productService.getRecommendations(req.params.id);

    // send response
    res.json({
      message: "Recommendations fetched successfully",
      recommendations,
    });
    
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRecommendations,
};
