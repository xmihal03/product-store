import mongoose from 'mongoose'
import Product from '../models/product.model.js'

export const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({})
    res.status(200).json({ success: true, data: allProducts })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const createProduct = async (req, res) => {
  const product = req.body
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Product data is required' })
  }

  const newProduct = new Product(product)
  try {
    const createdProduct = await newProduct.save()
    res.status(201).json({ success: true, data: createdProduct })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.json({
      success: true,
      message: 'Product deleted',
      data: deletedProduct,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const newProduct = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid product id' })
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    })
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}
