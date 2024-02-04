const Counsellor=require("../models/counselorModel")
const {isMongoId}=require("express-validator")
const Profile=require("../models/profileModel")

const profileSchema={
    isEmpty:{
        errorMessage:"profile cannot be empty"
    },
    // isMongoId:{
    //     errorMessage:"invalid MongoId"
    // },
    custom:{
        options:async(value,{req})=>{
            const checkProfile=Profile.findOne(value)
            if(!checkProfile){
                throw new Error("profile not found")
            }else{
                return true
            }
        }
    }
}

const specializationSchema={
    isEmpty:{
        errorMessage:"specialization cannot be empty"
    }
}

const availabilitySchema={
    isEmpty:{
        errorMessage:"availability cannot be empty"
    },
}

const experiencesSchema={
    isEmpty:{
        errorMessage:"experiences cannot be empty"
    },
    // isNumeric   : {
    //     errorMessage: "Experiences should be a valid integer",
    // }
    
}

const consulationFees={
    isEmpty:{
        errorMessage:"consulation fees cannot be empty"
    }
}

const bioSchema={
    isEmpty:{
        errorMessage:"bio cannot be empty"
    },
   
}

const categories={
    isMongoId:{
        errorMessage:"invalid MongoId"
    },
    isEmpty:{
        errorMessage:"category cannot be empty"
    }
}

const achievementsSchema={
    isEmpty:{
        errorMessage:"achievements cannot be empty"
    }
}

const blogSchema={
    isEmpty:{
        errorMessage:"blog cannot be empty"
    }
}

const imageSchema={
    isEmpty:{
        errorMessage:"image cannot be empty"
    },
    custom:{
        options:async(value,{req})=>{
            if(req.file){
                return true
            }else{
                throw new Error("image cannot be empty")
            }
        }
    }
}

const languagesSchema={
    isEmpty:{
        errorMessage:"languages cannot be empty"
    }
}

const counselorDetailsValidationSchema={
    profile:profileSchema,
    specialization:specializationSchema,
    availability:availabilitySchema,
    experiences:experiencesSchema,
    consulationFees:consulationFees,
    bio:bioSchema,
    languages:languagesSchema,
    achievements:achievementsSchema,
}

module.exports=counselorDetailsValidationSchema