const mongoose = require("mongoose");

let student_model = mongoose.Schema({
      name : String,
      age : Number,
      skill : String,
      location: String
},{ timestamps : true })


module.exports = mongoose.model("students", student_model)