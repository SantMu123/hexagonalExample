// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const ProductController = require('../controllers/productController');

const routerProducts = express.Router();

const productController = new ProductController();



routerProducts.get('/:id',(req, res) => productController.getProduct(req, res));
routerProducts.post('/',(req, res) => productController.InsertProduct(req, res));
// router.put('/:id',(req, res) => productController.updateUser(req, res));
// router.delete('/:id',(req, res) => productController.deleteUser(req, res));
// router.get('/search',(req, res) => productController.searchUsers(req, res));

module.exports = routerProducts;