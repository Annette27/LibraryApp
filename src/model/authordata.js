const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/LIBRARYAPPNEW?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    name:String,
    countryname:String,
    genre:String,
    image:String
});
var Authordata = mongoose.model('authordata',AuthorSchema);
module.exports = Authordata;