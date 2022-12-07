const { check }= require('express-validator');
const path= require('path')


const validationReg  = [
    check('user_name').notEmpty().withMessage('Debes escribir un nombre y apellido completo').bail()
    .isLength({min:2}).withMessage('Este campo no admite menos de 2 caracteres'),
    check('user_email').notEmpty().withMessage('Debes completar con tu email').bail()
    .isEmail().withMessage('Debes ingresar un formato válido de email').bail()
]



module.exports =validationReg;