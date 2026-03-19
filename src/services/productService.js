const Product = require('../models/Product');
const APIFeatures = require('../utils/apiFeatures');

// const getProducts = async (queryString) => {
//   // console.log("queryString: ", queryString);
//   const features = new APIFeatures(Product.find(), queryString)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   // console.log(features);

//   const products = await features.query;
//   const count = await Product.countDocuments();
//   return { products, count };
// };

const getProducts = async (queryString) => {

  const features = new APIFeatures(Product.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  const filteredCount = products.length;

  const totalCount = await Product.countDocuments();

  return { products, filteredCount, totalCount };
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const createProduct = async (productData) => {
  const product = await Product.findOne({ name: productData.name });
  if (product) {
    throw new Error('Product already exists');
  } else {
    const product = await Product.create(productData);
    return product;
  }
};

const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
