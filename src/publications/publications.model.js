import { Schema, model } from "mongoose";
import category from "../category/category.routes";

const publicationsSchema = Schema({
    title:{
        type:String,
        required:[true, 'Title is required'],
    },
    content:{
        type:String,
        required:[true, 'Content is required'],
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:[true, 'User is required'],
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:[true, 'Category is required'],
    }
})

export default model('Publication', publicationsSchema);