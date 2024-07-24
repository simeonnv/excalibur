import React from 'react'

const Classes = ({classes}) => {
    
    classes.forEach(element => {
        console.log(element.image.data)
        console.log("new image", `data:${element.image.contentType};base64,${element.image.data}} alt={classroom.name}`)
    });
    
  
    return (
    <div>
    {classes.map((classroom, index) => (
      <div key={index} className="classroom1">
        <div className="title-caption">
          <h4>{classroom.name}</h4>
          <img src={`data:${classroom.image.contentType};base64,${classroom.image.data}`} alt={classroom.name} />
        </div>
      </div>
    ))}
  </div>
  )
}

export default Classes