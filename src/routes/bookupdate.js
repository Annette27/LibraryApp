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
const booksupdateRouter = express.Router();
const Bookdata = require("../model/bookdata")
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
    booksupdateRouter.get("/",redirectlogin,function(req,res){
      
        let response = {};
        response.title = 'Add Book';
        response.error1="";
        response.error2="";
        response.error3="";
        response.error4="";
        response.nav = nav.admin;
        res.render("addbook",
            response)
        });


        booksupdateRouter.get("/modify",redirectlogin,function(req,res){
            Bookdata.find()
        .then(function(books){
            res.render("updatebook",{
        
                title:"Modify Books",
                nav:nav.admin,
                books
            
            })
        })
            });

     
               booksupdateRouter.get("/modify/:id",redirectlogin,function(req,res){
                    const id= req.params.id
                    Bookdata.findByIdAndDelete(id)
                           .then(()=>{
                            res.redirect('/books');
                            // console.log("sucess");
                        })
                        .catch((err)=>{
                            console.log(err);
                            // Handle errors
                        })})

                        booksupdateRouter.get("/edit/:id",function(req,res){
                            let bookId = req.params.id;
                            Bookdata.findById(bookId)
                                .then((book)=>{
                                    
                                         res.render('editbook',{
                                         book,
                                        nav:nav.admin,
                                        title:"Edit Books",
                                       error1:"",
                                       error2:"",
                                       error3:"",
                                       error4:"",
                                    });
                                });
                            console.log("error")
                          
                            })
                            booksupdateRouter.post("/edit/:id",upload.single("image"),function(req,res){
                                let bookId = req.params.id;
                               let updatedBook = req.body;
                                          
                    if(req.file){
                        var imagnew = fs.readFileSync(req.file.path);
        
                        var fimage={
                            contentType:req.file.mimetype,
                            path:req.file.path,
                            image:Buffer.from(imagnew).toString("base64")
                        };
                    }
                    var item ={
                        title: req.body.title,
                        author: req.body.author,
                        genre: req.body.genre,
                        image: req.file.filename,
                     }
                    // var book = Bookdata(item);
                    Bookdata.findByIdAndUpdate(bookId, item)
                    .then(()=>{
                        res.redirect('/books');
                    })
                          
                                })
              
            booksupdateRouter.post("/",upload.single("image"),redirectlogin,function(req,res,next){
               
            let response = {};
            response.title = 'Book';
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
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                image: req.file.filename,
             }
            var book = Bookdata(item);
            book.save();
            res.redirect("/books")
            // res.render("books",trial)
                
         
        })      
            return booksupdateRouter
}

module.exports = router;    