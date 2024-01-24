const Profile=require("../models/profileModel")

const firstnameSchema={
    notEmpty:{
        errorMessage:"first name cannot be empty"
    }  
}
const lastNameSchema={
    notEmpty:{
        errorMessage:"last name cannot be empty"
    }
}
const passwordSchema={
    notEmpty:{
        errorMessage:"password is required"
    },
    isLength:{
        options:{min:8,max:128},
        errorMessage:"passwod should be between 8-128 characters"
    }

}
const phoneSchema={
    notEmpty:{
        errorMessage:"Number is required"
    },
    isLength:{
        options:{min:10,max:10},
        errorMessage:"Phone number should be 10 numbers"
    }
}

const emailSchema={
    notEmpty:{
        errorMessage:"Email is required"
    },
    isEmail:{
        errorMessage:"Invalid email format"
    },
    custom:{
        options:async(value)=>{
            const user=await Profile.findOne({email:value})
            if(user){
                throw new Error ("email is already registered")
            }else{
                return true
            }
        }
    }
}

const loginEmailSchema={
    notEmpty:{
        errorMessage:"Email cannot be empty"
    },
    custom:{
        options:async(value)=>{
            const user=await Profile.findOne({email:value})
            if(!user){
                throw new Error("This Email is not Registered")
            }else{
                return true
            }
        }
    }
}

const loginValidation={
    email:loginEmailSchema,
    password:passwordSchema
}

const userRegistrationValidation={
    firstName:firstnameSchema,
    lastName:lastNameSchema,
    email:emailSchema,  
    phone:phoneSchema,
    password:passwordSchema
}

module.exports={userRegistrationValidation,loginValidation}