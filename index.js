const db = require('sqlite')
const bodyParser = require('body-parser')
const express = require('express')

api = express()

db.open('ToDoList.db').then(()=> {
  Promise.all([
    db.run("CREATE TABLE IF NOT EXISTS todos (userId, message, status, createdAt, updatedAt, completedAt)")
  ]).then(() => {
    console.log('Database Ready')
  }).catch((err) => {
    console.log('Une erreur est survenue : ', err)
  })
})

api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))

api.use('/todos', require('./controllers/toDoRoad'))

api.listen(3000)