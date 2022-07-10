const adminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs")
const asyncHandeler = require("express-async-handler")

const getAdmin = asyncHandeler( async (req, res) => {
      let data = await adminModel.find()
      res.status(200).json(data)
})

const getSingleAdmin = asyncHandeler(async (req, res) => {
      const id = req.params.id;
      const data = await adminModel.findById(id)
      res.status(200).json(data)
})

const createAdmin = asyncHandeler( async (req, res) => {
      const {name, email, cell, location, skill, username, password} = req.body;
      // Has password
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      if (!name || !email || !skill || !location || !cell || !username || !password){
            res.status(400).json({message : " All field are required !"})
      }else{
            await adminModel.create({
            ...req.body,
            password : hashPass
      })
      res.status(200).json({message : " Admin data created successful"})
      }     
})

const updateAdmin = asyncHandeler(async (req, res) => {
      const {name, email, cell, password, username, location, skill} = req.body
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      const id = req.params.id;

      if (!name || !email || !skill || !location || !cell || !username || !password) {
            res.status(400).json({message : " All field are required !"})
      }else{
            await adminModel.findByIdAndUpdate(id, {...req.body,password : hashPass}, {new : true})
            res.status(200).json({message : " Admin data update successful"})
      }
})

const deleteAdmin = asyncHandeler(async (req, res) => {
      const id = req.params.id ;
      // let deleted_data = adminModel.findById(id)
      await adminModel.findByIdAndDelete(id)
      res.status(200).json({message : " Admin data dlete successful"})
})

// admin home route
const adminHome =asyncHandeler( async (req, res) => {
     await res.json(req.users)
})

//Admin profile route
const adminProfile = asyncHandeler( async (req, res) => {
      await res.json(req.users)
})

module.exports = {
      getAdmin,
      getSingleAdmin,
      createAdmin,
      updateAdmin,
      deleteAdmin,
      adminHome,
      adminProfile
}