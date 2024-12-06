import Product from '../models/product.model.js';
import mongoose from 'mongoose';
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'error in getting products' });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please fill in all fields' });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.json({ success: true, data: newProduct });
  } catch (error) {
    console.log('Error in creating the product', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid product id' });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(400)
      .json({ success: true, message: 'Product deleted Successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid product id' });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
