const mongoose = require("mongoose")

const userSchema=new mongoose.Schema(
    {
        name:{type:String,
            required:true,
            trim:true},
        email:{type:String,
            required:true,
            unique:true,
            lowercase:true},
        password:{type:String,
            required:true,
            minlength:6},
        role:{type:String,
            required:true,
            enum:["customer","admin"],
            default:"customer"},
        created_at:{type:Date,
            default:Date.now
        }
        }
)
module.exports=mongoose.model("User",userSchema);
