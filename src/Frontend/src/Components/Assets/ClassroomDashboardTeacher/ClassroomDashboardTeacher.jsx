import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ClassroomDashboardTeacher.css';
import Classes from './Classes';

const ClassroomDashboard = () => {

    const [divs, setDivs] = useState([]);
    const [divs1, setDivs1] = useState([]);
    const navigate = useNavigate();

    const addDiv = () => {
        setDivs([...divs, <div key={divs.length} className="box"></div>]);
    };

    const addDiv1 = () => {
        setDivs1([...divs1, <div key={divs1.length} className="box"></div>]);
    };

    const [Modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!Modal)
    };

    if (Modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const [Modal1, setModal1] = useState(false);
    const toggleModal1 = () => {
        setModal1(!Modal1)
    };

    if (Modal1) {
        document.body.classList.add('active-modal5')
    } else {
        document.body.classList.remove('active-modal5')
    }

    const [Modal3, setModal3] = useState(false);
    const toggleModal3 = () => {
        setModal3(!Modal3)
    };

    if (Modal3) {
        document.body.classList.add('active-modal3')
    } else {
        document.body.classList.remove('active-modal3')
    }
    
    const [Modal4, setModal4] = useState(false);
    const toggleModal4 = () => {
        setModal4(!Modal4)
    };
    

    if (Modal4) {
        document.body.classList.add('active-modal4')
    } else {
        document.body.classList.remove('active-modal4')
    }

    const [Modal5, setModal5] = useState(false);
    const toggleModal5 = () => {
        setModal5(!Modal5)
    };

    if (Modal5) {
        document.body.classList.add('active-modal5')
    } else {
        document.body.classList.remove('active-modal5')
    }

    const [firstName, setFirstName] = useState("[First Name]");
    const [secondName, setSecondName] = useState("[Last Name]");
    const [email, setEmail] = useState("[E-Mail]");
    const [pass, setPass] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [classes, setClasses] = useState([]);

    const getNames = async () => {
        try {
            const token = await localStorage.getItem('token');
            console.log(token)
            const response = await axios.post('http://localhost:5000/users/me', { token });

            const base64Image = `data:${response.data.image.contentType};base64,${response.data.image.data}`;
            setImageSrc(base64Image);
            setFirstName(response.data.firstname)
            setSecondName(response.data.secondname)
            setEmail(response.data.email)
            setNewEmail(response.data.email)
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const getClasses = async () => {
        try {
            const token = await localStorage.getItem('token');
            console.log(token)
            const response = await axios.post('http://localhost:5000/class', { token });
            const classes = response.data.classes
            console.log(classes)
            setClasses(classes)
            


            // const base64Image = `data:${response.data.image.contentType};base64,${response.data.image.data}`;
            // const className = response.data.name
            
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const handleFileChange = (event) => {
        setNewImage(event.target.files[0]);
    };

    const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
    };

    const handlePassChange = (event) => {
        setPass(event.target.value);
    };

    const handleSubmit = async (event) => {

        const formData = new FormData();
        event.preventDefault();
        const token = await localStorage.getItem('token');
        formData.append('token', token);

        if (pass) {
            formData.append('password', pass);
        }

        if (newImage) {
            formData.append('image', newImage);
        }
        formData.append('email', newEmail);

        try {

            await axios.put('http://localhost:5000/users/me', formData);
            alert('Profile updated successfully!');
            setModal(false);
            getNames(); // Refresh the data
        } catch (error) {
            console.error('There was an error updating the profile!', error);
        }
    };

    useEffect(() => {
        getNames();
        getClasses();
    }, []);


    const [newClassName, setNewClassName] = useState('');
    const [newClassImage, setNewClassImage] = useState(null);
    
    const handleNewClassName = (event) =>
    {
        setNewClassName(event.target.value);
    }
    const handleNewClassImage= (event) =>
    {
        setNewClassImage(event.target.files[0])
    }



    const handleCreateClass = async (event) =>
    {
        const formData = new FormData();
        event.preventDefault();
        const token = await localStorage.getItem('token');
        formData.append('name', newClassName);
        formData.append('image', newClassImage);
        formData.append('token', token);
        
        try {

            await axios.put('http://localhost:5000/class', formData);
            alert('created class successfully');
            setModal4(false)
            getClasses();
        } catch (error) {
            console.error('There was an error updating the profile!', error);
        }

    }

    const handleLogOut = async () =>
    {
        const token = await localStorage.getItem('token');
        localStorage.clear()
        navigate('/login');
    }


    return (
        <div>
            <div className="container">
                <div className="sidebar">
                    <div className="first-sidebar">
                        <div className="profile-picture"><img src={imageSrc} alt="" /></div>
                        <div className="name-class">
                            <div id="fname">{firstName}</div>
                            <div id="lname">{secondName}</div>
                            <div id="user">{email}</div>
                            <button className="btn-modal" onClick={toggleModal}>Edit</button>
                        </div>
                    </div>
                    <div id="line-break"><hr /></div>
                    <div className="sidebar-buttons">
                        <img src="" alt="" /><button className="btn-modal5" onClick={toggleModal5}>Create Assignment</button>
                        <img src="" alt="" /><button>Active Assignments</button>
                        <img src="" alt="" /><button>Grades</button>
                        <img src="" alt="" /><button>Classes</button>
                        <img src="" alt="" /><button onClick={toggleModal4}>Create class</button>
                        <img src="" alt="" /><button id="log-out" onClick={toggleModal3}>Log out</button>
                    </div>
                </div>
                
                <div className="container1">
                    <div className="classrooms">
                        
                        <Classes classes={classes} />
            
                    </div>

                    <div className="line-break1">
                        <hr />
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
                            <form onSubmit={handleSubmit}>
                                <p>
                                    Enter your new e-mail
                                </p>
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    id="email-input"
                                    value={newEmail}
                                    onChange={handleEmailChange}
                                    required
                                />
                                <p>
                                    Enter your new password
                                </p>
                                    <input
                                    type="pass"
                                    placeholder="Password"
                                    id="email-input"
                                    onChange={handlePassChange}
                                />
                                <p>
                                    Upload your profile picture
                                </p>
                                <p>Choose a file</p>
                                <input
                                    type="file"
                                    id="file-upload"
                                    onChange={handleFileChange}
                                />
                                <button className="close-modal" type="button" onClick={toggleModal}>
                                    X
                                </button>
                                <button className="save-modal" type="submit">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {Modal1 && (
                    <div className="modal1">
                        <div className="overlay"></div>
                        <div className="modal-content1">
                        <h2>
                            Manage students in the class
                        </h2>
                        <br />
                        <p>
                            All students:
                        </p>
                            <div className="select-container">
                                <select name="" className="select-box">
                                    <option value="">Select a student</option>
                                    <option value="first">Student1</option>
                                    <option value="second">Student2</option>
                                    <option value="third">Student3</option>
                                    <option value="fourth">Student4</option>
                                </select>
                            </div>
                            <button className="close-modal1" onClick={toggleModal1}>X</button>
                            <button className="save-modal1" onClick={toggleModal1}>Save</button>
                            <button className="remove-student" onClick={toggleModal1}>Remove student</button>
                            <button className="add-student" onClick={toggleModal1}>Add student</button>
                            <p>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            Students in the class
                            </p>
                            <div>
                                <select name="" className="select-box">
                                    <option value="">Select a student</option>
                                    <option value="first">Student1</option>
                                    <option value="second">Student2</option>
                                    <option value="third">Student3</option>
                                    <option value="fourth">Student4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
                {Modal3 && (
                    <div className="modal3">
                        <div className="overlay"></div>
                        <div className="modal-content3">
                            <h2>Are you sure you want to log out?</h2>
                            <button className="close-modal3" onClick={toggleModal3}>No</button>
                            <button className="save-modal3" onClick={() => {toggleModal3();handleLogOut()}}>Yes</button>
                        </div>
                    </div>
                )}
                {Modal4 && ( //bomba
                    <div className="modal4">
                        <div className="overlay"></div>
                        <div className="modal-content4">
                            <h2>Create a new class</h2>
                            <form onSubmit={handleSubmit}>
                                <p>
                                    Enter class name
                                </p>
                                <input
                                    type="name"
                                    placeholder="Class name"
                                    id="email-input"
                                    // value={newEmail}
                                    onChange={handleNewClassName}
                                    required
                                />
                                <p>
                                    Upload your class picture
                                </p>
                                <p>Choose a file</p>
                                <input
                                    type="file"
                                    id="file-upload"
                                    onChange={handleNewClassImage}
                                    required
                                />
                                <button className="close-modal" type="button" onClick={toggleModal4}>
                                    X
                                </button>
                                <button className="save-modal" type="submit" onClick={handleCreateClass}>
                                    Create class
                                </button>
                            </form>
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
                            <p>
                                Enter due date
                            </p>
                            <input type="date" id="start" name="trip-start" value="2024-07-26" min="2024-07-26" max="2025-12-30" />
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
