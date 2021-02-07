import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button className='button' onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Stat = (props) => {
  return (
      <tr>
        <td>{props.name}</td>
        <td>{props.value} {props.unit}</td>
      </tr>
  )
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral

  if (total == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const getAverage = () => (
    ((props.good + (-1 * props.bad))/total).toFixed(2)
  )

  const getPositive = () => (
    (100 * (props.good/total)).toFixed(2)
  )

  return (
    <table>
      <tbody>
        <Stat value={props.good} name='good' />
        <Stat value={props.neutral} name='neutral' />
        <Stat value={props.bad} name='bad' />
        <Stat value={total} name='all' />
        <Stat value={getAverage()} name='average' />
        <Stat value={getPositive()} name='positive' unit=' %' />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementRating = (rate, setRating) => () => {
    setRating(rate + 1)
  }


  return (
    <div>
      <Header text='give feedback' />
      <div className='wrapper'>
        <Button onClick={incrementRating(good, setGood)} text='good' />
        <Button onClick={incrementRating(neutral, setNeutral)} text='neutral' />
        <Button onClick={incrementRating(bad, setBad)} text='bad' />
      </div>
      
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)