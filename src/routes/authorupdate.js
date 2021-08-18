const express = require("express")
const multer = require("multer")
// const morgan = require("morgan")
const fs = require("fs")
const path = require("path")
// const bodyparser = require("body-parser");
// const session = require("express-session");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/LIBRARYAPPNEW?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});
// const{check,validationResult}= require("express-validator")
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:true}))
// app.use(morgan("dev"))
const authorupdateRouter = express.Router();
const Authordata = require("../model/authordata")
var storage = multer.diskStorage({
    destination:function(request,file,callback){
    callback(null,"./public/uploads")
    },
    filename:function(request,file,callback){
      
        callback(null,file.fieldname + "-" + Date.now()+ path.extname(file.originalname))
           },
})
const upload = multer({storage:storage})
// app.use(express.static("./public"));


function router(nav){
    const redirectlogin = (req,res,next)=>{

        if(req.session.Userid!=="admin@gmail.com"){
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
    authorupdateRouter.get("/",redirectlogin,function(req,res){
      
        let response = {};
        response.title = 'Add Author';
        response.error1="";
        response.error2="";
        response.error3="";
        response.error4="";
        response.nav = nav.admin;
        res.render("addauthor",
            response)
        });


        authorupdateRouter.get("/modify",redirectlogin,function(req,res){
            console.log("error")
            Authordata.find()
              .then(function(authors){
            
            res.render("updateauthor",{
        
                title:"Modify Author",
                nav:nav.admin,
                authors
            
            })
        })
            });

     
            authorupdateRouter.get("/modify/:id",redirectlogin,function(req,res){
                    const id= req.params.id
                                       
                    Authordata.findByIdAndDelete(id)
                           .then(()=>{
                            res.redirect('/authors');
                        })
                        .catch((err)=>{
                            console.log(err);
                            // Handle errors
                        })})

                        authorupdateRouter.get("/edit/:id",redirectlogin,function(req,res){
                            let authorId = req.params.id;
                            Authordata.findById(authorId)
                                .then((author)=>{
                                    
                                         res.render('editauthor',{
                                         author,
                                        nav:nav.admin,
                                        title:"Edit Authors",
                                       error1:"",
                                       error2:"",
                                       error3:"",
                                       error4:"",
                                    });
                                });
                            console.log("error")
                          
                            })
                            authorupdateRouter.post("/edit/:id",redirectlogin,upload.single("image"),function(req,res){
                                let authorId = req.params.id;
                               let updatedAuthor = req.body;
                                          
                    if(req.file){
                        var imagnew = fs.readFileSync(req.file.path);
        
                        var fimage={
                            contentType:req.file.mimetype,
                            path:req.file.path,
                            image:Buffer.from(imagnew).toString("base64")
                        };
                    }
                    var item ={
                        name: req.body.name,
                        countryname: req.body.countryname,
                        genre: req.body.genre,
                        image: req.file.filename,
                     }
                    // var book = Bookdata(item);
                    Authordata.findByIdAndUpdate(authorId, item)
                    .then(()=>{
                        res.redirect('/authors');
                    })
                          
                                })
              
                                authorupdateRouter.post("/",redirectlogin,upload.single("image"),redirectlogin,function(req,res,next){
               
            let response = {};
            response.title = 'Author';
            response.error1="";
            response.error2="";
            response.error3="";
            response.error4="";
            response.nav = nav.admin;      
              var imagnew = fs.readFileSync(req.file.path);
        
            var fimage={
                contentType:req.file.mimetype,
                path:req.file.path,
                image:Buffer.from(imagnew).toString("base64")
            };
        
            var item ={
                name: req.body.name,
                countryname: req.body.countryname,
                genre: req.body.genre,
                image: req.file.filename,
             }
            var author = Authordata(item);
            author.save();
            res.redirect("/authors")
            
                
         
        })      
            return authorupdateRouter
}

module.exports = router;    