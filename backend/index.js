const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const cors=require("cors");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const path = require('path')
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user',userRoutes);
app.use('/api/book',bookRoutes);
//------------------------deployment----------------------------------

const __dirname1 = path.resolve();
if(process.env.NODE_ENV){
    app.use(express.static(path.join(__dirname1,'/frontend/build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname1,'/frontend/build/index.html'));
    })
}else{
    app.get('/',(req,res)=>{
        res.send('Server is running well...')
    })
}


//------------------------deployment----------------------------------

const port = process.env.PORT || 4000;

app.listen(port,console.log(`server started on port ${port}`));