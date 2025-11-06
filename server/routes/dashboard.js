const express=require('express')
const router=express.Router();
const dashboardController=require('../controllers/dashboardController')
const {isLoggendIn}=require('../middleware/checkAuth')

//Dashboard Routes

router.get('/dashboard',isLoggendIn,dashboardController.dashboard)



















module.exports=router;