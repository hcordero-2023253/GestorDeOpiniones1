import User from '../src/user/user.model.js'
import Category from '../src/category/category.model.js'
import Publication from '../src/publications/publications.model.js';


//Validate Users
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

//Validate category
export const existCategory = async (name, category) => {
    const alreadyCategory = await Category.findOne({name: name });
    if (alreadyCategory && alreadyCategory._id != category._id) {
        console.error(`Category ${name} is already taken`);
        throw new Error(`Category ${name} is already taken`);
    }
}

//Validate post
export const existPostName = async (title, publications) => {
    const alreadyPublication = await Publication.findOne({title: title });
    if (alreadyPublication && alreadyPublication._id != publications._id) {
        console.error(`Publication ${title} is already taken`);
        throw new Error(`Publication ${title} is already taken`);
    }
}

export const existPostcontent = async(content, publications)=>{
    const alreadyPublication = await Publication.findOne({content: content });
    if (alreadyPublication && alreadyPublication._id != publications._id) {
        console.error(`Publication ${content} is already taken`);
        throw new Error(`Publication ${content} is already taken`);
    }
}

export const notRequiredFlied = async(field)=>{
    if(field){
        throw new Error(`${field} is not required`);
    }
}