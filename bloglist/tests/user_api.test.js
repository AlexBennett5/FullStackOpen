const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
        
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'root', name: 'root', passwordHash })
  await user.save()
})

describe('POST new users', () => {
  
  test('Successfully create new user returns 200 and valid user in database', async () => {
    const usersAtStart = await helper.getUsersInDb()

    const newUser = {
      username: 'New User',
      password: 'password',
      name: 'User'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.getUsersInDb()
    expect(usersAfter).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAfter.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  describe('Adding user fails when', () => {
    test('Either username or password are not provided', async () => {
      const noUsername = {
        password: 'password',
        name: 'Test'
      }
        
      await api
        .post('/api/users')
        .send(noUsername)
        .expect(400)
        
      const noPassword = {
        username: 'Test User',
        name: 'Test'
      }
        
      await api
        .post('/api/users')
        .send(noPassword)
        .expect(400)
    })

    test('Username or password is less than 3 characters long', async () => {
      const shortUsername = {
        username: 'as',
        password: 'password',
        name: 'as'
      }
        
      await api
        .post('/api/users')
        .send(shortUsername)
        .expect(400)
        
      const shortPassword = {
        username: 'Test User',
        password: 'ps',
        name: 'Test'
      }
        
      await api
        .post('/api/users')
        .send(shortPassword)
        .expect(400)
    })

    test('Username is not unique', async () => {
      const newUser = {
        username: 'root',
        password: 'password',
        name: 'root'
      }
        
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})