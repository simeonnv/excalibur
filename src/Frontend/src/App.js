import './App.css';
//import LoginSignup from './Components/Assets/LoginSignup/LoginSignup';
//import ClassroomDashboard from './Components/Assets/ClassroomDashboard/ClassroomDashboard';
import ClassroomDashboardTeacher from './Components/Assets/ClassroomDashboardTeacher/ClassroomDashboardTeacher';

// Когато искаш да пуснеш уеб сайта, остави само импорта на уеб сайта който ти трябва. може да коментираш тези които не ти трябват

// За да се Пусне уеб сайта, пишете npm start след като напишете cd src/Frontend

function App() {
  return (
    <div>
      <ClassroomDashboardTeacher/> 
    </div> // ^^^ Сменяш кои сайт да пуснеш
  ); 
}

export default App;
