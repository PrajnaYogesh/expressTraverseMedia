const express = require('express') //bring in express
const router = express.Router(); //Router present inside express

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
router.get('/',(req,res)=>{
    console.log(req.query)
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit)&& limit>0){
 return res.status(200).json(posts.slice(0,limit));
    }
        res.status(200).json(posts)
    

})

//get single post
router.get('/:id',(req,res)=>{
   const id = parseInt(req.params.id);
  const post = posts.find((post)=> post.id === id) ;
  if(post){
   return  res.status(200).json(post)
  }
    // res.status(404).send(`Post with ${id} not found`)
res.status(404).json({msg: `Post with ${id} not found`})  

// res.status(200).json(posts.filter((post)=> post.id ===id));

})


// create new post
router.post('/',(req,res)=>{
    console.log(req.body); // to access the body sent in req, we need to add express.json and urlencoded in server.js
const newPost = {
    id : posts.length+1,
    title : req.body.title,
}
if(!newPost.title){
    return res.status(400).json({message: "Please include a title"})
}
posts.push(newPost)
    res.status(201).json(posts);    
})


//update a post
router.put('/:id',(req,res)=>{
const id = parseInt(req.params.id)
const post = posts.find(post => post.id === id)
if(!post){
    return res.status(401).json({msg: `A post with ${id} is not found`})
}
post.title = req.body.title;
res.status(200).json(post)

})

//Delete a post

router.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id); // input always recieved as string, parse it to int
    const post = posts.find((post)=> post.id === id);
if(!post){
   return res.status(404).json({msg:`A post with ${id} is not found`})
}
posts = posts.filter((post)=> post.id !== id);
res.status(200).json(posts)
    })


module.exports = router;