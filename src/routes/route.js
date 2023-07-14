const express = require('express');
const router = express.Router();

//MiddleWare
const auth = require('../middleware/auth');

const user = require('../controllers/userController');
const blogs = require('../controllers/blogController');

router.post('/createUser',user.createUser);
router.post('/login',user.userLogin);
router.post('/create/blog/:id',blogs.blogs);

router.get('/allblogs',blogs.allBloga);

router.get('/users/:id', user.userProfile);

router.put("/update/blogs/:blogId",blogs.updateBlogs);

router.delete("/delete/:id",blogs.deleteblogs)

module.exports = router;