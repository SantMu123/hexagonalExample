// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const ProductService = require('../services/productService');

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async getProduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async InsertProduct(req, res) {
        try {
            // Asume que has configurado la validación en algún lugar
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            // Asume que this.productService.createProduct maneja la lógica de inserción
            const productInsert = await this.productService.createProduct(req.body);
    
            // Envía una respuesta exitosa
            res.status(201).json(productInsert); // Usualmente, se usa 201 para recursos creados
        } catch (error) {
            // Maneja el error y asegura que el objeto de error tenga el formato esperado
            let statusCode = 500; // Código de estado predeterminado
            let message = 'Internal Server Error';
    
            try {
                const errorObj = JSON.parse(error.message);
                statusCode = errorObj.status || statusCode;
                message = errorObj.message || message;
            } catch (parseError) {
                // Si no se puede analizar el error, usa los valores predeterminados
                console.error('Error parsing error message:', parseError);
            }
    
            res.status(statusCode).json({ message });
        }
    }
    
}

module.exports = ProductController;