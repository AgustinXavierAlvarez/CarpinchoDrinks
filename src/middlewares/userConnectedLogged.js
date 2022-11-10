const db = require('../database/models')

function userConnectedLogged(req,res,next) { 
    let emailInCookie = req.cookies.userLogueado
    if(emailInCookie && emailInCookie!==undefined){
        db.User.findOne({
            where:{user_email:emailInCookie}
        })
        .then(function(usuario){
            if(req.session){
                req.session.userLogged=usuario     
            }
            else
            {
                return usuario
            } 
        })
    }
    if(req.session.userLogged){
        res.locals.isLogged = false
    } 
    else{
        res.locals.isLogged = true
     }
     next();
}

module.exports=userConnectedLogged;

//middleware que verifica si esta conectado el usuario, no muertre las opciones de iniciar sesion ni register