import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Search from '../Search/Search';

function App() {
  return (
    <div className='app'>
      <Header/>
      <div className='main'>
        <Routes>
          <Route path="" element={<Navigate replace to="/home"/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/search" element={<Search />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;
