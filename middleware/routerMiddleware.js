const jwt=require('jsonwebtoken')
// MIDDLEWIRE
// A FUNCTION WITH 3 ARGUMENTS-

// CREATING MEDILEWAIRE

 const jwtMiddleware=(req,res,next)=>{
    // ACCESS TOKEN FROM REQUEST HEADER
    try{
        const token=req.headers['access_token'] //IF THERE IS NO TOKEN GETTING FROM HEADER RUNTIME ERROR WILL BE THERE
        // VALIDATE TOKEN USING VERIFY() METODE INSIDE THE JWT LIBARARY(WANT TO IMPORT THAT)
        jwt.verify(token,"secret123") //OUT PUT WILL BE TRUE/FALSE

        // IF TOKEN IS VERIFIED CONTINUE THE REQUEST- CALLING NEXT METHOD
        next()
    } 
    catch{
        res.status(404).json("Please login")
    }
}

module.exports=jwtMiddleware
