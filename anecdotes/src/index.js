import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button className='button' onClick={props.handleClick}>{props.text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0))

  const randomNum = (min, max) => (
    Math.floor(Math.random() * (max - min) + min)
  )

  const changeAnecdote = () => () => {
    setSelected(randomNum(0, props.anecdotes.length))
  }

  const voteForAnecdote = () => () => {
    const newvotes = [...votes]
    newvotes[selected] += 1
    setVotes(newvotes)
  }

  const indexOfMax = (arr) => (
    arr.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
  )

  const currentMax = indexOfMax(votes)

  return (
    <div>
      <Header text='Anecdote of the day' />
      {props.anecdotes[selected]} <br />
      has {votes[selected]} votes <br />
      <div className='wrapper'>
        <Button handleClick={voteForAnecdote()} text='vote' />
        <Button handleClick={changeAnecdote()} text='next anecdote' />
      </div>

      <Header text='Anecdote with the most votes' />
      {props.anecdotes[currentMax]} <br />
      has {votes[currentMax]} votes <br />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
