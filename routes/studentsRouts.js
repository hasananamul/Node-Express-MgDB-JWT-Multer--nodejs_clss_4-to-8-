const express = require("express");
const {getData, getSingleData, postData, editData, deleteData} = require("../controllers/controlStudent");
// const {authUser} = require("../middleware/auth/authHandeler");
const router = express.Router();

// router.get("/students" , getData);
// router.get("/students/:id" , getSingleData);
// router.post("/students" , postData);
// router.put("/students/:id" , editData);
// router.patch("/students/:id" , editData);
// router.delete("/students/:id" , deleteData);

/**
 * Use of middleware
 */
// router.get("/",authUser,(req, res, next) => {
//       res.send('This request from middleware')
// })

/**
 * Use of routing system
 */
router.route("/").get(getData).post(postData);
router.route("/:id").get(getSingleData).put(editData).patch(editData).delete(deleteData)

module.exports = router;