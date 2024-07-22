import ReactDOM from "react-dom/client";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './Components/Assets/LoginSignup/LoginSignup';
import ProtectedRoute from './Components/Assets/Internet/ProtectedRoute';
import ClassroomDashboard from './Components/Assets/ClassroomDashboard/ClassroomDashboard';
import ClassroomDashboardTeacher from './Components/Assets/ClassroomDashboardTeacher/ClassroomDashboardTeacher';

// Когато искаш да пуснеш уеб сайта, остави само импорта на уеб сайта който ти трябва. може да коментираш тези които не ти трябват

// За да се Пусне уеб сайта, пишете npm start след като напишете cd src/Frontend

// function App() {
//   return (
//     <div>
//       <ClassroomDashboard/> 
//     </div> // ^^^ Сменяш кои сайт да пуснеш
//   ); 
// }

// do a npm install react-router-dom bc i cant do it
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignup/>} />
        <Route path="/" element={
          <ProtectedRoute>
            <ClassroomDashboard/>
          </ProtectedRoute>
        }/>
        <Route path="/teacher" element={
          <ProtectedRoute>
            <ClassroomDashboardTeacher/>
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
};

export default App;
