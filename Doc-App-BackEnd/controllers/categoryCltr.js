const Category = require("../models/categoryModel");
const pick = require("lodash/pick");
const mongoose = require("mongoose");

const categoryCltr = {};

// Create a new category
categoryCltr.create = async (req, res) => {
    try {
        // Check if a file is received in the request
        if (!req.file) {
            return res.status(401).json({
                message: "Invalid file or file not received"
            });
        }
        // Assign the file path to the 'image' property in the request body
        req.body.image = req.file.path;

        const category = new Category(req.body);
        category.createdAt = Date().split(" ").slice(1, 5).join(" "); // Extract date info
        const savedCategory = await category.save();

        // Check if the category was not saved
        if (!savedCategory) {
            return res.status(401).json({
                message: "Category not saved"
            });
        }
        res.status(200).json({
            message: "Category Created Successfully",
            category: savedCategory
        });
    } catch (e) {
        res.status(500).json({
            message: "Server Error",
            error: e.message
        });
    }
};

// Get all categories
categoryCltr.getCategories = async (req, res) => {
    try {
        const allCategories = await Category.find();
        // Check if no categories are found
        if (allCategories.length === 0) {
            return res.status(404).json({
                message: "No Categories Found"
            });
        }
        return res.status(200).json({
            message: "Categories Fetched Successfully",
            categories: allCategories
        });
    } catch (e) {
        return res.status(500).json({
            message: "Server Error",
            error: e.message
        });
    }
};

// Delete a category by ID
categoryCltr.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        // Check if the category was not found for deletion
        if (!deletedCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        // Respond with success after successfully deleting the category
        return res.status(200).json({
            message: "Category Deleted Successfully",
            deletedCategory // Optionally, send the deleted category in the response
        });
    } catch (e) {
        return res.status(500).json({
            message: "Server Error",
            error: e.message
        });
    }
};

// Update a category by ID
categoryCltr.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(201).json({
            message: "Category Updated successfully",
            updatedCategory: updatedCategory
        });
    } catch (e) {
        return res.status(500).json({
            message: "Server Error",
            error: e.message
        });
    }
};

// Update category image by ID  
categoryCltr.imageUpdate = async (req, res) => {
    // Check if file is uploaded
    if (!req.file) {
        return res.status(401).json({
            message: "Image not Uploaded"
        });
    }
    try {
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { image: req.file.path },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(201).json({
            message: "Category Image Updated successfully",
            updatedCategory: updatedCategory
        });
    } catch (e) {
        return res.status(500).json({
            message: "Server Error",
            error: e.message
        });
    }
};

module.exports = categoryCltr;
