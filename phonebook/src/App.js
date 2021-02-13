import React, { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ notificationMessage, setNotificationMessage ] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name == newName)) {
            modifyPerson(persons.find(person => person.name == newName))
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(personObject))
                    setNewName('')
                    setNewNumber('')

                    setNotificationMessage(`Phone number for ${personObject.name} added`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000)
                })
        }
    }

    const modifyPerson = (personToChange) => {
        if (window.confirm(`${personToChange.name} is already in the phonebook, replace the old number with a new one?`)) {
            const changedPerson = {...personToChange, number: newNumber}

            personService
                .update(personToChange.id, changedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id != personToChange.id ? person : changedPerson))
                    setNewName('')
                    setNewNumber('')

                    setNotificationMessage(`Phone number for ${changedPerson.name} changed`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000)
                })
        }
    }

    const deletePerson = (name, id) => {

        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            personService
                .deletePerson(id)
                .then(deletedPerson => {
                    setPersons(persons.filter(person => person.id != id))
                })
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
        : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div>
            <Phonebook
                notificationMessage={notificationMessage}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
                personsToShow={personsToShow}
                deletePerson={deletePerson}
            />
        </div>
    )
}

export default App