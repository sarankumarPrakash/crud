
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import NewUser from './Pages/NewUser'
import ForgetPassowrd from './Pages/ForgetPassowrd'
import Home from './Pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassowrd />} />
        <Route path="/sign-up" element={<NewUser />} />
        <Route path="/home" element={<Home />} />
        
   
      </Routes>
    </Router>
  );
}

export default App;
