const express=require('express');
const nodemailer=require('nodemailer');
const router=express.Router();
const UserModel=require('../models/UserModel')

const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'gtaloveraaryan@gmail.com',
        pass:'rtvcfrkvdqyadsfc'
    }

});

router.post('/sendMail',async(req,res)=>{
    const{userId}=req.body;
   // console.log(req);
    const resp=await UserModel.findById(userId);

    const mailOptions = {
        from: 'gtaloveraaryan@gmail.com',
        to: `${resp.email}`,
        subject: 'Donation Succesfull',
        text: `Dear ${resp.name} your donation on our application. ChildFund has been succesfully received. We thank you for your contribution towards a better society`
      };

      transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            //console.log(error);
            res.status(500).send('Error Sending Email');
        }
        else{
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
      })
})

module.exports=router;