const Category=require("../models/categoryModel")
const categoryCltr={}
const pick=require("lodash/pick")


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
        req.body.image = req.file.path
        const category = new Category(req.body)
        const savedCategory = await category.save()

        // Check if the category was not saved
        if (!savedCategory) {
            return res.status(401).json({
                message: "Category not saved"
            });
        }
        res.status(200).json({
            message: "Category Created Successfully"
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
        const allCategories = await Category.find()
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
        const categoryId = req.params.categoryId
        const deletedCategory = await Category.findByIdAndDelete(categoryId)
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
        })
    }
}


module.exports=categoryCltr