const jwt_token = require("jsonwebtoken")
const adminModel=require("../../models/adminModel")
const expressAsyncHandler = require("express-async-handler")
// const {findById} = require("../../models/adminModel")

const authAdmin = expressAsyncHandler( async (req, res, next) => {
      if( await req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1]
            try{
                  const {id,iat,exp} = jwt_token.verify(token, process.env.JWT_SECRET)
                  req.users = await adminModel.findById(id)
                  next()
            }catch(error){
                  res.send({message : "Invalid token !"})
                  console.log(error);
            }            
      }else{
            res.send({message : "Token not found"})
      }
})

module.exports = {
      authAdmin
}