const express = require("express");
const {urlencoded, json} = require("express");
const apps = express();
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.SERVER_PORT
const colors = require("colors");
const connectionDB = require("./config/mongoDB");
const multer = require("multer");
const path = require("path");
const {MulterError}=require("multer");

// Storage
const storage = multer.diskStorage({
      destination : (req, file, cb) => {
            cb(null, "./media/users")
      },
      filename : (req, file, cb) => {
            let extName = path.extname(file.originalname);
            let fileName = file.originalname.replace(extName, "_") + Date.now() + extName
            cb(null, fileName ) 
      }
})

const upload = multer({
      storage : storage,
      fileFilter : (req, file, cb) => {
            
            if(file.mimetype == "iamge/jpg" || file.mimetype == "image/png" || file.mimetype == "image/svg" || file.mimetype == "image/jpeg"){
                  cb(null, true)
            }else{
                  cb(new Error("Invalid files formate !"))
            }
      }
})


connectionDB()

//Use body data for position: 
apps.use(json())
apps.use(urlencoded({extended : false}))

apps.post("/upload",upload.array("upload_image") , (req, res) => {
      res.send("Uploaded");
})

// Default error handelers
apps.use((err,req, res, next) => {
      if(err){
            if(err instanceof MulterError){
                  res.status(500).send("there was an uploaded error !")
            }else{
                  res.status(500).send(err.message)
            }
      }else{
            res.send("Success")
      }
})

// Data routing from router folder
apps.use("/students", require("./routes/studentsRouts"))

// Admin file routing 
apps.use("/admin", require("./routes/adminRoutes"));

apps.listen(PORT, () => console.log(` This server is running on ${PORT} port`.america))