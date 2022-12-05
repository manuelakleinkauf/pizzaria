const { DataTypes } = require('sequelize')

const db = require('../db/conn')
//const Status = require('./Status')

const Pedido = db.define('pedido', {
    massa:{
        type: DataTypes.STRING,
        require: true
    },
    borda:{
        type: DataTypes.STRING,
        require: true
    },
    sabores:{
        type: DataTypes.STRING,
        require: true,
      
    },
    nome:{
        type: DataTypes.STRING,
        require: true,
      
    },
    status:{
        type:  DataTypes.ENUM,
        values: ['Em produção', 'Em entrega', 'Concluído']
    }
    
})




module.exports = Pedido