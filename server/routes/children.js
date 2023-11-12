const express=require('express');
const router=express.Router();
const ChildrenModel=require('./../models/ChildrenModel');
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";
router.post('/',async(req,res)=>{
    try{
    const {name,age,bio,disease,location,gender,picUrl}=req.body.child;
    let child=new ChildrenModel({
        name,
        age,
        bio,
        gender,
        disease,
        location,
        picUrl
    })

    await child.save();
    res.status(200).send("Succesfully added Child");
}
catch(err)
{
    console.log(err)
    res.status(401).send("Server Error");
}
})

router.get('/',async(req,res)=>{
    try{
    const details=await ChildrenModel.find();
   // console.log(details)
    res.status(200).send({data:details});

    }
    catch(error)
    {
        res.status(401).send("Server Error");
    }

})

router.get('/:id',async(req,res)=>{
    try{
        const details=await ChildrenModel.findById(req.params.id);
       // console.log(details)
        res.status(200).json(details);
    }
    catch(error)
    {
        res.status(401).send("Server Error");
    }
})

module.exports=router;