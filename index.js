// IMPORT EXPRESS
const express=require('express')

// IMPORT ENV FILE
require('dotenv').config()

// IMPORT COES
const cors=require('cors')

// IMPORT DB CONNECTION
require('./db/dbconnection')

// IMPORT ROUTE
const router=require('./routes/userRouting')

// CREATE SERVER USING EXPRESS
const server=express()

// CONNECT WITH FRONT-END
server.use(cors())

// TO CONVERT ALL INCOMMING JSON TYPE DATA INTO JS
server.use(express.json())

// tell server to use router
server.use(router)

server.get('/getpath/user',(req,res)=>{
    res.send("Get request response")
})

server.get('/getpath/user/lastuser',(req,res)=>{
    res.send("Get request response 2")
})


// PORT SET
const port=3003 || process.env.port

// RUNNING CONFIGURE
server.listen(port,()=>{
    console.log(`__________Server Started at the ${port}_________p` );
})