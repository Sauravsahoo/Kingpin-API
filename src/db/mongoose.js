const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser : true,
    useCreateIndex : true
})


    const newPerson =  new User({
         name: "Rahul",
         age: 25,
         email: 'rahul@gmail.com',
         password:"thisisit"    
    })

    newPerson.save().then(() =>{    
        console.log(newPerson);
    })
    .catch((error) =>{
        console.log(error);
    })