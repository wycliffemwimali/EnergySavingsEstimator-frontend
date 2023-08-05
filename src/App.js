// import logo from './logo.svg';
import React from "react"; 
import './App.css';
import './component/Appbar'
import { BrowserRouter as Router } from 'react-router-dom';
import MiniDrawer from './component/Appbar';

function App() {
  return (
    <Router>
     <MiniDrawer/>
    </Router>
  );
}

export default App;
