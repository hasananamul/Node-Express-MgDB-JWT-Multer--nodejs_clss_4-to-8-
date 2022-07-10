const express = require("express");
const {adminAuthController} = require("../controllers/authControllers");
const {getAdmin, createAdmin, getSingleAdmin, deleteAdmin, updateAdmin, adminHome, adminProfile} = require("../controllers/controlAdmin");
const {authAdmin} = require("../middleware/auth/authHandeler");
const router = express.Router();


// Admin routing systems
router.post("/login", adminAuthController)
router.get("/home",authAdmin, adminHome)
router.get("/profile",authAdmin, adminProfile)

router.route("/").get(getAdmin).post(createAdmin)
router.route("/:id").get(getSingleAdmin).put(updateAdmin).patch(updateAdmin).delete(deleteAdmin)
module.exports = router;