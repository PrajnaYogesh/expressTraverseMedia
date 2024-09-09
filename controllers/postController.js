const { post } = require("../routes/posts");

let posts = [
    {
        id:1,
        title:"Post one"
    },
    {
        id:2,
        title:"Post two"
    },
    {
        id:3,
        title:"Post three"
    }
]



//get all posts
 const getPosts = (req,res,next)=>{
    console.log(req.query)
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit)&& limit>0){
 return res.status(200).json(posts.slice(0,limit));
    }
        res.status(200).json(posts)
    

}

 const getPost = (req,res,next)=>{
    const id = parseInt(req.params.id);
   const post = posts.find((post)=> post.id === id) ;
   if(!post){
    // res.status(404).send(`Post with ${id} not found`)
 // res.status(404).json({msg: `Post with ${id} not found`})  
 
 //error handler
 const error = new Error(`Post with ${id} not found`)
 error.status = 404;
 return next(error);
 // res.status(200).json(posts.filter((post)=> post.id ===id));
   }
   
   res.status(200).json(post)
 }



const createPost = (req,res,next)=>{
    console.log(req.body); // to access the body sent in req, we need to add express.json and urlencoded in server.js
const newPost = {
    id : posts.length+1,
    title : req.body.title,
}
if(!newPost.title){
    // return res.status(400).json({message: "Please include a title"})
    const error = new Error(`Please include a title`)
error.status = 400;
return next(error);
}
posts.push(newPost)
    res.status(201).json(posts);    
}

const updatePost = (req,res,next)=>{
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id)
    if(!post){
        // return res.status(401).json({msg: `A post with ${id} is not found`})
        const error = new Error(`A post with ${id} is not found`)
        error.status = 404;
        return next(error);
    }
    post.title = req.body.title;
    res.status(200).json(post)
    
    }

const deletePost = (req,res,next)=>{
    const id = parseInt(req.params.id); // input always recieved as string, parse it to int
    const post = posts.find((post)=> post.id === id);
if(!post){
//    return res.status(404).json({msg:`A post with ${id} is not found`})
const error = new Error(`A post with ${id} is not found`)
error.status = 404;
return next(error);
}
posts = posts.filter((post)=> post.id !== id);
res.status(200).json(posts)
    }

module.exports={getPosts,getPost,createPost,updatePost,deletePost};
