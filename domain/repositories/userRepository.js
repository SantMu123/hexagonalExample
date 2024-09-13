const User = require('../models/userModel.cjs');

class UserRepository {
    async getById(id) {
        try {
            const user = new User();
            return await user.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving user'}));
        }
    }

    async getByNick(nick) {
        try {
            const user = new User();
            return await user.findByNick(nick);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving user'}));
        }
    }

    async getByEmail(email) {
        try {
            const user = new User();
            return await user.findByEmail(email);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving user'}));
        }
    }

    async getByDni(dni) {
        try {
            const user = new User();
            return await user.findByDni(dni);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving user'}));
        }
    }

    async getByNickOrEmailOrCedula(nick, email, cedula){
        try {
            const user = new User();
            return await user.findByNickOrEmailOrCedula(nick, email, cedula)
        } catch (error) {
            return {status: 500, message: error.message}
        }
    }


    async save(userData) {
        try {
            const user = new User();
            return await user.insert(userData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving user'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const user = new User();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await user.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating user'}));
        }
    }

    async deleteById(id) {
        try {
            const user = new User();
            return await user.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting user'}));
        }
    }

    async searchByName(name) {
        try {
            return await User.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for users');
        }
    }
}

module.exports = UserRepository;