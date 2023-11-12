const mongoose=require('mongoose')
const Schema=mongoose.Schema

const DonationSchema=new Schema({
    childId:{type:Schema.Types.ObjectId,ref:"Children"},
    userId:{type:Schema.Types.ObjectId,ref:"User"}

})


module.exports=mongoose.model("Donation",DonationSchema)
