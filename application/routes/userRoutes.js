// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController');
const UserValidator = require('../validator/userValidator');
const ProductController = require('../controllers/productController');
const {auth} = require("../middlewares/authenticateToken")

const routerUsers = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();

const productController = new ProductController();

routerUsers.get('/:id', auth, userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
routerUsers.post('/', userValidator.validateUserData(), (req, res) => userController.createUser(req, res));
routerUsers.put('/:id', auth, userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
routerUsers.delete('/:id', auth, userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));
routerUsers.get('/search', auth, (req, res) => userController.searchUsers(req, res));

// router.get('/:id',(req, res) => productController.getProduct(req, res));
// router.post('/',(req, res) => productController.createUser(req, res));
// router.put('/:id',(req, res) => productController.updateUser(req, res));
// router.delete('/:id',(req, res) => productController.deleteUser(req, res));
// router.get('/search',(req, res) => productController.searchUsers(req, res));

module.exports = routerUsers;
