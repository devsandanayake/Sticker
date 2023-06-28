const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8080;


app.get("/", (req, res) => {
    res.send("upload file")
})


//connect to mongodb

const DB_URL ='mongodb+srv://dev:1234@mernapp.zwstxds.mongodb.net/Sticker?retryWrites=true&w=majority'

mongoose.connect(DB_URL)
 .then(()=>{
    console.log("DB connected")
 })
 .catch((err)=>{
    console.log("DB not connected",err)

 })

 //import routes
const User  = require('./routes/User')
const Post = require('./routes/post')

//app middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//routes middelware
app.use(User)
app.use(Post)

app.listen(PORT,()=>{
    console.log(`APP is running on ${PORT}`)
})