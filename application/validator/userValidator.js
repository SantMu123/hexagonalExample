const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class UserValidator {
    validateUserLogin = () => {
        return [
            body('nick').notEmpty().isString().withMessage('The Nickname is mandatory'),
            body('password').notEmpty().isLength({min: 8}).isString().withMessage('Ur password gotta be > 8'),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ]
    }

    validateUserData = () => {
        return [
            body('cedula').notEmpty().isNumeric().withMessage('The cedula is mandatory'),
            body('names').notEmpty().isString().withMessage('The name is mandatory'),
            body('surnames').isString().withMessage('send the last name'),
            body('nick').notEmpty().isString().withMessage('Send the nickname you will have in the system'),
            body('email').notEmpty().isEmail().withMessage('Send the email'),
            body('phone').isString().withMessage('Send the phone'),
            body("password").notEmpty().isString().custom(async (value, {req}) =>{
                if(value.length < 8) throw new Error('Invalid password');
                req.body.passwordHash = await bcrypt.hash(value, 10)
                return true
            }),
            body('role', 'The role was not sent').notEmpty().exists().custom((value) => {
                if (value && !['Usuario Estandar', 'Usuario VIP', 'Administrador'].includes(value)) {
                    throw new Error(`There are only three roles available 'Usuario Estandar', 'Usuario VIP', 'Administrador'`);
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateUserDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateUserId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    validateUserUpdateDataById = () => {
        return [   
            body('nombre').notEmpty().isNumeric().withMessage('El nombre es obligatorio'),
            body('precio').notEmpty().isNumeric().withMessage('El precio es obligatorio'),
            body('en_stock').notEmpty().isBoolean().withMessage('El Stock debe ser booleano'),
            body('categoria').notEmpty().isString().withMessage('La categoria es obligatoria'),
            body('descuento').isNumeric().withMessage('El descuento, no es obligatorio'),
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };
}

module.exports = UserValidator;
