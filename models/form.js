const mongoose=require('mongoose')
//Form Schema
const formSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type:String,
    },
    mobileNumber:{
        type: String,
    },
    Interested:{
        type:String,
    },
    tattoo:{
        type:String,
    },  
})
//Schema Models
const Form=mongoose.model('Form',formSchema)
module.exports=Form;