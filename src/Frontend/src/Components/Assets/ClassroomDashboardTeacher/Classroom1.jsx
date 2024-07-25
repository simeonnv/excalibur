import React from 'react';

function Classroom1() {
    return (

    <div id="classroom1">
    <button id="arrow"></button>
    <div className="message-and-chat">
        <div className="chat">
            <div className="paragraphs">
                <p>
                    <h4 style={{marginTop: "0em", marginBottom: "0.2em", color:"blue"}}>Християн</h4>
                    <>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, enim, recusandae doloribus accusamus in quos aliquam provident modi esse harum quis nostrum iusto ab cum saepe soluta nobis, non autem?</>
                </p>
                <p>
                    <h4 style={{marginTop: "0em", marginBottom: "0.2em", color:"blue"}}>simeon</h4>
                    <>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, enim, recusandae doloribus accusamus in quos aliquam provident modi esse harum quis nostrum iusto ab cum saepe soluta nobis, non autem?</>
                </p>
                <p>
                    <h4 style={{marginTop: "0em", marginBottom: "0.2em", color:"blue"}}>simeon</h4>
                    <>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, enim, recusandae doloribus accusamus in quos aliquam provident modi esse harum quis nostrum iusto ab cum saepe soluta nobis, non autem?</>
                </p>
                <p>
                    <h4 style={{marginTop: "0em", marginBottom: "0.2em", color:"blue"}}>simeon</h4>
                    <>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, enim, recusandae doloribus accusamus in quos aliquam provident modi esse harum quis nostrum iusto ab cum saepe soluta nobis, non autem?</>
                </p>
            </div>
        </div>
        <div className="message">
            <textarea type="text" id="text" placeholder="Enter a message"/>
        <div className="buttons-message">
            <button id="submit-message">Submit</button>
            <label for="file-upload" class="submit-message">
                    Custom Upload
                </label>
            <input id="file-upload" type="file" />
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