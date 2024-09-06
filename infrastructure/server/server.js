// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const routerUsers = require('../../application/routes/userRoutes');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const routerProducts = require('../../application/routes/productRoutes');

const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);
    
    app.use('/users',  routerUsers);
    app.use("/productos", routerProducts)

    return app;
};

module.exports = createServer;