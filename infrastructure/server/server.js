// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const routerUsers = require('../../application/routes/userRoutes');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const routerProducts = require('../../application/routes/productRoutes');
const { auth } = require('../../application/middlewares/authenticateToken.js');
const sessionAuth = require('../../middlewares/sessionLogin.js');

const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);
    
    app.use('/users',  routerUsers);
    app.use("/productos", sessionAuth, auth, routerProducts)

    return app;
};

module.exports = createServer;