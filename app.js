const express = require("express");
const multer = require("multer")
const morgan = require("morgan")
const fs = require("fs")
const path = require("path")
const app = new express();
const bodyparser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose")
const MongoStore = require('connect-mongo');  
const{check,validationResult}= require("express-validator")
const {v4:uuidv4}= require("uuid");
const port= process.env.PORT||5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use(morgan("dev"))
const Userdata = require("./src/model/userdata")

const nav ={
    first:[
         {
        link:"/",name:"Home"
         },
         {
        link:"/signin",name:"Sign In"
         },
         {
        link:"/signup",name:"Sign Up"
         }
         ],
    user:[
        {
        link:"/books",name:"Books"
        },
        {
        link:"/authors",name:"Authors"
        },
        {
        link:"/logout",name:"Logout"
        }
   ],

    admin:[
        {
            link:"/",name:"Home"
             },
        
        {
            link:"/books",name:"Books"
        },
        {
            link:"/authors",name:"Authors"
        },
       
        {
            link:"/addbook",name:"Add Book"
        },
        {
            link:"/addauthor",name:"Add Author"
        },
        {
            link:"/addbook/modify",name:"Modify Book"
        },
        {
            link:"/addauthor/modify",name:"Modify Author"
        }
        ,
        {
           link:"/logout",name:"Logout"
       }
    ]
}
const booksRouter = require("./src/routes/bookRoutes")(nav);
const signinRouter = require("./src/routes/signin")(nav);
const authorsRouter = require("./src/routes/authorRoutes")(nav);
const signupRouter = require("./src/routes/signup")(nav);
const booksupdateRouter = require("./src/routes/bookupdate")(nav);
const authorupdateRouter = require("./src/routes/authorupdate")(nav);

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true,
    cookie: { secure: false },
    store: MongoStore.create({mongoUrl: "mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/LIBRARYAPPNEW?retryWrites=true&w=majority"})

}));
app.use(express.static("./public"));
app.set("view engine","ejs")//setting template engine to ejs.ejs is used to embed js into html
app.set("views","./src/views") //setting the path of index page
// app.set("views",__dirname+"/src/views")
app.use("/books",booksRouter);
app.use("/addbook",booksupdateRouter);
app.use("/addauthor",authorupdateRouter);
app.use("/signin",signinRouter);
app.use("/signup",signupRouter);
app.use("/authors",authorsRouter);

const redirectlogin = (req,res,next)=>{

    if(!req.session.id2){
        let response = {};
            response.title = 'library';
            response.error1="";
            response.error2="";
            response.error3="";
            response.error4="";
            response.nav = nav.first;
        res.render("index",response)
        // console.log("errjhkrdghldhs")
    }
    else{
        next()
    }
    }
app.get("/",redirectlogin,function(req,res){
    const{ id2 }= req.session
    let response = {};
    response.title = 'Library';
    req.session.Userid=req.body.exampleInputEmail1
    console.log(req.session.Userid)
    if(req.session.Userid=="admin@gmail.com"){
        response.nav = nav.admin;
    }
    else if(Userdata.find({exampleInputEmail1:req.session.Userid})){
        response.nav = nav.first;

    }
    else{
        response.nav = nav.first;
    }
   
    res.render("index",response)

});
app.get("/logout",function(req,res){
    let response = {};
    response.title = 'Library';
    response.nav = nav.first;
    req.session.destroy();
    res.redirect('/signin');
});



app.listen(port,()=>{console.log("Server ready at " + port)});