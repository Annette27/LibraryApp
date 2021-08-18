const express = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/LIBRARYAPPNEW?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});
const Userdata = require("../model/userdata")

const credential = {
    email : "admin@gmail.com",
    password :"admin12345"
}
const nav ={
    first:[
         {
        link:"/Home",name:"Home"
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
            link:"/books",name:"Books"
        },
        {
            link:"/authors",name:"Authors"
        },
        {
            link:"/logout",name:"Logout"
        },
        {
            link:"/addbook",name:"Add Book"
        },
        {
            link:"/addauthor",name:"Add Author"
        }

    ]
}
const signinRouter = express.Router();
function router(nav){
    let response = {};
    response.title = 'Signin';
    response.nav = nav.first; 
    response.error1="";
    response.error2="";
    response.error3="";
    response.error4="";
    signinRouter.get("/",function(req,res){
        res.render("signin",response
        
        )
        });
        signinRouter.post("/",(req,res)=>{
            let response = {};
            response.title = 'Library';
            response.nav = nav.admin;
            response.error1="";
            response.error2="";
            response.error3="";
            response.error4="";
        //   console.log(response)
            if(req.body.email ==credential.email && req.body.password == credential.password){
              req.session.Userid=req.body.email
              console.log(req.body.email)
              res.render("../views/index",response)
               
            }
          
            else{
                var item ={
                    exampleInputEmail1: req.body.email,
                    exampleInputPassword1: req.body.password ,
                      }
                Userdata.findOne({exampleInputEmail1: item.exampleInputEmail1})
                            
                .then((user)=>{
                    
                    if(user&& user.exampleInputPassword1===item.exampleInputPassword1){
                        req.session.Userid=req.body.email
                        let response = {};
                        response.title = 'Library';
                        response.nav = nav.user;
                        response.error1="";
                        response.error2="";
                        response.error3="";
                        response.error4="";

                        // console.log(user)
                        res.render("index",response)
                    }
                    else{
                        let response = {};
                        response.title = 'SigninLibrary';
                        response.nav = nav.first;
                        response.error1="";
                        response.error2="Incorrect password";
                        response.error3="";
                        response.error4="";
                        console.log(user)
                            res.render("signin",response)
                    }
                     
                } )
        
            }
        })      
       return signinRouter;
}

module.exports = router;        