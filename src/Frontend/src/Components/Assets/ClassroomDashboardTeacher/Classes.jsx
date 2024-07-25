// Classes.js
import React from 'react';

const Classes = ({ classes, setclassId, openClass}) => {
  const getImageSrc = (image) => {
    return `data:${image.contentType};base64,${image.data}`;
  };

  const classroomStyle = (imageSrc) => ({
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: 'contain',
    marginLeft: '50px',
    marginTop: '50px',
    width: '150px',
    height: '150px',
    backgroundColor: 'rgb(32, 32, 32)',
    borderRadius: '10px',
    display: 'inline-block',
    cursor: 'pointer'
  });

  const titleCaptionStyle = {
    position: 'relative',
    top: '70%',
    left: '0%',
    height: '30%',
    backgroundColor: 'rgba(32, 32, 32, 0.5)',
    backdropFilter: 'blur(5px)',
    color: 'white',
    textAlign: 'center'
  };



  return (
    <div>
      {classes.map((classroom, index) => (
        <div key={index} className="classroom1" id={classroom.id} style={classroomStyle(getImageSrc(classroom.image))} 
          onClick={() => { setclassId(classroom.id); openClass(); }}>
          <div className="title-caption" style={titleCaptionStyle}>
            <h4>{classroom.name}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;
