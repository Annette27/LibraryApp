const express = require("express")

const booksRouter = express.Router();
function router(nav){
    var books=[
        {
            title:"Eragon",
            author:"Christopher Paolini",
            genre:"Fantasy",
            img:"eragon.jpg"
        },
        {
            title:"Harry Potter & The Chamber of Secrets",
            author:"J K Rowling",
            genre:"fanatsy fiction",
            img:"harry.jpg"
        },
        {
            title:"The Famous Five",
            author:"Enid Blyton",
            genre:"Adventure fiction",
            img:"famousfive.jpg"
        },
        {
            title:"God of Small Things",
            author:"Arundhathi Roy",
            genre:"Psychological Fiction",
            img:"godof.jpg"
        },
        {
            title:"The Mysterious Affairs at Styles",
            author:"Agatha Christy",
            genre:"fiction",
            img:"themystry.jpg"
        },
        {
            title:"Wings Of Fire",
            author:"Dr. A P J Abdul Kalam",
            genre:"Non-fiction",
            img:"Wings-Of-Fire.jpg"
        },
        {
            title:"The Boy from the Hills",
            author:"Ruskin Bond",
            genre:"Children-fiction",
            img:"RustyBoy.jpg"
        }
    
    
    
    ]
    booksRouter.get("/",function(req,res){
        res.render("books",{
        
            title:"Books",
            nav,
            books
        
        })
        });
        booksRouter.get("/:id",function(req,res){
          const id= req.params.id
            res.render("book",{
            
                title:"Book",
                nav,
                book:books[id]
            
            })
            });
            return booksRouter
}

module.exports = router;        