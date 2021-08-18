const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/LIBRARYAPPNEW?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    exampleInputEmail1:String,
    exampleInputPassword1:String,
  });
var Userdata = mongoose.model('userdatadata',UserSchema);
module.exports = Userdata;