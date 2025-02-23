import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js';
import { generateJwt } from '../../utils/jwt.js';

//Register
export const register = async (req, res) => {
    try {
        let data = req.body;
        let user = new User(data);
        user.password = await encrypt(data.password);
        user.role = 'CLIENT'
        await user.save();
        return res.send({
            success: true,
            message: `${user.username} created successfully'`
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error al registrar usuario',error
        });
    }
}

//Login

export const login = async (req, res) => {
    try {
        let {userLoggin, password} = req.body;
        let user = await User.findOne({
            $or:[
                {username:userLoggin},
                {email:userLoggin}
            ]
        })

        
        if(user && await checkPassword(user.password, password)){
            let loggerUser={
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }   
            let token = await generateJwt(loggerUser);
            return res.send({
                success: true,
                message: `Welcome ${user.name} you are logged in`,
                loggerUser,
                token
            })
        }
        
        return res.status(400).send({
            success: false,
            message: 'Incorrect password or userLoggin',
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message:'Generar error with login',error
        })
    }
}


//Create admin default
export const createAdmin = async () =>{
    try {
        let adminExist = await User.findOne({name: 'Admin'})

        if(!adminExist){
            let admin = new User({
                name: 'Admin',
                lastname: 'Primero',
                username: 'admin',
                email: 'admin@admin.com',
                password: process.env.PASSWORD,
                role: 'ADMIN'
            })
            admin.password = await encrypt(admin.password)
            await admin.save()
        }
    } catch (error) {
        console.error(error);
    }
}