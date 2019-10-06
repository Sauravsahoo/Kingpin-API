//CRUD

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
const {MongoClient ,  ObjectID } = require('mongodb'); 

const ConnectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'KingPin';

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(ConnectionURL, {useNewUrlParser : true}, (error , client) =>{

    if(error){
        return console.log('Unable to connect database' + error);
    }

    console.log('Connected properly');

    const db = client.db(databaseName);

    db.collection('users').insertOne({
        _id : id,
        name : 'Shastry',
        age: 38
    },(error , result) =>{

        if(error){
            console.log('Unable to insert the user data correctly');
        }
        console.log(result.ops)
    })
    
//.......................................................................................................................
    // db.collection('users').insertMany([
    //     {
    //         name : 'Nitin',
    //         age: 24
    //     },
    //     {
    //         name: 'Aatrya',
    //         age : 23
    //     }
    // ],(error,result) =>{

    //     if(error){
    //         return console.log('Unable to insert documents');   
    //     }

    //     console.log(result.ops);
    // })  

    // .................................................................................................................


    // db.collection('tasks').insertMany([
    //     {
    //         DogName : 'Laby',
    //         age :3 ,
    //         breed:'labrador',
    //         status : true
    //     },
    //     {
    //         DogName :'Hasmukh',
    //         age : 2,
    //         breed: 'Huskey',
    //         status: false
    //     },
    //     {
    //         DogName: 'rotie',
    //         age : 4,
    //         breed : 'Rotwiller',
    //         status : true
    //     }
    // ],(error, result) => {

    //     if(error){

    //         return console.log('Unable to insert operations');
    //     }
    //     console.log(result.ops);
    // })

    //...................................................................................................................


})  
 