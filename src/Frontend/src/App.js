import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoginSignup from './Components/Assets/LoginSignup/LoginSignup';
import ClassroomDashboard from './Components/Assets/ClassroomDashboard/ClassroomDashboard';
import ClassroomDashboardTeacher from './Components/Assets/ClassroomDashboardTeacher/ClassroomDashboardTeacher';

// Когато искаш да пуснеш уеб сайта, остави само импорта на уеб сайта който ти трябва. може да коментираш тези които не ти трябват

// За да се Пусне уеб сайта, пишете npm start след като напишете cd src/Frontend

function App() {
  return (
    <div>
      <ClassroomDashboard/> 
    </div> // ^^^ Сменяш кои сайт да пуснеш
  ); 
}

// do a npm install react-router-dom bc i cant do it
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<ClassroomDashboard/>}>
//           <Route path="login" element={<LoginSignup/>} />
//           <Route path="teacher" element={<ClassroomDashboardTeacher/>} />
//           {/* <Route path="*" element={<NoPage/>} /> add a 404 page */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;
