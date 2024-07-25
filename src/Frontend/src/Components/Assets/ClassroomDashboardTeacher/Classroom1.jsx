import React, { useState, useEffect } from "react";
import image from "./media/hris.jpg"
import axios from 'axios';
import { json } from "react-router-dom";

const Classroom1 = ({ returnFunc, classroomId, Name }) => {

    const [image, setImage] = useState(null);
    const [chat, setChat] = useState(null);
    const [text, setText] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handeSendMessages = async () => {
        const attachedImage = !!image
        let imageData = null
        let contentType = null
        if (attachedImage) {
            imageData = image.data
            imageData = image.contentType
        }
        if (!text) {
            return;
        }
        const json = {
            token: await localStorage.getItem('token'),
            firstname: Name,
            text: text,
            image: {
                data: imageData,
                contentType: contentType
            }
        }
        try {
            console.log(`http://localhost:5000/class/${classroomId}/texts`)
            const response = await axios.put(`http://localhost:5000/class/${classroomId}/texts`, json);
            console.log(response.data)
            fetchMessages()
        } catch (err) {
            console.log(err)
        }

    }

    let theChat;
    const fetchMessages = async () => {
        const response = await axios.post(`http://localhost:5000/class/${classroomId}/texts`, { token: await localStorage.getItem('token') });
        console.log("TOWA TOWA TOAW", response)
        setChat(response.data.texts)
        theChat = chat
    }






    return (

        <div id="classroom1">
            <button id="arrow" onClick={returnFunc}></button>
            <div className="message-and-chat">
                <div className="chat">
                    <div className="paragraphs">


                        {chat && chat.map((paragraph, index) => (
                            <div key={index}>
                                <p id={index * 30}>
                                    <h4 style={{ marginTop: "0em", marginBottom: "0.2em", color: "blue" }}>{paragraph.name}</h4>
                                    <>{paragraph.text}</>
                                </p>
                            </div>
                        ))}


                    </div>
                </div>
                <div className="message">
                    <textarea type="text" id="text" placeholder="Enter a message" onChange={handleTextChange} />
                    <div className="buttons-message">
                        <button id="submit-message" onClick={handeSendMessages}>Submit</button>
                        <label for="file-upload-class" class="submit-message">
                            Custom Upload
                        </label>
                        <input id="file-upload-class" type="file" onChange={handleImageChange} />
                    </div>
                </div>
            </div>
            <div className="class-list">
                <div className="students">
                    <ul>
                        <li>firstname secondname</li>
                        <li>firstname secondname</li>
                        <li>firstname secondname</li>
                        <li>firstname secondname</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Classroom1;