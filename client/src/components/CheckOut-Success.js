import { useState ,useEffect} from "react";
import cookie from 'js-cookie'
import jwt_decode from 'jwt-decode';
import axios from 'axios'

function CheckOutSuccess(){
   const tok=cookie.get("token")
   const decodedToken=jwt_decode(tok)
   console.log(decodedToken) 
   const [user,setUser]=useState(decodedToken.userId)
   useEffect(()=>{
     async function sendMail()
     {
        await axios.post('https://child-fund.onrender.com/server/mail/sendMail',{userId:user})
     }
     sendMail()
   },[])
    return(
        <h2>Succesfully received your Donation</h2>
    )
}

export default CheckOutSuccess;