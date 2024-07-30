const express = require("express");
const router = express.Router();
const {registerUser,authUser,updateUser,forgotPassword,resetPassword,userBorrowedBook,userDetailsSearch, uploadImg}= require("../controller/userController")
const {protected} = require("../middleware/auth");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/update').put(protected,updateUser);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').put(resetPassword);
router.route('/borrowed').get(protected,userBorrowedBook);
router.route('/search/:searchitem').get(protected,userDetailsSearch);
router.route('/uploadImg').post(protected,upload.single('image'),uploadImg);

module.exports = router;