require('../src/db/testMongoose');

const TaskModel = require('../src/models/taskModel');

// TaskModel.findOneAndDelete({ _id :'5cd5b17cff21ae49c40f7c4b'})
// .then((tasks) =>{

//     console.log(tasks);
//     return TaskModel.countDocuments({})
// }).then((count) =>{

//     console.log(count);
// }).catch((err) =>{

//     console.log(err);
// })

const DeleteTaskAndCount = async(id) =>{
   
    await TaskModel.findByIdAndDelete(id);
    const count = await TaskModel.countDocuments({});
    return count;
}

DeleteTaskAndCount('5cd5b17cff21ae49c40f7c4a').then((num) =>{
    console.log(num);

}).catch((err) =>{
    console.log(err);
})