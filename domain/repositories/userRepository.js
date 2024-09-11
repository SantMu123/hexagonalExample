// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const User = require('../models/userModel');

class UserRepository {
    async getById(id) {
        try {
            const user = new User();
            return await user.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving user'}));
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

    async getNick(body) {
        try {
            const user = new User();
            let {nick} = body;
            let query =[
                { $match: { nick } }
            ];
            return await user.aggregate(query);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: "Error retrieving user2"}))
        }
    };

    async getPassword(password, user) {
        let {passwordHash:pass} = user
        delete user.password
        const isMatch = await bcrypt.compare(password, pass);
        if (!isMatch) throw new Error(JSON.stringify({status: 401, message: "No autorizado"}))
        return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: `${process.env.EXPRESS_EXPIRE}ms`})
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