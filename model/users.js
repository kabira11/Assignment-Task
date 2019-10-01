const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')



var userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : "Full Name is required"
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : "Email is required",
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    password : {
        type : String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
{
   timestamps: true 
}
)

// mongoose middleware hash the plain text password before saving
userSchema.pre('save', async function (next) {
    //this is user object for using before save in db for bcrypt pass
    const user = this
    //Returns true if this document was modified, else false.
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password , 8)
    }

// console.log("just before saving")
// console.log(user)

    next()
})

userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({_id: user._id.toString()} , 'thisismynewcourse' ,{expiresIn: '7 days'})

    user.tokens = user.tokens.concat({token})

    //Store tokens while users login
    await user.save()
    return token
}

module.exports = mongoose.model('User' , userSchema);