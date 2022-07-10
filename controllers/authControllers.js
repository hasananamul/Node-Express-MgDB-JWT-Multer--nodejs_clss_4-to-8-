const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

/**
 * Admin login system 
 */
const adminAuthController = asyncHandler(async (req, res) => {
      const {password, email} = req.body;

      // Find user by email
      const loginData = await Admin.findOne({email});

      // Validate admin email
      if(!loginData){
            res.status(400).json({message : " Email not found !"})
      }
      else{
            if((await bcrypt.compare(password, loginData.password))){

                  const jwt_token = jwt.sign({id : loginData.id}, process.env.JWT_SECRET,{expiresIn : "1d"})
                  res.status(200).json({
                        id : loginData.id,
                        name : loginData.name,
                        cell : loginData.cell,
                        skill : loginData.skill,
                        location : loginData.location,
                        number : loginData.number,
                        token : jwt_token
                  })
            }else{
                  res.status(401).json({message : "Wrong password !"})
            }
      }

})

module.exports = {
      adminAuthController
}