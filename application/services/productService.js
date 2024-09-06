// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const ProductRepository = require('../../domain/repositories/productRepository');

class ProductService {
    constructor() {
        this.ProductRepository = new ProductRepository();
    }

    async getProductById(id) {
        const product = await this.ProductRepository.getById(id);
        if (!product) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found'}));
        }
        return product;
    }

     async createProduct(data) {
         // Puedes agregar validaciones o lógica adicional aquí antes de guardar
         return await this.ProductRepository.saveProduct(data);
     }

    // async updateUser(id, data) {
    //     const updatedUser = await this.userRepository.updateById(id, data);
    //     if (!updatedUser) {
    //         throw new Error(JSON.stringify({status: 404, message: 'User not found or could not be updated'}));
    //     }
    //     return updatedUser;
    // }

    // async deleteUser(id) {
    //     const deletedUser = await this.userRepository.deleteById(id);
    //     if (!deletedUser) {
    //         throw new Error(JSON.stringify({status: 404, message: 'User not found or could not be deleted'}));
    //     }        
    //     return deletedUser;
    // }
    
    // async searchUsersByName(name) {
    //     return await this.userRepository.searchByName(name);
    // }
}

module.exports = ProductService;