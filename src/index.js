const express = require('express');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const cors = require('cors');
const route = require('../src/routes/route');
const app = express();
const connectDb = require('./db/mongoDb');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// app.use(multer().any());

connectDb(process.env.MONGO_URL);

app.use(fileUpload({
    useTempFiles:true,
}))

app.use('/',route);

app.use('/',(req,res)=>{
    res.json({data:"hello world this is server ishaan"})
});


const port = process.env.PORT || 4000;

app.listen(port,function(){
    console.log(`Server is running on PORT : ${port}`)
});

