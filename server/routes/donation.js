const express=require('express')
const DonationModel=require('../models/DonationModel');
const ChildrenModel = require('../models/ChildrenModel');
const router=express.Router()

router.get('/:id',async(req,res)=>{
    const temp=req.params.id;
    const userId=temp.slice(1)
    console.log(userId)
    try{

      const response=await DonationModel.find({userId:userId});
      const childData=[]
      await Promise.all(response.map(async(res)=>{
        const id=res.childId.toString()
        console.log(id)
        const child=await ChildrenModel.findById(id);
       // console.log(child)
        await childData.push(child)
       // console.log(res.childId.toString())
      }))
      return res.status(200).send({data:childData})
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).send("Server Error")
    }

})

router.post('/',async(req,res)=>{
    const {childId,userId}=req.body;
    console.log(req.body)
    try{
    const donate=new DonationModel({
            childId:childId,
            userId:userId
        })
     await donate.save();
     return res.status(200).send("Succesfully Added");
    }
    catch(error)
    {
     console.log(error)
     return res.status(400).send("Server Error")
    }


})

module.exports=router