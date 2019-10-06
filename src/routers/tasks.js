const express = require('express');
const router = new express.Router();
const taskModel = require('../models/taskModel');
const auth = require('../middleware/auth');

router.get('/testTask', (req,res) =>{

    res.send('This router is in a file tasks');
})

// ....................................................    TASKS    ...................................................................

router.post('/tasks' ,auth,async(req,res) => {                       // Posting the tasks resource

    const task = new taskModel({
        ...req.body,
        owner: req.user._id
    })

    try{
       await task.save();
        res.status(201).send(task);
    }
    catch(e){
        res.status(500).send(e);
    }
    // 
    // task.save().then(() =>{

    //     res.status(201).send(task);
    // }).catch((error) =>{

    //     res.status(400).send(error);
    // })
})

//GET /tasks?isCompleted
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:asc
router.get('/tasks',auth ,async (req,res)=>{                           // getting the tasks  
   
    const match = {}
    const sort = {}
    if(req.query.isCompleted){
        match.isCompleted = req.query.isCompleted === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        //const tasks = await taskModel.find({ owner : req.user._id});
        await req.user.populate({
            'path' : 'tasks',
             match ,
             options : {
                 limit : parseInt(req.query.limit),
                 skip: parseInt(req.query.skip),
                 sort 
             }
        }).execPopulate();
        res.status(200).send(req.user.tasks);
    }
    catch(e){
        res.status(500).send(e);
    }
    // taskModel.find({}).then((tasks) =>{
    //     res.send(tasks)
    // }).catch((error) =>{

    //     errObj= {
    //         hasError : true,
    //         error : error
    //     }
    //     res.status(500).send(errObj);
    // })
})


router.get('/task/:id',auth,async (req,res)=>{                       // getting individual tasks
    const _id = req.params.id;

    try {
        //const task = await taskModel.findById(_id);
        const task = await taskModel.findOne({_id , owner  : req.user._id});

        if(!task){
            res.status(404).send();
        }
        res.status(200).send(task);
    }
    catch(e){
        res.status(500).send(e);    
    }
    // taskModel.findById(_id).then((task) =>{
    //     if(!task){
    //         return res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((error) =>{

    //     errObj= {
    //         hasError : true,
    //         error : error
    //     }
    //     res.status(500).send(errObj);   
    // })
})

router.patch('/tasks/:id', auth,async(req,res) =>{                               // updating a task

    const updateTasks = Object.keys(req.body);
    const allowedTasks = ['isCompleted','description'];

    const isValidAOperation = updateTasks.every((task) =>{
        return allowedTasks.includes(task);
    })

    if(!isValidAOperation) {
        return res.status(400).send('The given values does not exist');
    }

    try{

        const task = await taskModel.findOne({ _id :req.params.id, owner :req.user._id})
      //  const task = await taskModel.findById(req.params.id);

        //const task = await taskModel.findByIdAndUpdate(req.params.id ,req.body , {new: true , runValidators:true})
        if(!task){
            return res.status(404).send();
        }
        updateTasks.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.status(200).send(task);
    }
    catch(e){
        return res.status(400).send(e);
    }
})

router.delete('/tasks/:id' ,auth, async(req,res) =>{                             // deleting a task

    try{
         //const delTask = await taskModel.findByIdAndDelete(req.params.id);
         const delTask = await taskModel.findOneAndDelete({_id : req.params.id , owner : req.user._id})
        if(!delTask){
            res.status(404).send("Not found ")
       }
       res.status(200).send(delTask);
    }

    catch(e){
         res.status(500).send(e);
    }
})

module.exports = router;