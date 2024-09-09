const express = require('express') //bring in express
const router = express.Router(); //Router present inside express
const postsController = require('../controllers/postController')

//middleware takes 3 inputs, req->res ->next adding logger middleware

const logger = (req,res,next) =>{
    console.log(
        `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
        // `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    );
    next();
}


//get all posts
router.get('/',postsController.getPosts)

// router.get('/',logger,(req,res)=>{
//     router.get('/',(req,res,next)=>{
//     console.log(req.query)
//     const limit = parseInt(req.query.limit);
//     if(!isNaN(limit)&& limit>0){
//  return res.status(200).json(posts.slice(0,limit));
//     }
//         res.status(200).json(posts)
    

// })

//get single post
router.get('/:id',postsController.getPost)
 

// router.get('/:id',(req,res,next)=>{
//    const id = parseInt(req.params.id);
//   const post = posts.find((post)=> post.id === id) ;
//   if(!post){
//    // res.status(404).send(`Post with ${id} not found`)
// // res.status(404).json({msg: `Post with ${id} not found`})  

// //error handler
// const error = new Error(`Post with ${id} not found`)
// error.status = 404;
// return next(error);
// // res.status(200).json(posts.filter((post)=> post.id ===id));
//   }
  
//   res.status(200).json(post)
// })


// create new post
router.post('/',postsController.createPost)


//update a post
router.put('/:id',postsController.updatePost)

//Delete a post

router.delete('/:id',postsController.deletePost)


module.exports = router;