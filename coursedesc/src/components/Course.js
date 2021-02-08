import React from 'react'

const Header = (props) => {
    return <h1>{props.name}</h1>
}

const Part = (props) => {
    return <p>{props.name} {props.exercises}</p>
  }
  
  const Content = (props) => {
    let parts = props.parts
    return (
      <div>
        {parts.map((part) => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = (props) => {
    let parts = props.parts
    let total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <p>Number of exercises {total} </p>
    )
  }
  
  const Course = (props) => {
    return (
      <div>
        <Header name={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }

export default Course