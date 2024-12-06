const express = require('express');
const app = express();
const sequelize = require('./util/database');






sequelize
.sync()
.then(result=>{
    app.listen(PORT, ()=>{
        console.log(`Listening on the server ${PORT}.`);
    })
})
.catch(err=> {
    console.log(err);
})