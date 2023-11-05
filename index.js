const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 3000

app.get('/api/v1/login', (req, res) => {
  res.send('Login Page')
})

app.get('/api/v1/signup', (req, res) => {
  res.send('Sign Up Page')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

