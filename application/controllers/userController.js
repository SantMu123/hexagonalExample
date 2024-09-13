// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const UserService = require('../services/userService');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async getUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getUserbyNick(nick) {
        try {
            const user = await this.userService.getUserbyNick(nick);
            return user
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            return errorObj
        }
    }

    async createUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const  {password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;

            // //validar que el nuevo usuario no exista aun.
            const usuarioExiste = await this.userExiste(req.body)
            if (usuarioExiste) return res.status(usuarioExiste?.status).json({message:usuarioExiste?.message, fieldDuplicate: usuarioExiste?.field});
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async verifyUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
            const token = await this.userService.getUserByNickAndPassword(req.body);
            res.cookie(req.body.nick, token, {maxAge: process.env.EXPRESS_EXPIRE}).json(token)
            // res.status(201).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message)
            res.status(errorObj.status).json({message: errorObj.message})
        }
    }

    async updateUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.deleteUser(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            res.status(204).json(user);
            // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
            // res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
    async searchUsers(req, res) {
        try {
            const users = await this.userService.searchUsersByName(req.query.name);
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res){
        try {
            
            const {nick, password}= req.body;
            const userExiste = await this.getUserbyNick(nick)
                       
            if (userExiste?.status === 404) return res.status(404).json({message: "Usuario no encontrado"})
            
            const isMatch = await bcrypt.compare(password, userExiste?.password);
            if (!isMatch) return res.status(400).json({message: "Contraseña incorrecta"})
            
            const token = jwt.sign(
                {userName : userExiste?.nick},
                process.env.JWT_SECRET, 
                {expiresIn: process.env.VITE_EXPRESS_EXPIRE}
            );

            req.session.token = `Bearer ${token}`;
            res.status(200).json({menssage: 'login successful'})
            
        } catch (error) {

        }
    }
}

module.exports = UserController;



