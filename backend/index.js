const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
//const cors=require("cors");
//const {storage} = require("./config/firebase");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/book',bookRoutes);
const port = process.env.PORT || 4000;

app.listen(port,console.log(`server started on port ${port}`));