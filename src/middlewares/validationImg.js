const { check }= require('express-validator');
const path= require('path')

const validationReg  = [
    check('user_img').custom(function(value,{req}){
        let file = req.file;
        const acceptedFiles = ['.jpeg', '.jpg', '.png'];
        if(!file){
            throw new Error('Es necesario subir una imagen de perfil')
        }
        else{
            const fileExtension = path.extname(file.originalname)
            if(!acceptedFiles.includes(fileExtension)){
                throw new Error('El formato de la imagen no esta permitido')
            }
        }
        return true
    }).bail()
]

module.exports=validationReg;