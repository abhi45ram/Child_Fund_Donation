import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp(){
  const [formData,setFormData]=useState({
    username:'',
    email:'',
    password:''
  })

  const navigate=useNavigate()

  

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(formData)
      console.log(formData)
      const res= await axios.post('https://child-fund.onrender.com/server/auth/signup', {formData});
      console.log(res)
      navigate('/')
      
    } catch (error) {
      console.error('Error occurred during signup:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};



export default SignUp;