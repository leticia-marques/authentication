const   express = require("express");
const   res = require("express/lib/response");
const   mongoose = require('mongoose') ;
const   app = express();
const   dotenv = require('dotenv');
const postRoute = require("./routes/post")
//importing routes
const   authRoute = require('./routes/auth');

//Password Variable
dotenv.config();

//connect to database
mongoose.connect(process.env.DB_CONNECT, () =>{
    console.log("Connected to DB");
});

//Middleware
app.use(express.json());

//Routes middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.listen(8080, ()=>{
    console.log("Works");
})