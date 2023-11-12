const mongoose=require('mongoose')

async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("MongoDB Connected");
    }
    catch(error)
    {
        console.error(error);
    }
}

module.exports=connectDb;