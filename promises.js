const doWprkPromise = new Promise((resolve, reject) =>{

    setTimeout(()=>{

    //    resolve([9,8,7]);
          reject('Some error occured !!!');
    },2000)

})

doWprkPromise.then((result,error) => {

    console.log('Success', result)
}).catch((error) =>{

    console.log("Error !!! ",error);
})