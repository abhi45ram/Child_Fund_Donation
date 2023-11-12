import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/signup";
import Single from "./pages/Single";
import Testimonials from "./pages/Testimonial";
import CheckOutSuccess from "./components/CheckOut-Success";
import Donations from "./pages/Donations";

function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path="/main" element={<Main/>}/>
       <Route path="/signup" element={<SignUp/>}/>
       <Route path="/checkout-success" element={<CheckOutSuccess/>}/>
       <Route path="/"element={<Login/>}/>
       <Route path="/child/:id"element={<Single/>}/> 
       <Route path="/testimonials"element={<Testimonials/>}/>
       <Route path="/donations"element={<Donations/>}/>  
     </Routes>
   </BrowserRouter>
  );
}

export default App;
