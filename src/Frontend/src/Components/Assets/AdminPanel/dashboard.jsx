
import Dropdown from './dropdown';

function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="stats-container">
        <div className="stat-box">Success: <br />6.00</div>
        <div className="stat-box">Active Assignments: <br /> 196</div>
        <div className="stat-box">Missed Assigments: <br />19</div>
        <div className="stat-box">Done: <br />5</div>
      </div>
      <div className="chart-container">
        <h3>Classes</h3>
        <input type="text" placeholder="Search" />
        <div className="chart">
        <Dropdown title="Teachers" items={['Teacher 1', 'Teacher 2', 'Teacher 3']} />
        <Dropdown title="Students" items={['Student 1', 'Student 2', 'Student 3']} />
        <Dropdown title="Assignments" items={['Assignment 1', 'Assignment 2', 'Assignment 3']} />
        <Dropdown title="Classes" items={['Class 1', 'Class 2', 'Class 3']} />
        </div> 
      </div>
    </div>
  );
}

export default Dashboard;
