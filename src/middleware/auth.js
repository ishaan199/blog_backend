const UserModel = require('../controllers/userController');
const jwt = require('jsonwebtoken');

const authentication = (req,res,next) => {
    try{
        let token = req.headers["x-api-key"];

        if(!token){
            return res.status(400).send({status:false,msg:"Token is missing."})
        };

        jwt.verify(token,"MERN-BLOG",(err,result)=>{
            if(err){
                return res.status(400).send({status:false,msg:"Failed Authentication"})
            };
            req.userLoggedIn = result.userId;
        })
        next();
    }catch(error){
        return res.status(500).send({status:false,msg:"auth",error:error.message});
    }
}

module.exports.authentication = authentication;