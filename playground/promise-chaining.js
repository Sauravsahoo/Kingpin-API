require('../src/db/testMongoose');
const User = require('../src/models/userModel');  

//5cd5b17cff21ae49c40f7c4a

// User.findOneAndUpdate({age:36} ,{
//     age : 50
// }).then((user) =>{
   
//     console.log(user);
//     return User.countDocuments({
//         age:50
//     }).then((result) =>{
//         console.log(result)
//     }).catch((e) =>{
//         console.log(e);
//     })
// })

const updateAgeAndCount = async (id ,age) =>{
    const user = await User.findOneAndUpdate(id , {age});
    const count = await User.countDocuments({age});
    return count;
}

updateAgeAndCount('5cc9c54721d9e40f441ad047', 2).then((num) =>{
    console.log(num);
}).catch((err) =>{
    console.log("error is "+err);
})