const express = require("express");
const categoryRoutes = express.Router();
const uploadImg = require("../middlewears/uploadImg");
const categoryCltr = require("../controllers/categoryCltr");
const checkRole=require("../middlewears/checkRole")

// Route to create a new category (POST)
categoryRoutes.route("/createCategory")
    .post(checkRole(["Admin"]),uploadImg, categoryCltr.create);

// Route to get all categories (GET)
categoryRoutes.route("/getCategories")
    .get(checkRole(["Admin"]),categoryCltr.getCategories);

// Route to delete a category by ID (DELETE)
categoryRoutes.route("/deleteCategory/:categoryId")
    .delete(checkRole(["Admin"]),categoryCltr.deleteCategory);

// Route to update a category by ID (PUT)
categoryRoutes.route("/updateCat/:id")
    .put(checkRole(["Admin"]),categoryCltr.updateCategory);

// Route to update category image by ID (PATCH)
categoryRoutes.route("/updateImg/:id")
    .patch(checkRole(["Admin"]),uploadImg, categoryCltr.imageUpdate);

module.exports = categoryRoutes;
