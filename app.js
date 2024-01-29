const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const Article = require('./models/article')

//routes
const UserRouters = require('./routs/user')

const app = express();

//mongoose db connection
mongoose.connect('mongodb://localhost:27017/blogdata',{
    useNewUrlParser:true
})

//view engine
app.use(expressLayouts);
app.set('view engine','ejs');


//rout
app.get('/',async(req,res)=>{
    const article = await Article.find();
    // console.log(article)

     res.render('index',{article:article})
})

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//userRouters
app.use('/article',UserRouters)

//public folder for css and js

app.use(express.static('public'))


//port

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log('server is runing')
})