const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./taskModel')

const userSchema = new mongoose.Schema({

    name :{
        type: String,
        required : true,
        trim : true
    },
    
    email : {
        type : String,
        unique: true,
        required : true,    
        trim : true,
        lowercase : true,
        validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Must be a valid Email-ID');
                }
        }
    },

    password:{  
        type : String,
        required : true,
        minlength : 6,
        maxlength : 20000,
        trim : true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('Your password contains the word password !!! which is not permitted');
            }
            if(value.length < 6 || value.length > 20000){
                throw new Error('Your password length should match our criteria');
            }
        }
    },

    age : { 
        type:Number,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number');
            }
        }
    }  ,

    avatar :{
        type : Buffer
    },
    
    tokens : [{
        token:{
            type : String,
            required :true
        }
    }]
},{
    timestamps : true
});

userSchema.virtual('tasks', {
    ref : 'Task',
    localField : '_id',
    foreignField : 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function (){

    const user = this
    const userId = user._id.toString();
    const token = jwt.sign({ _id: userId} , process.env.JWT_SECRET);   
    user.tokens = user.tokens.concat({ token });    
    await user.save()
    return token
}

//Duplicate login check
userSchema.statics.findByCredentials = async(email , password) =>{

    const user = await User.findOne({ email });
    if(!user){
        throw new Error('Unable to login')  
    }

    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
        throw new Error('Unable to login')  
    }
    return user;
}

// Hashing the plane text password beforesaving
userSchema.pre('save', async function(next){
    
    const user = this;

    console.log('Just before saving the object');
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.pre('remove' , async function(next){
    const user = this
    await Task.deleteMany({owner :user._id})

    next()
})

const User = mongoose.model('User',userSchema);

module.exports = User;