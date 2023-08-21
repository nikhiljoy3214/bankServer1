// IMPORT jsonwebtoken
const jwt= require('jsonwebtoken')
// IMPORT MODEL TO ACCESS DB
const users = require("../models/modelcollection")


// LOGIC FOR REGISTER (HAVE TO CREATE IN A FUNCTION TYPE)
const register=(req,res)=>{
    // access data from body
    const acno=req.body.acno
    const uname=req.body.uname
    const psw=req.body.psw

    // check acno is present in users collection
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(401).send("User already exits")
        }
        else{
            // register user -create a new object for user
            var newUser=new users({
                acno,
                uname,
                psw,
                balance:0,
                transactions:[]
            })

            // save the object in collection
            newUser.save()
            // response send .... json() -convert js data into json type and send
            res.json(newUser)
        }
    })
    
}

// LOGIC FOR LOGIN
const login=(req,res)=>{
    // destructure model accesing
    const {acno,psw}=req.body
    users.findOne({acno,psw}).then(user=>{
        if(user){
            // TOKEN GENERATION
            var token=jwt.sign({acno},"secret123")
            // user["token"]=token
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,token
            })
        }
        else{
            res.status(401).json("Incorrect Username Or Password")
        }
    })
}

// LOGIC TO GET PROFILE DATA
const getProfile=(req,res)=>{
    // access acno param from url req
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname
            })
        }
        else{
            res.status(400).json("user not exist")
        }
    })
}

// LOGIC FOR GET ACCOUNT BALANCE

const getbalance=(req,res)=>{
    const acno=req.params.acno
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,
                balance:user.balance
            })
        }
        else{
            res.status(400).json("user not exist")
        }
    })
}

// ========================================================================================================================

// LOGIC FOR MONEY TRANSFER

const moneyTransfer=(req,res)=>{
    // ACCESS ALL DATA FROM BODY
    const{fromAcno,toAcno,psw,amount,date}=req.body

    // CONVERT AMOUNT TO NUMBER
    var amnt=parseInt(amount)

    // CHECK FROM USER IN DB
    users.findOne({acno:fromAcno,psw}).then(fromUser=>{
        if(fromUser){
            // check for toUser
            users.findOne({acno:toAcno}).then(toUser=>{
                if(toUser){
                    // form balance check
                    if(amnt<=fromUser.balance){
                        fromUser.balance-=amnt
                        fromUser.transactions.push({type:"DEBIT",amount:amnt,date,user:toUser.uname})
                        fromUser.save()

                        toUser.balance+=amnt
                        toUser.transactions.push({type:"CREDIT",amount:amnt,date,user:fromUser.uname})
                        toUser.save()

                        res.status(200).json({message:"Transaction Sucess"})

                    }
                    else{
                        res.status(401).json({message:"Insufficent Balance"})
                    }

                }
                else{
                    res.status(401).json({message:"Invalid credit credentials"})
                }
            })

        }
        else{
            res.status(401).json({message:"Invalid debit credentials"})
        }
    })


}

// logic to transation history
const history=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json(user.transactions)
        }
        else{
            res.status(400).json("user not exist")
        }
    })
}

// LOGIC TO DELETE ACCOUNT
const deleteAc=(req,res)=>{
    const {acno}=req.params
    users.deleteOne({acno}).then(user=>{
        if(user){
            res.status(200).json("Account deleted sucessfully")
        }
        else{
            res.status(400).json("Account not deleted")
        }
    })
}

// ========================================================================================================================


// TO EXPORT
module.exports={
    register,login,getProfile,getbalance,moneyTransfer,history,deleteAc
}