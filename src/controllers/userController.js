const UserModel = require('../models/UserModel');
const BlogModel = require('../models/BlogModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {checkUrl, checkMobile, checkName, checkEmail, checkPassword} = require('../validators/validation');
// const cloudinary = require('../db/cloudinary');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dbxc4uovd",
  api_key: "431386395759681",
  api_secret: "As8AHsQYZ5HADPTSQh8ddTI9wJ4",
});

const createUser = async (req,res) => {
    try{
      const data = req.body;
    //   const logoImage = req.files.image;
    //   console.log(logoImage);

        // const imageUrl =  await cloudinary.uploader.upload(logoImage.tempFilePath, (err, result) => {
        //     if(err){
        //       return err.message;
        // }
        // return result;
        // });
      const { fname, lname, userName, phone, password, email } = data;

      if (Object.keys(data).length < 1) {
        return res.status(400).send({ status: false, msg: "Give some data." });
      }

      if (!fname || !checkName(fname)) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "Name must contain only letters and check your name field",
          });
      }

      if (!lname || !checkName(lname)) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "Name must contain only letters and check your name field",
          });
      }

      if (!userName || !checkName(userName)) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "Name must contain only letters and check your name field",
          });
      }

      if (!phone || !checkMobile(phone)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter Your Mobile number" });
      };

      //Checking the phone number is in the Data =base or not
      const duplicatePhone = await UserModel.findOne({phone:phone});
      if(duplicatePhone){
        return res.status(400).send({status:false,msg:"This phone number is already present in the database"});
      };

      if (!email || !checkEmail(email)) {
        return res
          .status(400)
          .send({ status: false, msg: "Check your email." });
      }

      //checking user with this same email id in database or not
      const duplicateEmail = await UserModel.findOne({email:email});
      if(duplicateEmail){
        return res.status(400).send({status:false,msg:"This email is already registered"})
      };
    

      if (!password || !checkPassword(password)) {
        return res.status(400).send({
          status: false,
          msg: "Password must be 8 character long and contain 1 upper case, 1 lower case, 1 numeric character, 1 special character",
        });
      }

      let encryptedPassword = await bcrypt.hash(password, 10);
    
      let userRegisterDetails = {
        fname:fname,
        lname:lname,
        userName:userName,
        email:email,
        phone:phone,
        password:encryptedPassword,
      }
      const saveData = await UserModel.create(userRegisterDetails);
      
      res.status(201).send({status:false,msg:'successfull',data:saveData});
    }catch(error){
        console.log(error.message)
    }
};

const userProfile = async(req,res) => {
    try{
        let userId = req.params.id;
        // let userProfile = req.userLoggedIn;
        
        userId = userId.toString();
        const checkUser = await UserModel.findOne({_id:userId, isDeleated:false});
        if(!checkUser){
            return res.status(400).send({status:false,msg:"User Not Found!"})
        };
        let name = checkUser.fname + " " + checkUser.lname;

        let fetchBlogData = await BlogModel.find({userId:userId});
        

        let userObj = {
            name:name,
            username:checkUser.userName,
            email:checkUser.email,
            phone:checkUser.phone,
            active:true,
            blogs: fetchBlogData
        }
        return res.status(200).send({status:true,data:userObj});
    }catch(error){
        return res.status(500).send({status:false,error:error.message});
    };
}; 

// *********************************************Login api*****************************************************************

const userLogin = async (req,res) => {
    try{
        let loginCredentials = req.body;
        
        const {email, password} = loginCredentials;
        if(!email || !checkEmail(email)){
            return res.status(400).send({status:false,msg:"Enter a valid email"});
        };
        if(!password){
            return res.status(400).send({status:false,msg:"Enter Password!"});
        };
        const checkUserEmail = await UserModel.findOne({email:email});
        if(!checkUserEmail){
            return res.status(400).send({status:false,msg:"This Email is not Registered."});
        };
        
        let decryptPassword = await bcrypt.compare(password,checkUserEmail.password);
        if(!decryptPassword){
            return res.status(400).send({status:false,msg:"Password is incorrect"});
        };

        let token = jwt.sign({
            userId:checkUserEmail._id.toString(),
            email:checkUserEmail.email
        },"MERN-BLOG",{expiresIn:'24h'})

        return res.status(200).send({status:true,msg:"login successful",token:token,userId:checkUserEmail._id});

    }catch(error){
        res.status(500).send({status:false,msg:error.message})
    }
}

module.exports = {createUser, userLogin, userProfile}