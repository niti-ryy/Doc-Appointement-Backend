const express = require("express");
const categoryRoutes = express.Router();
const uploadImg = require("../middlewears/uploadImg");
const categoryCltr = require("../controllers/categoryCltr");

// Route to create a new category (POST)
categoryRoutes.route("/createCategory")
    .post(uploadImg, categoryCltr.create);

// Route to get all categories (GET)
categoryRoutes.route("/getCategories")
    .get(categoryCltr.getCategories);

// Route to delete a category by ID (DELETE)
categoryRoutes.route("/deleteCategory/:categoryId")
    .delete(categoryCltr.deleteCategory);

// Route to update a category by ID (PUT)
categoryRoutes.route("/updateCat/:id")
    .put(categoryCltr.updateCategory);

// Route to update category image by ID (PATCH)
categoryRoutes.route("/updateImg/:id")
    .patch(uploadImg, categoryCltr.imageUpdate);

module.exports = categoryRoutes;
