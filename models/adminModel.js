const mongoose = require("mongoose");
const AdminModel = mongoose.Schema({
      name : {
            type : String,
            required : [true, "Name field are required !"]
      },
      email : {
            type : String,
            required : [true, "Email field are required !"],
            unique : true
      },
      cell : {
            type : String,
            required : [true, "cell field are required !"],
            unique : true
      },
      username : {
            type : String,
            required : [true, "Username field are required !"],
            unique : true,
            minLength : 5,
            maxLength : 10,
            lowercase : true

      },
      skill : {
            type : String,
            required : [true, "Skill field are required !"],
      },
      location : {
            type : String,
            required :false,
            default : "Dhaka"
      },
      password : {
            type : String,
            required : [true, "Email field are required !"],
      }
},{
      timestamps : true
})

module.exports = mongoose.model("admin", AdminModel )