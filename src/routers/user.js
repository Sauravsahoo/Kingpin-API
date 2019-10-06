const express = require('express');
const router = new express.Router();
const userModel = require('../models/userModel');
const auth = require('../middleware/auth');
const multer = require('multer');
const { sendWelcomeEmail , sendCancelEmail } = require('../emails/account');

router.get('/test', (req,res) =>{

    res.send('This router is in a file users');
})
//..................................................Login/Logout  Users ...........................................................

router.post('/users/login' , async (req,res) =>{                    //Login User
    try {
        const user = await userModel.findByCredentials(req.body.email , req.body.password);
        const token = await user.generateAuthToken();
       // await user.save();
        res.send({user , token});
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});

router.post('/users/logout' , auth,async(req,res) =>{                //Logout User
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async(req,res) => {             //Logout All
  
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }

})
// ..................................................    USERS     ........................................................

router.post('/users' , async (req , res) =>{                       // Posting  user 

    const user = new userModel(req.body);

    try{
        await user.save();
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken();
        res.status(201).send({user , token});
    }
    catch(e){
        res.status(400).send(e);            // using async/await
    }
   
    // user.save().then(()=>{

    //     res.status(201).send(user);      // using promise
    // }).catch((error)=>{

    //     res.status(400).send(error)
    // })
})


router.get('/users/me' ,auth ,async (req,res) =>{                         // Getting users

    res.send(req.user);
    // userModel.find({}).then((users) =>{
    //     res.send(users);    

    // }).catch((error) =>{
    //     err= {
    //         hasError : true,
    //         error : error
    //     }
    //     res.status(500).send(err);
    // })
})


// router.get('/users/:id', async(req,res) =>{                        // getting individual users

//     const _id = req.params.id;
//     try{
//         const user = await userModel.findById(_id);
//         if(!user){
//             res.status(404).send();
//         }
//         res.status(200).send(user);
//     }
//     catch(e){
//         res.status(400).send(e);
//     }

    
    // userModel.findById(_id).then((user) =>{

    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user);

    // }).catch((error) =>{
    //     errObj = {
    //         hasError : true,
    //         error : error
    //     }
    //     res.status(500).send(errObj);
    // })
    //console.log(req.params);
// })

router.patch('/users/me' ,auth,async(req,res) =>{                              //  Update the User

    const updates = Object.keys(req.body);
    const alloweUpdates = ['name' , 'age' ,'email','password'];
    const isValidOperation = updates.every((update) =>{
        return alloweUpdates.includes(update);
    })
    if(!isValidOperation){
        return res.status(400).send('Invalid property to update');
    }

    try{
       // const user = await userModel.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
       // const user  = await userModel.findByIdAndUpdate(req.params.id , req.body , {new :true , runValidators : true});

        res.status(200).send(req.user);
    }catch(e){

        res.status(400).send(e);
        console.log(e);
      }
})

router.delete('/users/me' ,auth,async(req,res) =>{                                // Deleting the user
    try  {
        // const user = await userModel.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send();
        // }
        await req.user.remove();
        sendCancelEmail(req.user.email, req.user.name)
        res.status(200).send(req.user);
    }
    catch(e){
        res.status(400).send(e);
    }
})

const upload = multer({

    limits :{
        fileSize : 100000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a image document'));
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar' ,auth, upload.single('avatar') , async (req,res) =>{
    //console.log("line is coming")
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send();
},(error ,req, res,next) =>{
    res.status(400).send({
        error : error.message
    })
})

router.delete('/users/me/avatar' , auth, async (req,res) =>{
    req.user.avatar = undefined
    await req.user.save()
    res.send();
},(error ,req, res,next) =>{
    res.status(400).send({
        error : error.message
    })
})

router.get('/users/:id/avatar', async(req,res) =>{

    try {
        const user = await userModel.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error();
        }

        res.set('Content-Type' , 'image/jpg')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router;