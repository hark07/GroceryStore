import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Route for adding a product with image upload
productRouter.post('/add', adminAuth, upload.fields([{ name: 'image', maxCount: 1 }]), addProduct);

// Route for listing all products
productRouter.get('/list', listProduct);

// Route for fetching a single product by ID
productRouter.get('/single', singleProduct);

// Route for updating a product by ID
productRouter.put('/update/:id', adminAuth, upload.fields([{ name: 'image', maxCount: 1 }]), updateProduct);

// Route for removing a product by ID
productRouter.delete('/remove', adminAuth, removeProduct);

export default productRouter;
