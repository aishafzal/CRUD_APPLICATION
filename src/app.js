const express =require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyparser = require('body-parser');
const user = require('./user');
mongoose.connect('mongodb://127.0.0.1:27017/ead');
const app = express();
app.set('view engine','ejs');
app.use('/public',express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname);
    }
})
var upload = multer({
    storage:storage,
}).single('image');

app.get('/nav',function(req,res)
{;
    res.render('nav')
})

app.get('/create',function(req,res)
{
    res.render('users')
})
app.get('/index',function(req,res){
    res.render('index')
})
app.get('/',async function(req,res){
    const users = await user.find();
    console.log(users);
    res.render('index',{users});
})
app.use(express.static('upload'));
app.post('/user/create',upload,function(req,res)
{
    res.redirect('/index')
 user.create(req.body,function(req,res){
     console.log(res);
     
 })
})

app.get('/edit/:id',function(req,res){
    const id = req.params.id;
    user.findById(id,function(err,user){
        if(err)
        {res.redirect('/');}
        else res.render('editusers',{user:user})
    })
})

app.post('/update/:id',upload,function(req,res)
{
    res.redirect('/')
 user.findByIdAndUpdate(req.body,function(req,res){
     console.log(res);
     
 })
})

app.listen(5000);

