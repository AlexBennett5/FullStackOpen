import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>
        So you were probably born in {bornYear()}
      </p>
    </div>
  )
}

const Display = ({ counter }) => (<div>{counter}</div>)

const Button = (props) => (
  <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const History = (props) => {
  if (props.allClicks.length == 0) {
    return (
      <div>
        this app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = (props) => {
  const [value, setValue] = useState(10)

  const hello = (who) => () => {
      console.log('hello', who)
  }

  const setToValue = (newValue) => () => {
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <Button handleClick={setToValue(1000)} text='thousand'/>
    </div>
  )
}

let counter = 1

ReactDOM.render(<App counter={counter} />, document.getElementById('root'))
