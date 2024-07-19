import React, { useState } from "react";
import './ClassroomDashboardTeacher.css';

const ClassroomDashboard = () => {
    

    const [divs, setDivs] = useState([]);

    const addDiv = () => {
      setDivs([...divs, <div key={divs.length} className="box"></div>]);
    };


    const [ Modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!Modal)
    };

    if(Modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }
    
      const [ Modal5, setModal5] = useState(false);
      const toggleModal5 = () => {
          setModal5(!Modal5)
      };
  
      if(Modal5) {
          document.body.classList.add('active-modal5')
        } else {
          document.body.classList.remove('active-modal5')
        }

    return (
        <div>
            <div className="container">
                <div className="sidebar">
                <div className="first-sidebar">
                    <div className="profile-picture"><img src={require("./media/hris.jpg")} alt="" /></div>
                    <div className="name-class">
                        <div id="fname">[First Name]</div>
                        <div id="lname">[Last Name]</div>
                        <div id="user">[E-mail]</div>
                        <button className="btn-modal" onClick={toggleModal}>Edit</button>
                    </div>
                </div>
                    <div id="line-break"><hr/></div>
                    <div className="sidebar-buttons">
                    <img src="" alt=""/><button className="btn-modal5" onClick={toggleModal5}>Create Assignment</button>
                    <img src="" alt=""/><button>Active Assignments</button>
                    <img src="" alt=""/><button>Grades</button>
                    <img src="" alt=""/><button>Classes</button>
                    </div>
                </div>
                <div className="container1">
                    <div className="classrooms">
                        <div className="classroom1">
                            <div className="title-caption">
                                <h4>Javascript class</h4>
                            </div>
                        </div>
                        <div className="classroom2">
                            <div className="title-caption">
                                <h4>Lua class</h4>
                            </div>
                        </div>
                        <div className="classroom3">
                            <div className="title-caption">
                                <h4>C# class</h4>
                            </div>
                        </div>
                    </div>

                    <div className="line-break1">
                        <hr/>
                    </div>
                    <div className="assignments">
                        {divs}
                    </div>
                </div>

                {Modal && (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-content">
                        <h2>Edit your profile</h2>
                        <p>
                            Enter your new e-mail
                        </p>
                        <input type="text" placeholder="E-mail" id="email-input" />
                        <p>
                            Upload your profile picture
                        </p>
                        <p>Choose a file</p>
                        <input type="file" id="file-upload"></input>
                        <button className="close-modal" onClick={toggleModal}>
                        X
                        </button>
                        <button className="save-modal" onClick={toggleModal}>
                        Save
                        </button>
                    </div>
                </div>
                )}
                {Modal5 && (
                <div className="modal5">
                    <div className="overlay"></div>
                    <div className="modal-content5">
                        <h2>Create an Assignment</h2>
                        <p>
                        Enter the Assignment name
                        </p>
                        <input type="text" placeholder="Assignment name" id="email-input" />
                        <p>
                        Enter the Assignment description
                        </p>
                        <input type="text" placeholder="Assignment description" id="email-input" />
                        <p>
                        Enter the Assignment max points
                        </p>
                        <input type="text" placeholder="Assignment points" id="email-input" />
                        <p>Choose a file</p>
                        <input type="file" id="file-upload"></input>
                        <button className="close-modal5" onClick={toggleModal5}>X</button>
                        <button className="save-modal5" onClick={addDiv}>Create</button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
} // Затруднявам се и не знам какво да направя :) 

export default ClassroomDashboard