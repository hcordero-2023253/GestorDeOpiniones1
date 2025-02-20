import { Schema, model } from "mongoose";

const commentSchema = Schema({
    content:{
        type:String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required : true
    }  
})

export default model('Comment', commentSchema);