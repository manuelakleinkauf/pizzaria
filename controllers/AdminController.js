
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {Op} = require('sequelize')
const Pedido = require('../models/Pedido')
const mysql = require('./mysqlConnect')

module.exports = class AdminController{
    static async showAdmin(req,res){
        res.render('admin/homeAdmin')
    }

    static async homeAdmin(req,res){
        res.render('admin/homeAdmin')
    }

    static async showHomeAdmin(req,res){
        res.render('admin/homeAdmin')
    }

    static async menu(req,res){
        res.render('admin/menu')
    }

    static async dashboard(req,res){
       const comum = await mysql.query("SELECT COUNT(massa) AS comum FROM pedidos WHERE massa = 'comum' ;")
       const temperada = await mysql.query("SELECT COUNT(massa) AS temperada FROM pedidos WHERE massa = 'temperada';")
        const integral = await mysql.query("SELECT COUNT(massa) AS integral FROM pedidos WHERE massa = 'integral';")
       
        const resultComum= comum[0].comum
        const resultTemperada= temperada[0].temperada
        const resultIntegral= integral[0].integral
        


        const chocolate = await mysql.query("SELECT COUNT(borda) AS chocolate FROM pedidos WHERE borda = 'chocolate' ;")
        const cheddar = await mysql.query("SELECT COUNT(borda) AS cheddar FROM pedidos WHERE borda = 'cheddar' ;")
        const catupiry = await mysql.query("SELECT COUNT(borda) AS catupiry FROM pedidos WHERE borda = 'catupiry' ;")

        const resultChocolate= chocolate[0].chocolate
        const resultCheddar= cheddar[0].cheddar
        const resultCatupiry= catupiry[0].catupiry

        const queijos = await mysql.query("SELECT COUNT(sabores) AS queijos FROM pedidos WHERE sabores LIKE '%Quatro queijos%';")
        const portuguesa = await mysql.query("SELECT COUNT(sabores) AS portuguesa FROM pedidos WHERE sabores LIKE '%Portuguesa%';")
        const margherita = await mysql.query("SELECT COUNT(sabores) AS margherita FROM pedidos WHERE sabores LIKE '%Margherita%';")
        const  calabresa = await mysql.query("SELECT COUNT(sabores) AS calabresa FROM pedidos WHERE sabores LIKE '%Calabresa%';")
        const  file = await mysql.query("SELECT COUNT(sabores) AS file FROM pedidos WHERE sabores LIKE '%Filé com cheddar%';")
        const  frango = await mysql.query("SELECT COUNT(sabores) AS frango FROM pedidos WHERE sabores LIKE '%Frango com catupiry%';")
        const lombinho = await mysql.query("SELECT COUNT(sabores) AS lombinho FROM pedidos WHERE sabores LIKE '%Lombinho%';")
        
        const resultQueijos= queijos[0].queijos
        const resultPortuguesa= portuguesa[0].portuguesa
        const resultMargherita= margherita[0].margherita
        const resultCalabresa= calabresa[0].calabresa
        const resultFile= file[0].file
        const resultFrango= frango[0].frango
        const resultLombinho= lombinho[0].lombinho

        res.render('admin/dashboard',{resultMargherita, resultLombinho, resultFile, resultFrango, resultCalabresa, resultQueijos, resultPortuguesa, resultComum, resultTemperada, resultIntegral, resultCatupiry, resultCheddar, resultChocolate})
    }

    static async admin(req,res){
        console.log("CHEGUEIIII")
        const userId = req.session.userid
       
        let user = await User.findOne({
            where:{
                id:userId,
            }
        })


        //ver se o usuario existe
        if(!user){
            res.redirect('admin/login')
        }

        res.render('admin/home')

    }

    static async showPedidos(req,res){
        const pedidosData= await Pedido.findAll({
            
        })

        const pedidos= pedidosData.map((result) => result.dataValues)
        //console.log(pedidosData)
        res.render('admin/adminPedidos', {pedidos})
    }

    static async pedidosAdmin(req,res){
        res.render('admin/adminPedidos')
    }


    static async editarStatusPost(req,res){
        const {id, status} = req.body
        console.log(id)
        console.log(status)
 
        const pedido = {
            status:status
        }
        
        try{
           
            await Pedido.update(pedido, {where: {id:id}})
            
            req.session.save(()=>{
                res.redirect('admin/menu')
            })
        }catch(error){
            console.log(error)
        }
    } 

    static async remove(req,res){
        const {id} = req.body
        
        try{
           
            await Pedido.destroy({where: {id:id}})
            
            req.session.save(()=>{
                res.redirect('admin/menu')
            })
        }catch(error){
            console.log(error)
        }
    } 

   
}