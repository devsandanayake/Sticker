 import React, { Component } from 'react'
 import Home from './components/Home'
 import NavBar from './components/NavBar'
 import {BrowserRouter,Route, Routes} from 'react-router-dom'
 export default class App extends Component {
  render(){
   return (
     <div>
      <BrowserRouter>
      <NavBar/>
      <Routes>
     
      <Route exact path ="/" element={<Home/>}></Route>
      </Routes>
      </BrowserRouter>
     </div>
   )
  }
 }
 