const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRouter = require('./Routes/auth.route');
const resumeRouter = require('./Routes/resume.route');
const cors = require('cors');
const app = express();

app.use(cors());


const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',authRouter);
app.use('/',resumeRouter);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('MongoDB connected'))
    .catch((err)=>console.log(err));
})