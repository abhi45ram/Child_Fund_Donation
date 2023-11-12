import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import cookie from 'js-cookie';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginRight: theme.spacing(70),
    display: "flex",
  },
  navButtons:{
    display:"flex",
    marginLeft: theme.spacing(-50),
   
  },
  Buttons:{
   marginRight:theme.spacing(10),
  },
 logo: {
    flexGrow: "0.7",
    cursor: "pointer",
    color:"black",
  },
  imglogo:{
   width:"7%",
   height:"4%",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    marginLeft: theme.spacing(14),
    "&:hover": {
      color: "blue",
      borderBottom: "1px solid blue",
    },
  },
}));



function Navbar() {
  const classes = useStyles();
  const navigate=useNavigate()
  const logOut=()=>{
    cookie.remove("token")
    navigate('/')
  }

  return (
    <>
    <AppBar style={{backgroundColor:"#9BE8E3"}}position="static" className="nav">
      <CssBaseline />
      <Toolbar>
       
          <Link to="/main" className={classes.link}>
            <Typography variant="h4" className={classes.logo}>
              Child Fund
            </Typography>
          </Link>
          <div className={classes.navlinks}>
            <Link to="/testimonials" className={classes.link}>Testimonials</Link>
            <Link to="/donations" className={classes.link}>Your Donations</Link>
            <Link to="/main" className={classes.link}>Home</Link>
          </div>
          <div className={classes.navButtons}>
            <Button style={{backgroundColor:"blue",color:"white"}}className={classes.Buttons} onClick={logOut} variant="contained"size="large">Logout</Button>
            
          </div>
      </Toolbar>
    </AppBar>
    
    </>
  );
}
export default Navbar;