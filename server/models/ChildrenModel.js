const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ChildrenSchema=new Schema({
   name:{type:String,required:true},
   age:{type:Number,required:true},
   location:{type:String,required:true},
   bio:{type:String},
   gender:{type:String},
   disease:{type:String},
   picUrl:{type:String}
})

module.exports=mongoose.model('Children',ChildrenSchema)