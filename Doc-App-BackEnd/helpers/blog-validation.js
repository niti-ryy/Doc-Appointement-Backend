const titleSchema={
    notEmpty:{
        errorMessage:"title name cannot be empty"
    }
}

const descriptionSchema={
    notEmpty:{
        errorMessage:"description cannot be empty"
    }
}

const counselorIdSchema={
    notEmpty:{
        errorMessage:"Counselor Id is required"
    },
    isMongoId:{
        errorMessage:"Invlaid Counselor ID",
        options:async(value)=>{
            const verifyId=await Profile.findOne({_id:value},{role:counselor})
            if(!verifyId){
                throw new Error ("Invalid")
            }else{
                return true
            }
        }
    }
}

const imageSchema={
    notEmpty:{
        errorMessage:"Image is required"
    }
}

const blogValidationSchema={
    title:titleSchema,
    description:descriptionSchema,
    image:imageSchema,
    counselorId:counselorIdSchema
}

module.exports=blogValidationSchema