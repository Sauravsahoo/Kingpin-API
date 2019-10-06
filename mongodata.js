const { MongoClient, ObjectID} = require('mongodb');
    
const connectionURL = 'mongodb://127.0.0.1:27017';

const databaseName = 'KingPin';

MongoClient.connect(connectionURL , {useNewUrlParser:true}, (error,client)=>{

    if(error){
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);       
    
//...........................................................................................................................................
    // db.collection('users').findOne({ _id: new ObjectID("5cd688e9fcc1234df42fb2ec")},(error,user) =>{

    //     if(error){
    //         return console.log('Storage failed '+error);
    //     }

    //     console.log(user);
    // })
//.........................................................................................................................................
    // db.collection('users').find({age:36}).toArray((error,users) =>{

    //     if(error){
    //         return console.log('unable to find '+error)
    //     }

    //     console.log(users);
    // })

//......................................................................................................................................
    // db.collection('users').find({age:36}).count((error,count) =>{

    //     if(error){
    //         return console.log('unable to find '+count)
    //     }

    //     console.log(count);
    // })

//.............................................................................................................................

    // db.collection('tasks').find({status : "false"}).toArray((error,users)=>{

    //     if(error){
    //         console.log('some error')
    //     }

    //     console.log(users)
    // })
 //....................................................................................................................................

    //   db.collection('users').updateOne({
    //         _id : new ObjectID('5cc9c54721d9e40f441ad047')
    //     },{
    //         $inc : {
    //             age: 1
    //         }   
    //     }).then((result) =>{

    //         console.log(result);
    //     }).catch(()=>{  

    //         console.log(error);
    //     })

//......................................................................................................................................

    // db.collection('tasks').updateMany({

    //     status : true
    //     },{
    //         $set:{
    //             status : false
    //         }
    //     }).then((result) =>{

    //         console.log(result.modifiedCount);
    //     }).catch((error)=>{

    //         console.log(error);
    //     })

    //....................................................................................................................................

    db.collection('users').deleteMany({
        age : 26
    }).then((result) =>{

        console.log(result);
    }).catch((error) =>{

        console.log(" ERROR "+error)
    })
})  