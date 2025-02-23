import Comment from './comments.model.js'
import Publications from '../publications/publications.model.js'
import User from '../user/user.model.js'

export const addComment = async (req, res) => {
    try {
        let data = req.body;
        let comment = new Comment(data);

        if(!data.content || !data.user || !data.post) {
            return res.status(400).send({
                success: false,
                message: 'Comment is required',
            });
        }

        let user = await User.findById(data.user);
        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        let post = await Publications.findById(data.post);
        if(!post) {
            return res.status(404).send({
                success: false,
                message: 'Publication not found',
            });
        }

        await comment.save();

        return res.status(200).send({
            success: true,
            message: "Comment added successfully",
            comment
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error adding comment' 
            
        })
    }
}

export const viewComments = async (req, res) => {
    /*En la paginacion agrege un apartado para buscar los comentario
    de una publicacion en especifico, solo colocar el id y saldran
    todos los comentarios relacionados a esa publicacion */
    const { limit, skip, post} = req.query;
    try {

        if(!post){
            return res.status(400).send({
                success: false,
                message: 'Post is required',
            });
        }

        const comments = await Comment.find({post: post}).skip(skip).limit(limit).populate('user').populate('post');

        if(comments.length === 0 ){
            return res.status(404).send({
                success: false,
                message: 'No comments found',
            });
        }
        
        return res.status(200).send({
            success: true,
            message: 'Comments retrieved successfully',
            total: comments.length,
            comments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error view comment' 
            
        })
    }
}

export const viewCommentsById = async (req, res) => {
    try {
        let id = req.params.id;
        const comment = await Comment.findById(id).populate('user').populate('post');
        if(!comment) return res.status(404).send({
            success: false,
            message: 'Comment not found',
        })

        return res.status(200).send({
            success: true,
            message: 'Comment retrieved successfully',
            comment
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error view comment' 
            
        })
    }
}

export const updateComments = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        const comment = await Comment.findByIdAndUpdate(id, data, {new: true});
        if(comment.user.toString()!== req.user.uid) return res.status(401).send({
            success: false,
            message: 'You are not the owner of this post'
        })
        return res.status(200).send({
            success: true,
            message: 'Comment updated successfully',
            comment
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error with update comment' 
            
        })
    }
}

export const deleteComment = async(req, res)=>{
    try {
       let id = req.params.id;
       const comment = await Comment.findByIdAndDelete(id);
        if(comment.user.toString()!== req.user.uid) return res.status(401).send({
            success: false,
            message: 'You are not the owner of this comment'
        })
        return res.send({
            success: true,
            message: 'Comment deleted'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Not found comment ', error
        });
    }
}