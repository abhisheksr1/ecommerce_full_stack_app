const express = require('express');
const router = express.Router();
const userController = require('../controllers/admin/user');
const categoryController = require('../controllers/admin/categories');
const orderController = require('../controllers/admin/order');
const productController = require('../controllers/admin/product');

//USERS
router.get('/users/count', userController.getUserCount);
router.delete('/users/:id', userController.deleteUser);

//CATEGORIES
router.post('/categories', categoryController.addCategory);
router.put('/categories/:id', categoryController.editCategory);
router.delete('/categories/:id', categoryController.deleteCategory)

//PRODUCTS
router.get('/products/count', productController.getProductsCount);
router.get('/products', productController.getProducts);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.editProduct);
router.delete('/products/:id/images', productController.deleteProductImages);
router.delete('/products/:id', productController.deleteProduct);

//ORDERS
router.get('/orders', orderController.getOrders);
router.get('/orders/count', orderController.getOrdersCount);
router.put('/orders/:id', orderController.changeOrderStatus);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;