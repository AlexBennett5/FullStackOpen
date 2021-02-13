import React from 'react'
import Notification from './Notification'

const Person = ({id, name, number, deletePerson}) => {
    return(
        <div>
            <li key={id}>
                {name} {number} <button onClick={deletePerson}>delete</button>
            </li>
        </div>
    )
}

const Persons = ({persons, deletePerson}) => {
    return (
        <div>
            <ul>
            {persons.map((person) =>
                <Person 
                    key={person.id} 
                    name={person.name} 
                    number={person.number} 
                    deletePerson={() => deletePerson(person.name, person.id)} 
                />
            )}
            </ul>
        </div>
    )
}

const PersonForm = ({onSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>name: <input value={newName} onChange={handleNameChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

const Filter = ({term, handler}) => {
    return (
        <form>
            <div>filter names with: <input value={term} onChange={handler}></input></div>
        </form>
    )
}

const Phonebook = (props) => {
    return (
        <div>
            <h2>Phonebook</h2>
                <Notification
                    message={props.notificationMessage}
                />
                <Filter 
                    term={props.searchTerm} 
                    handler={props.handleSearchChange} 
                />
            <h2>Add new contact:</h2>
                <PersonForm 
                    onSubmit={props.addPerson} 
                    newName={props.newName} 
                    handleNameChange={props.handleNameChange}
                    newNumber={props.newNumber}
                    handleNumberChange={props.handleNumberChange}     
                />
            <h2>Numbers</h2>
                <Persons 
                    persons={props.personsToShow} 
                    deletePerson={props.deletePerson} 
                />
        </div>
    )
}

export default Phonebook