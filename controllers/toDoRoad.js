const router = require('express').Router()
const toDoList = require('../Models/toDoModels')
const Users = require('../Models/usersModels')

router.get('/', function(req, res) {
    toDoList.getAll()
    .then((toDoList) => {
        res.json(toDoList)
    })
})

router.post('/', function(req, res, next) {
    Users.createUser("Moi")
    toDoList.create("Moi", "Développer une toDoList", "Undone", Date(), Date(), Date())
    .then((toDoList) => {
        res.json(toDoList)
    })
})

/*router.get('/:uid', function(req, res) {
    const uid = req.params.uid
    console.log(uid + " " + Users.getToken(uid))
    if (Users.getToken(uid) == uid)
    {
        toDoList.get(uid)
        .then((toDoList) => {
            res.json(toDoList)
        })
    }
    else{
        res.json("Aucun utilisateur n'est dans la base de données")
    }
})*/

router.get('/:uid', function(req, res) {
    const uid = req.params.uid
    Users.getUser(uid)
    .then((user) => {
        if (user.userName == uid) {
            toDoList.get(uid)
            .then((toDoList) => {
                res.json(toDoList)
            })
        }
    }).catch(function(error) {
        res.json("Aucun utilisateur n'est dans la base de données")
    })
})



router.put('/:status/:id', function(req, res) {
    const status = req.params.status
    const id = req.params.id
    if (status == "Done" || status == "done") {
           toDoList.updateComplete(status, id, Date(), Date())
           .then((toDoList) => {
            res.json(toDoList)
        })
    }
    else {
        toDoList.updateOther(status, id, Date())
        .then((toDoList) => {
            res.json(toDoList)
        })
    }
})

router.delete('/:id', function(req, res, next) {
    const id = req.params.id
    toDoList.delete(id)
    .then((toDoList) => {
        res.json(toDoList)
    })
})

module.exports = router