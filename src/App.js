import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import EntryPage from './components/EntryPage';
import Home from './components/Home';
import UserModel from './components/UserModel';
import LoginModel from './components/LoginModel';
import Navbar from './components/Navbar';
import AboutPage from './components/AboutPage';

function App() {
 return (
    <Router>
     <Routes>
     <Route path="/" element={<EntryPage/>} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/signup' element={<UserModel/>}/>
      <Route path='/login' element={<LoginModel/>}/>
      <Route path='/navbar' element={<Navbar/>}/>
      <Route path='/AboutPage' element={<AboutPage/>}/>
     </Routes>
    </Router>
  );
}

export default App;
