import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route, Link, Switch} from "react-router-dom";
// import { ThemeProvider } from '@mui/material';
// import theme from './styling/theme.js';

// components
import NavBar from "./components/navbar"

// pages
import Home from "./pages/Home";
// import About from "./pages/About";
import Quizzes from "./pages/Quizzes";
/*import Goals from "./pages/Profile";*/
import Careers from "./pages/Careers";
import Career from "./pages/Career";
import Register from './pages/Register';
import Quiz from './pages/QuizPage';
import NewQuiz from './pages/Quiz';
import Stories from './pages/Stories';
import Clusters from './pages/Clusters';
import AdminDashboard from './pages/AdminDashboard';
import CreateCodes from './pages/CreateCodes';
import Networking from './pages/Networking';

function App() {
  return (
    //            <Route path="/about" element={<About/>}/>
      <BrowserRouter>
        <NavBar/>
        {/* We can choose to use the custom theme at a later time when we have more time to explore the documnetation on component customization and overrides */}
        {/* <ThemeProvider theme={theme}> */}
        {/* <p className="py-3"/> */}
        <div  className=" ">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/quizzes" element={<Quizzes/>}/>
            <Route path="/quizzes/:id" element={<Quiz/>}/>
            <Route path="/quiz" element={<NewQuiz/>}/>
            {/*<Route path="/goals" element={<Goals/>}/>*/}
            <Route path="/careers" element={<Clusters/>}/>
            <Route path="/results" element={<Careers/>}/>
            <Route path="/careers/:id" element={<Career/>}/>
            <Route path="profile/careers/:id" element={<Career/>}/>
            {/* <Route path="/profile/:pathway" element={<CareersViaPath/>}/> */}
            <Route path="/stories" element={<Stories/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="admin_dashboard" element={<AdminDashboard/>}/>
            <Route path="create_codes" element={<CreateCodes/>}/>
            <Route path="/networking" element={<Networking/>}/>
          </Routes>
        </div>
        
        {/* </ThemeProvider> */}
      </BrowserRouter>

  );
}

export default App;
