const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogStore = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "blogUserRegister",
    trim:true
  },
  title:{
    type:String,
    required:true,
    trim:true,
  },
  description:{
    type:String,
    required:true,
    trim:true,
  },
  isDeleted:{
    type:Boolean,
    default:false,
  },
},{timestamps:true});

module.exports = mongoose.model("blogdata",blogStore);