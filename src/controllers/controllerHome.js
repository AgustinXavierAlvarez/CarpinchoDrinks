const path=require("path");
const fs= require('fs');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models')
const { Op } = require("sequelize");

// const productoData= path.join(__dirname, '../database/productsData.json')

// const productoBase= JSON.parse(fs.readFileSync(productoData, 'utf-8'))

const controller={
    home: (req, res)=>{
        const usuario=req.session.userLogged
        if(usuario){
            let cats= db.Category.findAll()
            let prods= db.Product.findAll()
            let userOn=db.User.findOne({
                where:{id:usuario.id}
            })
            Promise.all([prods,userOn,cats])
            .then(function([productos,user,categories]){
                
                res.render('index', {
                    titulo:'Carpincho Drinks',
                    enlace:'/css/index.css',
                    user,
                    categories,
                    productos
                });
            })
        }
        else{
            let cats= db.Category.findAll()
            
            let prods= db.Product.findAll()
            Promise.all([prods,cats])
            .then(function([productos,categories]){
                res.render('index', {
                    titulo:'Carpincho Drinks',
                    enlace:'/css/index.css',
                    productos,
                    categories
            })
        })
        }
    },
    search: (req, res) => {
        db.Product.findAll({
            where: {
                name: {[Op.like]: '%' + req.query.search + '%'}
            }
        }).then(response => {
            let search = req.query.search;
            res.render('result',{
                titulo:'Resultados de tu busqueda',
                enlace:'/css/result.css',
                toThousand,
                products:response,
                search,
            })
        })
    }
};

module.exports=controller;