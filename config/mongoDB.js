const mongoose = require("mongoose");
const connectionLink = process.env.CONNECTION_LINLK
const expressAsyncHandler = require("express-async-handler");

const connectionDB = expressAsyncHandler( async () => {
      
      try{
            let = connect = await mongoose.connect(connectionLink)
            console.log(` This serevr is connected to mongoDB database on url ${ connect.connection.host.america }`);
      }
      catch(error){
            console.log(error);
      }
})
module.exports = connectionDB;