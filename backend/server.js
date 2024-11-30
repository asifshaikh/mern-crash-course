import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, message: products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'error in getting products' });
  }
});

app.post('/api/products', async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please fill in all fields' });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.json({ success: true, message: 'Product created successfully' });
  } catch (error) {
    console.log('Error in creating the product', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(400)
      .json({ success: true, message: 'Product deleted Successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'No matching Product Found' });
  }
});

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log('server is running on port 5000');
});
//
