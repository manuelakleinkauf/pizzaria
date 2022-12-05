//const Massa = require('../models/Massa')
//const Borda = require('../models/Borda')
const Pedido = require('../models/Pedido')
//const Pizza= require('../models/Pizza')
//const Sabores= require('../models/Sabores')




module.exports = class PedidosController{
    static async showPedidos(req, res){
        res.render('pedidos/home')
    }

    
    static async pedido(req,res){
        const{massa, borda, sabores, nome} = req.body

        let array = sabores
        const massaEscolhida = massa
        const bordaEscolhida = borda
        const saboresEscolhidos = sabores
        const nomeCliente= nome

        var resultSabores = array.toString()
       
        const pedido = {
            massa, 
            borda,
            sabores: resultSabores,
            nome,
            status: 'Em produção'
        }
        
        try{
            const createdPedido= await Pedido.create(pedido)

            const resultado = pedido
           
            
            req.session.save(()=>{
                res.render('pedidos/notaFiscal',{resultado})
            })


        }catch(err){
            console.log(err)
        }
    } 

    static async notaFiscal(req, res){
        res.render('pedidos/notaFiscal')
    }


    
    

 

    
    
}