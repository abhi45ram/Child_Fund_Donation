import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import "./SIngle.css";
import Navbar from '../components/Navbar';
import cookie from 'js-cookie'
import jwt_decode from 'jwt-decode';

function Single(){
  const tok=cookie.get("token")
  const decodedToken=jwt_decode(tok)
  console.log(decodedToken) 
  const [user,setUser]=useState(decodedToken.userId)
  const [child,setChild]=useState('');
  const id=useLocation()
  let loc=id.pathname.split("/")[2];
  let loc2=loc.split(':')[1];
  const [amount,setAmount]=useState(30);
  useEffect(()=>{
    async function fetchChildren(){
    const res=await axios.get(`http://localhost:4000/server/child/${loc2}`)
    setChild(res.data);
   //console.log(res.data.data)
    }
    fetchChildren();
  }, []);

  const handleCheckout = async () => {
    await axios.post(`http://localhost:4000/server/donation`,{userId:user,childId:loc2})
    const res = await axios.post(`http://localhost:4000/server/stripe/create-checkout-session`, { amount: amount});
    if (res.data.url) {
      window.location.href = res.data.url;
    } else {
      console.log('Error');
   }
  }
    

  return (
    <>
      <Navbar />
      <div className="container mb-3 about_container">
        <div className="container main_container d-flex justify-content-around flex-wrap">
          <div className="right_container mt-5">
            <img src={child?.picUrl} alt="child" className="child-image" />
          </div>
          <div className="left_container mt-5" style={{ width: 600 }}>
            <h2>{child?.name}</h2>
            <p style={{ color: 'black', letterSpacing: '.5px', marginTop: 2, lineHeight: 2 }}>{child?.bio}</p>

            <div>
              <h3>
                <span style={{ fontWeight: 'bold' }}>AGE:</span>
                <p style={{ display: 'inline', marginLeft: 5, marginBottom: 0, fontWeight: 'normal' }}>{child?.age}</p>
              </h3>
            </div>
            <div>
              <h3>
                <span style={{ fontWeight: 'bold' }}>GENDER:</span>
                <p style={{ display: 'inline', marginLeft: 5, marginBottom: 0, fontWeight: 'normal' }}>{child?.gender}</p>
              </h3>
            </div>
            <div>
              <h3>
                <span style={{ fontWeight: 'bold' }}>Location:</span>
                <p style={{ display: 'inline', marginLeft: 5, marginBottom: 0, fontWeight: 'normal' }}>{child?.location}</p>
              </h3>
            </div>
            <div>
              <h3>
                <span style={{ fontWeight: 'bold' }}>ID:</span>
                <p style={{ display: 'inline', marginLeft: 5, marginBottom: 0, fontWeight: 'normal' }}>{child?._id}</p>
              </h3>
            </div>
            <div className="search-bar mt-3">
            <input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e)=>{setAmount(e.target.value)}}
              
            />
          </div>
            <div className="btn_div mt-4">
              
              <Button
                variant="danger"
                onClick={() => {
                  handleCheckout();
                }}
                style={{ letterSpacing: '1px', border: 'none', borderRadius: 4,background: 'transparent',color:'black', background: '#9BE8E3', marginRight: 24 }}
              >
                Sponsor Me
              </Button>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
  }


export default Single;
