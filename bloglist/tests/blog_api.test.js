const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('return the correct number of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog ID property is named id, not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('valid blog is correctly added', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'test.com',
    likes: 1000000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = await Blog.find({})
  const blogsInDB = blogs.map(blog => blog.toJSON())

  expect(blogsInDB).toHaveLength(helper.initialBlogs.length + 1)

  const blogTitles = blogs.map(blog => blog.title)
  expect(blogTitles).toContain('Test Title')
})

test('if blog missing likes, then defaults to zero', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'test.com',
  }

  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.likes).toBe(0)
})

test('if title and url are missing from blog, then returns with 400', async () => {
  const newBlog = {
    author: 'Test Author',
    likes: 100000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog can be successfully deleted', async () => {
  const blogs = await Blog.find({})
  const blogsAtBeginning = blogs.map(blog => blog.toJSON())
  const blogToDelete = blogsAtBeginning[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({})
  const blogsAtEndJSON = blogsAtEnd.map(blog => blog.toJSON())
  expect(blogsAtEndJSON).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEndJSON.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)

})

test('blog likes can be updated', async () => {
  const blogs = await Blog.find({})
  const blogsAtBeginning = blogs.map(blog => blog.toJSON())
  const blogToUpdate = blogsAtBeginning[0]

  const updatedBlog = {...blogToUpdate, likes: blogToUpdate.likes + 1}

  const blogAtEnd = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog)
  
  expect(blogAtEnd.body.likes).toBe(blogToUpdate.likes + 1)
})

afterAll(() => {
  mongoose.connection.close()
})
