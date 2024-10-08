const express = require('express')
const app = express();
const path = require('path')
const PORT = process.env.PORT|| 8000;
const posts = require('./routes/posts');
const logger = require('./middleware/logger')  // use logger for every call..2nd type..check notes
const errorHandler= require('./middleware/error')


// we are adding a body parser middleware here. we add it to access data sent in body from request
app.use(express.json());
//we add the below line to access form data sent in the request body
app.use(express.urlencoded({extended:false}));



//logger middleware
app.use(logger)  // use logger for every call..2nd type..check notes




//we can make a folder static and here we set up public folder as static --> it is a express static  middleware, we use  'use' keyword
// app.use(express.static(path.join(__dirname,'public')))  // we made public as static folder


//since we made public as static, we will not have to specify the route to each folders as below.

// //we created a path variable on top to access folders and file and using the below path.join, we can access the folder and file we want to go to when you hit the url
// app.get('/',(req,res)=>{
//     // res.send('Hello World!!!!');
//     res.sendFile(path.join(__dirname,'public','index.html')) //public is the folder and index.html is file..since wea re using folder and file we used join
// })

// app.get('/about',(req,res)=>{
//     // res.json({'message' :"This is about page"})
//     res.sendFile(path.join(__dirname,'public','about.html'))
// })


// Routes
app.use('/api/posts',posts)


//added error handler for requests other than our end points 
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

//use errorHandler middleware ..always use it below routes
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`server listening at ${PORT}`);
    
})

//one way to restart a server automatically is install nodemon and add script  in package.json.. "start" : "nodemon server" and run => npm start
//another way is using watch..add the start and dev script as we used here in package.json and run =>  npm run dev