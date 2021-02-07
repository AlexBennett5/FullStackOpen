import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      {props.text}
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementRating = (rate, setRating) => {
    setRating(rate + 1)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={incrementRating(good, setGood)} text='good' />
      <Button onClick={incrementRating(neutral, setNeutral)} text='neutral' />
      <Button onClick={incrementRating(bad, setBad)} text='bad' />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)