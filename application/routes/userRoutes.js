// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController');
const UserValidator = require('../validator/userValidator');
const ProductController = require('../controllers/productController');
const {auth} = require("../middlewares/authenticateToken")
const sessionAuth = require('../middlewares/sessionLogin.js');

const routerUsers = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();

//rutas de login
routerUsers.post('/login', sessionAuth, (req, res) => userController.login(req, res));
routerUsers.get('/verifyToken', sessionAuth, auth, (req, res) => res.status(200).json({menssage: 'token valido', token: true}))

routerUsers.get('/:id', sessionAuth, auth, userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
routerUsers.post('/', userValidator.validateUserData(), (req, res) => userController.createUser(req, res));
routerUsers.put('/:id', sessionAuth, auth, userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
routerUsers.delete('/:id', sessionAuth, auth, userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));
routerUsers.get('/search', sessionAuth, auth, (req, res) => userController.searchUsers(req, res));

// router.get('/:id',(req, res) => productController.getProduct(req, res));
// router.post('/',(req, res) => productController.createUser(req, res));
// router.put('/:id',(req, res) => productController.updateUser(req, res));
// router.delete('/:id',(req, res) => productController.deleteUser(req, res));
// router.get('/search',(req, res) => productController.searchUsers(req, res));

module.exports = routerUsers;
