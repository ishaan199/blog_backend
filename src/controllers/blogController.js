const BlogModel = require('../models/BlogModel');
const UserModel = require('../models/UserModel');

const createBlog = async (req,res) => {
    try{
        const blogData = req.body;
        const userId = req.params.id;
        const {title,description} = blogData;
        
        let tokenUserId = req.userLoggedIn;
        
        if(!title){
            return res.status(400).send({status:false,msg:"Please Enter A Title."});
        };
        if(!description){
            return res.status(400).send({status:false,msg:"Please Enter Data For The Blog."})
        };

        // if(!(userId === tokenUserId) ){
        //     return res.status(400).send({status:false,msg:"Not a valid user."})
        // };

        //check the user with the userId
        let checkUser = await UserModel.findOne({_id:userId});

        if(!checkUser){
            return res.status(400).send({status:false,msg:"User is not logged-In"})
        };
        
        const data = {
          userId: userId,
          title: title,
          description: description,
          isDeleted: false
        };

        let saveData = await BlogModel.create(data);

        return res.status(201).send({status:true,data:saveData});
    }catch(error){
        return res.status(500).send({status:false,mag:"blogs",error:error.message});
    };
};

const allBlogs = async (req,res) => {
    try{
        let alldata = await BlogModel.find({isDeleted:false});
        res.status(201).send({status:true,data:alldata});
    }catch(error){
        return res.status(500).send({status:false,error:error.message});
    };
};

const updateBlogs = async (req,res) => {
    try{
        let blogid = req.params.blogId;
        let title = req.body.title;
        let description = req.body.description;

        let updateObj = {};

        if(title){
            updateObj.title = title;
        }
        if(description){
            updateObj.description = description;
        }

        //finding and updating blog from the blog db using blogId
        const checkBlog = await BlogModel.findOneAndUpdate(
          { _id: blogid },
          {
            $set: {
              title: updateObj.title,
              description: updateObj.description,
            },
            $currentDate: { lastUpdated: true },
          }
        );
       
        return res.status(200).send({status:true,data:checkBlog});
        
    }catch(error){
        return res.status(500).send({status:false,error:error.message});
    };
};

const deleteBlogs = async (req,res) => {
    try{
        let blogid = req.params.id;

        let checkBlog = await BlogModel.findOne({_id:blogid});
        if(checkBlog.isDeleted === true){
            return res.status(400).send({status:false,msg:"this blog is already deleted"});
        };
        let getBlogById = await BlogModel.findOneAndUpdate({_id:blogid},{$set:{isDeleted:true}});
        return res.status(200).send({status:true,msg:"Delete Successful!.",data:getBlogById});
    }catch(error){
        return res.status(500).send({status:false,error:error.message});
    };
};


module.exports.blogs = createBlog;
module.exports.allBloga = allBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deleteblogs = deleteBlogs


// black 2017