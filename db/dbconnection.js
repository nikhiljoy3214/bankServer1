// DateBase Server Integration

const mongoose=require('mongoose')

// CONNECT WITH MONOGODB ATLAS
mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("______MongoDB Atls Connected______");
}).catch(()=>{
    console.log("______MongoDB  Connection Error______");
})