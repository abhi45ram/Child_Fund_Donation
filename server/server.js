const express=require('express')
const http=require('http');
const connectDb=require('./utilsServer/connectDb');
const auth=require('./routes/auth')
const child=require('./routes/children')
const mail=require('./routes/sendEmail')
const stripe=require('./routes/stripe')
const donation=require('./routes/donation');
require("dotenv").config({path:"./config.env"})
const PORT = process.env.PORT || 4000;
const app=express()
const cors=require('cors')

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: '*'
  };

async function bootstrap(){
   connectDb();
   app.use(cors(corsOptions))
   app.use(express.json());
   app.use("/server/auth",auth);
   app.use("/server/child",child);
   app.use("/server/mail",mail);
   app.use("/server/stripe",stripe)
   app.use("/server/donation",donation);
   return http.createServer(app).listen(4000);
}


bootstrap().then(console.log(`Server is running on port ${PORT}`)).catch(error=>{
    console.log(error);
})





