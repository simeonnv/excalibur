import React from 'react';
import './App.css';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import Dropdown from './dropdown';
 

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Dashboard/>
      <Dropdown/>
    </div>
  );
}

export default App;
