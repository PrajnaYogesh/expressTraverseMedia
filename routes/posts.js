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

module.exports = router;