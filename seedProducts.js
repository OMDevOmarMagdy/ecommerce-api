const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home',
  'Sports',
];

const brands = [
  'Apple',
  'Samsung',
  'Nike',
  'Adidas',
  'Sony',
  'Dell',
];

const seedProducts = async () => {
  try {
    const { faker } = await import('@faker-js/faker');
    await Product.deleteMany();

    const products = [];

    for (let i = 0; i < 100; i++) {
      products.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ min: 50, max: 2000 })),
        category: faker.helpers.arrayElement(categories),
        brand: faker.helpers.arrayElement(brands),
        stock: faker.number.int({ min: 0, max: 100 }),
        image: faker.image.urlLoremFlickr({ category: 'product' }),
      });
    }

    await Product.insertMany(products);

    console.log('✅ Products Created Successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();