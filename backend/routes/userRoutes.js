const express = require("express");
const router = express.Router();
const {registerUser,authUser,updateUser,forgotPassword,resetPassword,userBorrowedBook}= require("../controller/userController")
const {protected} = require("../middleware/auth");

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/update').put(protected,updateUser);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').put(resetPassword);
router.route('/borrowed').get(protected,userBorrowedBook);

module.exports = router;