import { checkPassword,encrypt } from '../../utils/encrypt.js';
import User from './user.model.js'

//Update username and password
export const updateUser = async (req, res) => {
    try {
        let {id} = req.params;
        let { password, newPassword, newUsername} = req.body;

        let user = await User.findById(id);
        if(!user) return res.status(500).send({
            success: false,
            message: 'User not found'
        })

        if(newUsername){
            const existingUser = await User.findOne({username: newUsername});
            if(existingUser) return res.status(500).send({
                success: false,
                message: 'Username already exists'
            })
            user.username = newUsername;    
        }
        
        if(newPassword){
            if(!await checkPassword(user.password, password)){
                return res.status(500).send({
                    success: false,
                    message: 'Old password is incorrect'
                })
            }
            if(password === newPassword){
                return res.status(500).send({
                    success: false,
                    message: 'New password cannot be the same as old password'
                })
            }
            user.password = await encrypt(newPassword)
        }

        await user.save();

        return res.send({
            success: true,
            message: 'User updated successfully',
            user
        })

       
    } catch (error) {
        console.error('Error al obtener un usuario:', error);
        return res.status(500).send({
            success: false,
            message: 'Error al actualizar usuario',error
        })
    }
}