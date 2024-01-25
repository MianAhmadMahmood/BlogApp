import express from 'express';
import AuthController  from '../controller/authcontroller.js';// Corrected import statement
import BlogController from '../controller/blogController.js';
import CategoryController from '../controller/categoryController.js'; 
import multer from 'multer';
import checkIsUserAuthenticated from '../middlewares/authMiddleWare.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/user/register", AuthController.userRegistration);
router.post("/user/Login", AuthController.userLogin);

// Protected routes

router.get("/get/allblogs", checkIsUserAuthenticated, BlogController.getAllBlogs);
router.post("/add/blog", upload.single("thumbnail"), checkIsUserAuthenticated, BlogController.addNewBlog);
router.get("/get/blog/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);

router.get("/get/categories", checkIsUserAuthenticated, CategoryController.getAllCategories);
router.post("/add/category", checkIsUserAuthenticated, CategoryController.addNewCategory);

export default router;
