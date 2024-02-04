const Category=require("../models/categoryModel")



const titleValidationSchema={
    title:{
        notEmpty:{
            errorMessage:"category title is required"
        },
        custom:{                                             //value will be that of title and if you want to access any other properties in req then destrucutre req as second arguments
            options:async(value,{req})=>{
                const category=await Category.findOne({ title: { $regex: new RegExp(value, 'i') }})
                if(!category){
                    return true                             //this is like next() it goes to the next function just like req,res,next()
                }else{
                    throw new Error("category already present")  //this will add to errors obj of express validators               
                }
            }
        }
    }
}

const descriptionSchema={
    description:{
        notEmpty:"Descprition is required"
    }
}


module.exports=categoryValidationSchema