import User from '../src/user/user.model.js'

export const existUsername = async (username, user) => {
    const alreadyUser = await User.findOne({ username});
    if (alreadyUser && alreadyUser._id != user.uid) {
        console.error(`Username${username} is already taken`);
        throw new Error(`Username${username} is already taken`);
    }
}

export const existEmail = async (email, user) => {
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser && alreadyUser._id != user.uid) {
        console.error(`Email${email} is already taken`);
        throw new Error(`Email${email} is already taken`);
    }
}

export const notRequiredFlied = async(field)=>{
    if(field){
        throw new Error(`${field} is not required`);
    }
}