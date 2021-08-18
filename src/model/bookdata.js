const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/LIBRARYAPPNEW?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title:String,
    author:String,
    genre:String,
    image:String
});
var Bookdata = mongoose.model('bookdata',BookSchema);
module.exports = Bookdata;