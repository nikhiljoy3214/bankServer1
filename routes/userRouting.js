// IMPORT EXPRESS
const express=require('express')
// ---------------------------------
const logic=require('../controllers/logic')

// MIDDLEWARE IMPORT
const jwtMiddleware = require('../middleware/routerMiddleware')







// CREATE AN OBJECT FOR ROUTER CLASS IN EXPRESS -to set the path
const router=new express.Router()

// REGISTER
router.post('/bnankuser/user-register',logic.register)

// LOGIN
router.post('/bankuser/user-login',logic.login)

// USER PROFILE
router.get('/bankuser/user-profile/:acno',jwtMiddleware,logic.getProfile)

// BALANCE
router.get('/bankuser/user-balance/:acno',jwtMiddleware,logic.getbalance)

// MONEY TRANSFER

router.post('/bankuser/money-transfer',jwtMiddleware,logic.moneyTransfer)

// TRANSATION HISTORY
router.get('/bankuser/user-history/:acno',jwtMiddleware,logic.history)

// DELETE ACCOUNT
router.delete('/bankuser/user-delete/:acno',jwtMiddleware,logic.deleteAc)



// TO EXPORT ROUTER
module.exports=router  