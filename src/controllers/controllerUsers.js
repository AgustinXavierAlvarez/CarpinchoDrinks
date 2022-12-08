const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const { validationResult } = require('express-validator')

// const userData = path.join(__dirname, '../database/users.json')

// const userBase = JSON.parse(fs.readFileSync(userData, 'utf-8'))

// const productoData = path.join(__dirname, '../database/productsData.json')

// const productoBase = JSON.parse(fs.readFileSync(productoData, 'utf-8'))

const db = require('../database/models');

const sequelize = db.sequelize;

const { Op } = require('sequelize');


const controller = {
    register: (req, res) => {

        res.render('register', {
            titulo: "Register",
            registerError: "",
            enlace: '/css/register.css'
        });
    },

    store: function (req, res) {
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
            res.render('register', {
                titulo: "Register",
                enlace: "/css/register.css",
                errors: errors.mapped(),
                old: req.body
            });
        }
        else {
            db.User.findOne({
                where: {
                    user_email: req.body.user_email
                }
            })
                .then(function (usuario) {
                    if (!usuario) {
                        console.log('llegue aca por then ');
                        db.User.create({
                            user_name: req.body.user_name,
                            user_email: req.body.user_email,
                            user_password: bcrypt.hashSync(req.body.user_password, 10),
                            user_img: req.file.filename,
                            user_cat: 1
                        })
                            .then(function () {
                                res.redirect('/')
                            })
                            .catch(function (e) {
                                console.log('llegue aca');
                                res.render('error', { titulo: '404', enlace: 'css/error.css' })
                            })
                    }
                    else {
                        console.log('hola llegue por el else');
                        res.render('register', {
                            titulo: "Register",
                            enlace: "/css/register.css",
                            errors: errors.mapped(),
                            errors: {
                                user_email: { msg: 'El email ' + usuario.user_email + ' ya se encuentra registrado' }
                            },
                            old: req.body
                        });
                    }
                })

        }
    },
    login: (req, res) => {
        console.log(req.cookies);
        if (req.cookies.userLogueado) {
            res.render('login', {
                titulo: 'login',
                loginError: '',
                enlace: '/css/login.css',
                user_email: req.cookies.userLogueado
            });
        }
        else {
            res.render('login', {
                titulo: 'login',
                loginError: '',
                enlace: '/css/login.css',
            });
        }

    },
    loginSucces: (req, res) => {
        console.log(req.body);
        console.log(validationResult(req));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('login', {
                titulo: "login",
                enlace: "/css/login.css",
                errors: errors.mapped(),
                old: req.body
            });
        }
        else {
            db.User.findOne({
                where: {
                    user_email: req.body.user_email
                }
            })
                .then(function (usuario) {
                    if (usuario) {
                        let check = bcrypt.compareSync(req.body.user_password, usuario.user_password)
                        if (check) {
                            if (req.body.rememberUser) {
                                res.cookie('userLogueado', usuario.user_email, { maxAge: 1000 * 60 })
                            }
                            req.session.userLogged = usuario
                            res.redirect("/user/profile")
                        }
                        else {
                            res.render('login', {
                                titulo: "login",
                                enlace: "/css/login.css",
                                errors: {
                                    user_password: { msg: 'La contraseña ingresada es incorrecta' }
                                },
                                old: req.body
                            });
                        }
                    }
                    else {
                        res.render('login', {
                            titulo: "login",
                            enlace: "/css/login.css",
                            errors: {
                                user_email: { msg: 'El email ingresado no se encuentra registrado' }
                            },
                            old: req.body
                        });
                    }
                })
                .catch(function (e) {
                    console.log('llegue aca');
                    res.render('error', {
                        titulo: '404',
                        enlace: 'css/error.css'
                    })
                })
        }
    },
    profile: (req, res) => {
        if (req.session.userLogged) {
            const usuario = req.session.userLogged
            db.User.findOne({
                where: { id: usuario.id }
            })
                .then(function (user) {
                    res.render('profile', {
                        titulo: 'Profile',
                        enlace: '/css/profile.css',
                        user
                    })
                })
        }
        else {
            res.render('profile', {
                titulo: 'Profile',
                enlace: '/css/profile.css',
            })
        }
    },
    edit: (req, res) => {
        const usuario = req.session.userLogged
        let paramsId= req.params.id
        console.log(usuario);
        if (usuario) {
            let userEdit = db.User.findOne({
                where: { id: paramsId}
            })
            let userOn= db.User.findOne({
                where: { id: usuario.id}
            })
            Promise.all([userOn,userEdit])
            .then(function ([user,usuario]) {
                    res.render('edit-user', {
                        titulo: 'Edicion de usuario',
                        enlace: '/css/editUser.css',
                        user,
                        usuario
                    })
                })
        }
    },
    editSucces: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            db.User.findOne({
                where: { id: usuario.id }
            })
                .then(function (user) {
                    res.render('edit-user', {
                        titulo: 'Edicion de usuario',
                        enlace: '/css/editUser.css',
                        errors: errors.mapped(),
                        old: req.body,
                        user
                    });
                })
        }
        else {
            db.User.update(
                {
                    user_name: req.body.user_name,
                    user_email: req.body.user_email
                },
                {
                    where: { id: req.params.id }
                })
                .then(function () {
                    res.redirect('/user/profile')
                })
        }
    },

    editImg:(req,res)=>{
        const usuario = req.session.userLogged
        let paramsId= req.params.id
        console.log(usuario);
        if (usuario) {
            let userEdit = db.User.findOne({
                where: { id: paramsId}
            })
            let userOn= db.User.findOne({
                where: { id: usuario.id}
            })
            Promise.all([userOn,userEdit])
            .then(function ([user,usuario]) {
                    res.render('imgEdit', {
                        titulo: 'Cambio de foto',
                        enlace: '/css/editUser.css',
                        user,
                        usuario
                    })
                })
        }
    },

    imgEditSucces: (req, res) => {
        let usuario=req.params
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            db.User.findOne({
                where: { id: usuario.id }
            })
                .then(function (user) {
                    res.render('edit-user', {
                        titulo: 'Edicion de usuario',
                        enlace: '/css/editUser.css',
                        errors: errors.mapped(),
                        old: req.body,
                        user
                    });
                })
        }
        else {
            db.User.update(
                {
                    user_img: req.file.filename
                },
                {
                    where: { id: req.params.id }
                })
                .then(function () {
                    res.redirect('/user/profile')
                })
        }
    },


    changePassword:(req,res)=>{
        const usuario = req.session.userLogged
        let paramsId= req.params.id
        console.log(usuario);
        if (usuario) {
            let userEdit = db.User.findOne({
                where: { id: paramsId}
            })
            let userOn= db.User.findOne({
                where: { id: usuario.id}
            })
            Promise.all([userOn,userEdit])
            .then(function ([user,usuario]) {
                    res.render('changePassword', {
                        titulo: 'Cambio de contraseña',
                        enlace: '/css/editUser.css',
                        user,
                        usuario
                    })
                })
        }

    },
    changePasswordSucces: (req, res) => {
        let paramsId= req.params.id
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            db.User.findOne({
                where: { id: paramsId }
            })
                .then(function (user) {
                    res.render('changePassword', {
                        titulo: 'Cambio de Contraseña',
                        enlace: '/css/editUser.css',
                        errors: errors.mapped(),
                        old: req.body,
                        user
                    });
                })
        }
        else {
            console.log(req.body.user_password);
            db.User.findOne({
                where:{
                    id:paramsId
                }
            })
            .then(function(usuario){
                let user=usuario
                console.log(req.body);
                let check = bcrypt.compareSync(req.body.user_password,usuario.user_password)
                if(check){
                    if(req.body.new_password==req.body.verf_password){
                        db.User.update(
                            {
                                user_password: bcrypt.hashSync(req.body.new_password, 10)
                            },
                            {
                                where: { id: paramsId }
                            })
                            .then(function () {
                                res.redirect('/user/profile')
                            })
                    }
                    else{
                        res.render('changePassword', {
                            titulo: 'Cambio de Contraseña',
                            enlace: '/css/editUser.css',
                            errors: {
                                new_password:{ msg:'Las contraseñas no coinsiden' }
                            },
                            old: req.body, 
                            usuario,   
                            user
                        });
                    }
                }
                else{
                    res.render('changePassword', {
                        titulo: 'Cambio de Contraseña',
                        enlace: '/css/editUser.css',
                        errors: {
                            user_password:{msg:'La contraseña no coinside con la actual'}
                        },
                        old: req.body,   
                        usuario,
                        user 
                    });
                }
            })
        }
    },

    
    logout: (req, res) => {
        res.clearCookie('userLogueado')
        req.session.destroy();
        return res.redirect('/')
    },
    usersList: (req, res) => {
        const usuario = req.session.userLogged
        if (usuario) {
            db.User.findOne({
                where: { id: usuario.id }
            })
                .then(function (userOn) {
                    const user = userOn
                    db.User.findAll()
                        .then(function (usuarios) {
                            res.render('usersList', {
                                titulo: 'Lista de usuarios registrados',
                                enlace: '/css/usersList.css',
                                usuarios,
                                user:userOn
                            })
                        })
                })
        } else {
            res.render('profile', {
                titulo: 'Profile',
                enlace: '/css/profile.css',
            })
        }
    },

    statusDelete:(req,res)=>{
        let paramsId = req.params.id
        db.User.findOne({
            where:{id:paramsId}
        })
        .then(function(user) {
            if(user.user_status==1){
                db.User.update(
                    {
                        user_status: 0
                    },
                    {
                        where: { id: paramsId }
                    })
                    .then(function () {
                        res.redirect('/user/profile')
                    })
            }
            else{
                db.User.update(
                    {
                        user_status: 1
                    },
                    {
                        where: { id: paramsId }
                    })
                    .then(function () {
                        res.redirect('/user/profile')
                    })
            }
        })
    },

    destroy: (req, res) => {
        db.User.destroy({
            where: { id:req.params.id }
        })
        .then(function(){
            res.redirect('/')
        })
    },

}

module.exports = controller;

