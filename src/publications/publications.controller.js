import Publications from './publications.model.js'
import Comment from '../comments/comments.model.js'

export const addPost = async (req, res) => {
    try {
        let data = req.body;
        let post = new Publications(data);
        await post.save();
        return res.status(200).send({
            success: true,
            message: `Post ${post.title} added successfully`,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error adding post"
        })
    }
}

export const viewPost = async(req, res)=>{
    const {limit , skip} = req.query;
    try{
        const posts = await Publications.find().skip(skip).limit(limit).populate('user').populate('category');
        if(posts.length === 0) return res.status(404).send({
            success: false,
            message: 'No posts found'
        })

        return res.send({
            success: true,
            message: 'Posts found',
            total: posts.length,
            posts
        })
    }catch (error){
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error adding post"
        })
    }
}

export const viewPostById = async (req, res) => {
    try {
        let id = req.params.id;
        let post = await Publications.findById(id).populate('user').populate('category');
        if (!post) return res.status(404).send({
            success: false,
            message: 'Post not found', post
        })
        return res.send({
            success: true,
            message: 'Post found', post
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Not found Post ', error
        });
    }
}

export const updatePost = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let post = await Publications.findById(id).populate('user');

        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found'
            });
        }

        if (post.user._id.toString() !== req.user.uid){
            return res.status(401).send({
                success: false,
                message: 'You are not the owner of this post'
            });
        }

        let updatedPost = await Publications.findByIdAndUpdate(id, data, { new: true })
            .populate('user')
            .populate('category');

        return res.send({
            success: true,
            message: `${updatedPost.title} post updated`,
            post: updatedPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating post',
            error
        });
    }
};


export const deletePost = async(req, res)=>{
    try {
       let id = req.params.id;
       const post = await Publications.findById(id).populate('user');

        if(!post)return res.status(404).send({
            success: false,
            message: 'Post not found'
        });

        if(post.user._id.toString()!== req.user.uid) return res.status(401).send({
            success: false,
            message: 'You are not the owner of this post'
        })

        await Comment.deleteMany({post: id});
        await Publications.findByIdAndDelete(id);

        return res.send({
            success: true,
            message: `${post.title} post deleted`
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Not found Post ', error
        });
    }
}