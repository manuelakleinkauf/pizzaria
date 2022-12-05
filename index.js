const express= require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')


const app = express()

const conn = require('./db/conn')


//MODELS
const User = require('./models/User')
const Pedido = require('./models/Pedido')



//IMPORT ROUTES
const pedidoRoutes = require('./routes/pedidosRoutes')
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')

//controller
const PedidosController = require('./controllers/PedidoController')
const AdminController = require('./controllers/AdminController')
//const AuthController = require('./controllers/AuthController')

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

//receber resposta do body
app.use(
    express.urlencoded({
       extended: true,
    })
 )
 
 app.use(express.json())

 //session middlaware
app.use(
    session({
        name:"session",
        secret:"secret",
        resave:false,
        saveUninitialized:false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'sessions'),

        }),
        cookie:{
            secure: false,
            httpOnly:true,
        }
    }),
)
//public path
app.use(express.static('public'))

//set session to res 
app.use((req,res,next)=>{
    if(req.session.userid){
        res.locals.session = req.session
        console.log(req.session.userid)
    }

    next()
})

//ROUTES
app.use('/pedidos', pedidoRoutes)
app.get('/', PedidosController.showPedidos)

app.use('/',authRoutes)

app.use('/admin',adminRoutes)
app.use('/',adminRoutes)

app.use('/pedido', PedidosController.pedido)
app.use('/editarStatusPost', AdminController.editarStatusPost)


app.use('/notaFiscal', PedidosController.notaFiscal)



conn
    //.sync({force: true})
    .sync()
    .then(()=>{
        app.listen(3000)
    })
    .catch((err) => console.log(err))

    