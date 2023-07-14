const mongoose = require('mongoose');
require('dotenv').config();



const connectDb = async(url) => {
    return  await mongoose.connect(url).then(()=>{console.log("Mongo DB is connected!!")}).catch((error)=>{console.log(error.message)});
};

module.exports = connectDb;