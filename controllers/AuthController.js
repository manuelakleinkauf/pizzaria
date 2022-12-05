const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    
    
    static login(req,res){
        res.render('auth/login')
    }


    
    static async loginPost(req,res){

        const {email, senha} = req.body

        //usuario existe
        let user = await User.findOne({where: {email:email}})
        user = user.dataValues
    
       

        if(!user){
           
            res.render('auth/login')
            

            return
        }

        //senha valida
        const senhaMatch = bcrypt.compareSync(senha, user.senha)

        if(!senhaMatch){
         res.render('auth/login')
            
            return 
        }
        
        
        //inicializar a session
        req.session.userid = user.id


        req.session.save(()=>{
            res.redirect('admin/menu')
        })
    }




    static cadastro(req,res){
        res.render('auth/cadastro')
    }

    static async cadastroPost(req,res){
        const{name, email, senha, confirmaSenha} = req.body

        //validacao da senha
        if(senha != confirmaSenha){
            res.render('auth/cadastro')

            return
        }

        //ver se o nome do usuario ja existe
        const checkIfUserExists = await User.findOne({where: {email: email}})
    
        if(checkIfUserExists){

            res.render('auth/cadastro')

            return
        }

        //criar a senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(senha, salt)

        const user = {
            name, 
            email,
            senha: hashedPassword,
        }

        try{
            const createdUser = await User.create(user)

            req.session.save(()=>{
                res.redirect('/')
            })


        }catch(err){
            console.log(err)
        }
    }

    static logout(req,res){
        req.session.destroy()
        res.redirect('/login')
    }


    
}