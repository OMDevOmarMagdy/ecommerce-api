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


function calculateScore(product, p) {
  let score= 0;

  // if brand is same as product brand
  if(p.brand === product.brand){
    score += 5;
  }
  
  // difference in price 
  const priceDiff = Math.abs(p.price - product.price);
  score += Math.max(0, 5 - priceDiff/100); 

  // if tags are same as product tags
  const commonTags = p.tags.filter((tag) => product.tags.includes(tag));
  score += commonTags.length * 2;
  return { ...p, score };
}

const getRecommendations = async ( id ) =>{
  // get product 
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  // get products 
  const products = await Product.find(
    {
      category: product.category,
      _id: { $ne: product._id },
      price: {
        $lte: product.price * 1.5,
        $gte: product.price * 0.5,
      }
    }
  );
  // calculate the score
  const scoredProducts = products.map((p) => {
    const score = calculateScore(product, p);
    return { product: p, score };
  });

  // sort the products by socre in an descending order
  scoredProducts.sort((a, b) => b.score - a.score);
  
  // return the top 5 products
  return scoredProducts.slice(0, 5).map((p) => p.product);
}

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
  getRecommendations,
};
