const path = require("path");
const fs = require("fs");
/**
 * load data model in coltrollers  for access mongoDB database  
 */
const studentModel = require('../models/studentModel');
const expressAsyncHandler = require("express-async-handler");

/**
 * Read data from students.json
 */
// const students = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/students.json")))


/**
 * 
 * New ID generator for post new data to json server
 */
// const newId = () => {
//       if(students.length > 0){
//             return Number(students[students.length - 1].id + 1)
//       }else{
//             return 1;
//       }  
// }

const getData = expressAsyncHandler(async (req, res) => {
      /**
       * Get data from mongoDB
       */
      const data = await studentModel.find();
      res.status(200).json(data);

      /**
       * Get data from jason server by express
       */
      // students.length > 0 ? res.status(200).json(students) : res.send("Any data not found !")
      })

const getSingleData = expressAsyncHandler( async (req, res) => {

      /**
       * Get single data from mongoDB database
       */
      const id = req.params.id;
      const singleDaya = await studentModel.findById(id)
      res.status(200).json(singleDaya)

      /**
       * Get single data from jason server by express
       */
      // if (students.some(data => data.id == id)){
      //      let singleData = students.find(data => data.id == id)
      //      res.status(200).json(singleData)
      // }else{
      //       res.send("Data not found !")
      // }
})

const postData = (req, res) => {

      const newData = req.body;
      studentModel.create({
            name : newData.name,
            age : newData.age,
            skill : newData.skill,
            location : newData.location
      })
      res.status(201).json({"message" : "Data added is successful"})

      /**
       * Create data to json server
       */
      //const newData = req.body;
      // students.push({
      //       id : newId(),
      //       ...newData
      // })
      // fs.writeFileSync(path.join(__dirname, "../data/students.json"), JSON.stringify(students))
      // res.send("Data added successfully")
}

const editData = expressAsyncHandler(async (req, res) => {

      /**
       * Edit mongoDB data 
       */
      const id = req.params.id;
      await studentModel.findByIdAndUpdate(id, req.body, {new : true})
      res.status(201).json({"message" : "Data edit successful"});


      /**
       * Edit jason server data 
       */
      // const id = req.params.id;
      // if(students.some(data => data.id == id)){
      //       students[students.findIndex(data => data.id == id)] = {
      //             id : Number(id),
      //             ...req.body
      //       }
      //        fs.writeFileSync(path.join(__dirname, "../data/students.json"), JSON.stringify(students))
      // }else{
      //       res.send("Your requested Data not found !")
      // }
})

const deleteData = expressAsyncHandler(async (req, res) => {
      /**
       * Delete data from mongoDB dataase
       */
      const id = req.params.id;
      let deleteData = studentModel.findById(id)
      await studentModel.remove(deleteData)
      res.status(200).json({"message" : "Data deleted succesful"})

      /**
       * Delete data from json server
       */
      // const id = req.params.id;
      // if(students.some(data => data.id == id)){
      //       let deletedData = students.filter(data => data.id != id);
      //       fs.writeFileSync(path.join(__dirname, "../data/students.json"), JSON.stringify(deletedData));
      //       res.status(200).json({"message" : "Data deleted succesfully"})
      // }else{
      //       res.send("Your requested data not found !")
      // }
})

module.exports = {
      getData,
      getSingleData,
      postData,
      editData,
      deleteData
}