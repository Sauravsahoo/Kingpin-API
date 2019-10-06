const express = require('express');
require('./db/testMongoose');
// const userModel = require('./models/userModel');
// const taskModel = require('./models/taskModel');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');
const jwt = require('jsonwebtoken');
const  app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>{

    console.log(`The server is up on port ${port}`);
})
