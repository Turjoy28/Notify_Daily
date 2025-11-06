const mongoose= require('mongoose')
const Schema=mongoose.Schema;

const noteSchema= new Schema({

    user:{
        type:Schema.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    createdAt:{
        type:String,
        default:Date.now,
    }
})


module.exports=mongoose.model('notes',noteSchema)