import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for adding a product
const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Extract images from the request
    const image = req.files?.image?.[0];
    const images = [image].filter((item) => item !== undefined);

    // Upload images to Cloudinary and get their URLs
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      image: imageUrl,
      date: Date.now(),
    };

    console.log(productData);

    // Save the product to the database
    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
      data: { name, description, price, image },
    });

    console.log(name, description, price);
    console.log(imageUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for delete product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // Validate required fields
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, description, price) are required.",
      });
    }

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    let imageUrls = product.image; // Keep the old images if no new ones are provided
    if (req.files && req.files.image) {
      const image = req.files.image[0];
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      imageUrls = [result.secure_url];
    }

    // Update the product
    product.name = name;
    product.description = description;
    product.price = price;
    product.image = imageUrls;

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
