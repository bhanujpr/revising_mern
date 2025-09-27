import "./App.css";
import { Dashboard } from "./pages/DashBoard";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { useEffect } from "react";


function App() {
    useEffect(() => {
    if (!(window as any).twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
