const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-21311"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-12-121224"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "123-12313-132"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>` +  new Date())
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * (10000000 - 1) + 1)
}

app.post('/api/persons', (request, response) => {    
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            "error": "name missing"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            "error": "number missing"
        })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            "error": "name must be unique"
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
