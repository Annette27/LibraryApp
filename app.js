const express = require("express");
const app = new express();
const bodyparser = require("body-parser");
const session = require("express-session");
const{check,validationResult}= require("express-validator")
const {v4:uuidv4}= require("uuid");
const port= process.env.PORT||5000;

const nav =[
    {
        link:"/books",name:"Books"
    },
    {
        link:"/authors",name:"Authors"
    },
    {
        link:"/signin",name:"Sign In"
    },
    {
        link:"/signup",name:"Sign Up"
    },
    {
        link:"/addbook",name:"Add Book"
    }
]
const booksRouter = require("./src/routes/bookRoutes")(nav);
const signinRouter = require("./src/routes/signin")(nav);
const authorsRouter = require("./src/routes/authorRoutes")(nav);
const signupRouter = require("./src/routes/signup")(nav);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:false
}));
app.use(express.static("./public"));
app.set("view engine","ejs")//setting template engine to ejs.ejs is used to embed js into html
app.set("views","./src/views") //setting the path of index page
// app.set("views",__dirname+"/src/views")
app.use("/books",booksRouter);
app.use("/signin",signinRouter);
app.use("/signup",signupRouter);
app.use("/authors",authorsRouter);
app.get("/",function(req,res){
res.render("index",{
    nav,
    title:"Library",

})
});
app.get("/addbook",function(req,res){
    res.render("addbook",{
        nav,
        title:"Add Book",
        error1:"",
        error2:"",
        error3:"",
        error4:""
    
    })
    });

app.post("/addbook",
[check("BookName").notEmpty().isLength({ min: 5 }),
check("Genre").notEmpty().isLength({ min: 5 }),
check("Author").notEmpty().isLength({ min: 5 })
],
(req,res)=>{
    req.session.user=req.body.BookName;
    var errors=[];
    errors.push(validationResult(req))

if(Object.entries(errors[0].errors).length === 0){
   
    res.render("index",{nav,title:"Libray",error1: "",error2:"",error3:"",error4:""})
  
}
else if(req.body.BookName.length <5 ){
  
    res.render("addbook",{nav,title:"Libray",error1: "Book name should be atleast 5 letters long",error2:"",error3:"",error4:""})
    }
else if(req.body.Author.length <5) {
  
        res.render("addbook",{nav,title:"Libray",error1: "",error2:"Author name should be atleast 5 letters long",error3:"",error4:""})
        }   
else if(req.body.Genre.length <5 ) {
  
            res.render("addbook",{nav,title:"Libray",error1: "",error2:"",error3:"Genre name should be atleast 5 letters long",error4:""})
            }  
 else {
  
    res.render("addbook",{nav,title:"Libray",error1: "Invalid crentials",error2:"",error3:"",error4:""})
    }

}) 
app.listen(port,()=>{console.log("Server ready at " + port)});