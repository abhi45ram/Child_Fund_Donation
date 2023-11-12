import { useState,useEffect} from "react";
import cookie from 'js-cookie';
import axios from 'axios'
import Navbar from "../components/Navbar";
import react from 'react';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom';
import { createTheme, responsiveFontSizes,ThemeProvider } from '@mui/material/styles';

import {createMedia} from '@artsy/fresnel'


import {
    Typography,
    Grid,
    Box,
    makeStyles,
    Card,Button
  } from "@material-ui/core";
 
  const AppMedia = createMedia({
    breakpoints: { zero: 0, mobile: 849 }
  });

  const mediaStyles=AppMedia.createMediaStyle()
  const{Media,MediaContextProvider}=AppMedia;

  const useStyles = makeStyles(() => ({
    typo:
    {
        flexGrow:1,
        textAlign:"center",
        color:"black",
        fontWeight:510,
    },
    input:
    {
      width:"40%",
      height:"50%",
      marginTop:"4%"
    },
    date:
    {
      marginLeft:"50%",
    },
    Card: {
        width: 360,
        borderRadius:"10%",
        margin: 'auto',
      },
      Media: {
        height: 550,
        width: 310,
        objectFit: 'cover'
      }
  }));


function Main(){
    const [children,setChildren]=useState("");
    const classes = useStyles();
    const theme = createTheme();
    const [age,setAge]=useState('');
    const [gender,setGender]=useState('');
    const [location,setLocation]=useState('');
    const[check,setCheck]=useState(0)
    const navigate=useNavigate()
    useEffect(()=>{
     async function fetchChildren(){
     const res=await axios.get('https://child-fund.onrender.com/server/child')
     let array=res.data.data;
     const FilterByLocation=(array)=>{
      if(location!=="")
      {
        //console.log("fuck")
       return array.filter((index)=>index.location===location)
      }
      else
      {
       return array
      }
   }

   const FilterByGender=(array)=>{
    if(gender!=="")
    {
      //console.log(gender)
      
      return array.filter((index)=>index.gender===gender)
    }
    else
    {
      return array;
    }
  }

  const FilterByAge=(array)=>{
    if(age!=="")
    {
      //console.log(array)
       const ageArray=age.split('-');
       return array.filter((index)=>index.age>=Number(ageArray[0])&&index.age<=Number(ageArray[1]))
    }
    else
    {
      return array;
    }
  }
   setChildren(FilterByAge(FilterByGender(FilterByLocation(array))))
    console.log(res.data.data)
     }
     fetchChildren()
    },[check])
    
    const handle=()=>{
      if(check===0)
      setCheck(1)
      else
      setCheck(0)
    }

    const Choose=(id)=>{
     
       navigate(`/child/:${id}`)
    }
    return (<>
     <Navbar/>
     <style>{mediaStyles}</style>

    <MediaContextProvider>
<Media greaterThanOrEqual='mobile'>
<Box sx={{ flexGrow: 1 }}>
 
  <Grid container spacing={2} style={{marginTop:"3%"}} direction="row" justify="center" alignItems="center">
    <Grid item md={8} xs={8} sm={12}>
      <ThemeProvider theme={theme}>
      <Typography className={classes.typo} variant="h3" >Choose Your Child</Typography>
      </ThemeProvider>
    </Grid>
  
  </Grid>
</Box>
</Media>

<Media lessThan='mobile'>
<Box sx={{ flexGrow: 1 }}>
 
 <Grid container spacing={2} style={{marginTop:"3%"}} direction="row" justify="center" alignItems="center">
   <Grid item md={8} xs={8} sm={12}>
     <ThemeProvider theme={theme}>
     
     </ThemeProvider>
   </Grid>
   <Grid item md={4} xs={8}>
   <TextField id="outlined-basic" label="Search By Name" variant="outlined" />
   </Grid>
 </Grid>
</Box>
</Media>
</MediaContextProvider>


<Box sx={{flexgrow:1}}>
  <Grid container spacing={2} style={{marginTop:"2%"}}direction="row"
            justify="center"
            alignItems="flex-start">
    <Grid item xs={6} md={2}>
    <InputLabel id="demo-simple-select-standard-label" style={{marginLeft:"10%"}}>Location</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      label="Location"
      value={location}
      style={{marginLeft:"10%",width:"60%"}}
      onChange={(e)=>{setLocation(e.target.value)}}

    >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
      <MenuItem value={"Jabalpur"}>Jabalpur</MenuItem>
      <MenuItem value={"Indore"}>Indore</MenuItem>
      <MenuItem value={"Bhopal"}>Bhopal</MenuItem>
    </Select>
    </Grid>

    <Grid item xs={6} md={2}>
    <InputLabel id="demo-simple-select-standard-label-1" style={{marginLeft:"10%"}}>Age</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label-1"
      id="demo-simple-select-standard"
      label="Loctation"
      value={age}
      style={{width:"60%"}}
      onChange={(e)=>{setAge(e.target.value)}}
    >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
      <MenuItem value={"0-2"}>0-2</MenuItem>
      <MenuItem value={"2-4"}>2-4</MenuItem>
      <MenuItem value={"5-7"}>5-7</MenuItem>
      <MenuItem value={"Above 8"}>Above 8</MenuItem>
    </Select>
    </Grid>

    <Grid item xs={6} md={2}>
    <InputLabel id="demo-simple-select-standard-label-2" style={{marginLeft:"10%"}}>Gender</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label-2"
      id="demo-simple-select-standard"
      label="Property Type"
      value={gender}
      onChange={(e)=>{setGender(e.target.value)}}
      style={{width:"60%",marginLeft:"10%"}}
    >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
      <MenuItem value={"male"}>Male</MenuItem>
      <MenuItem value={"female"}>Female</MenuItem>
    </Select>
    </Grid>

    

   
    <Grid item xs={12} md={2} style={{marginTop:"2%"}}>
        <Button style={{marginLeft:"35%",marginRight:"40%",backgroundColor:"blue",color:"white"}} size="large" onClick={handle}>Search</Button>
    </Grid>
  </Grid>
</Box>

<Box sx={{flexGrow:1}}>
    <Grid container spacing={5}direction="row"
            justify="flex-start"
            alignItems="flex-start" style={{marginTop:"3%"}}>
        { children!==""&&children.map((index)=>(
        <Grid item xs={12} sm={6} md={4} >
        <Card className={classes.Card}xs={4}>
         <CardMedia
           component="img"
           height="220"
           image={index.picUrl}
           alt="">
         </CardMedia>
         <CardContent>
            <Typography style={{color:"purple",fontWeight:1000,fontFamily:"Poppins"}}variant="h6" component="div">
             {index.age} years old 
            </Typography>
            <Typography style={{fontFamily:"Poppins",fontWeight:1000}}variant="h5"component="div">
                {index.name}
            </Typography>
            <Typography style={{marginTop:"4%",color:"grey"}}variant="body2">
                {index.bio}
            </Typography>
            <br></br>
          
            <Button style={{marginLeft:"25%",backgroundColor:"blue",color:"white"}} size="large" onClick={()=>{Choose(index._id)}}>Choose Me</Button>
         </CardContent>
        
        </Card>  
        </Grid>
        ) 
       )}
    </Grid>
    
    
</Box>


</>
)
}

export default Main;

