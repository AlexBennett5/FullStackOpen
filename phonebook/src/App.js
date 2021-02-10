import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => {
    return(
        <div>
            {props.name} {props.number}
        </div>
    )
}

const Persons = (props) => {
    return (
        <div>
            {props.persons.map((person) =>
                <Person key={person.name} name={person.name} number={person.number} />
            )}
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
            <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

const Filter = (props) => {
    return (
        <form>
            <div>filter names with: <input value={props.term} onChange={props.handler}></input></div>
        </form>
    )
}

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ searchTerm, setSearchTerm ] = useState('')

    const fetchFromDB = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }
    useEffect(fetchFromDB, [])

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name == newName)) {
            window.alert(`${newName} is already in the phonebook`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(personObject))
            setNewName('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const personsToShow = searchTerm == ''
        ? persons
        : persons.filter(person => person.name.includes(searchTerm))

    return (
        <div>
        <h2>Phonebook</h2>
            <Filter 
                term={searchTerm} 
                handler={handleSearchChange} 
            />
        <h2>Add new contact:</h2>
            <PersonForm 
                onSubmit={addPerson} 
                newName={newName} 
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}     
            />
        <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App