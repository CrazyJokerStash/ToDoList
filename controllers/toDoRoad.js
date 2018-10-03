const router = require('express').Router()
const toDoList = require('../Models/toDoModels')


router.get('/', function(req, res) {
    toDoList.getAll()
    .then((toDoList) => {
        res.json(toDoList).catch((err) => {
            return res.status(404).send(err)
        })
    })
})

router.post('/', function(req, res, next) {
    toDoList.create("Moi", "Développer une toDoList", "Undone", Date(), Date(), Date())
    .then((toDoList) => {
        res.json(toDoList).catch((err) => {
            return res.status(404).send(err)
        })
    })
})

router.get('/:id', function(req, res) {
    const id = req.params.id
    toDoList.get(id)
    .then((toDoList) => {
        res.json(toDoList).catch((err) => {
            return res.status(404).send(err)
        })
    })
})

router.put('/:status/:id', function(req, res) {
    const status = req.params.status
    const id = req.params.id
    if (status == "Done" || status == "done") {
           toDoList.updateComplete(status, id, Date(), Date())
           .then((toDoList) => {
            res.json(toDoList).catch((err) => {
                return res.status(404).send(err)
            })
        })
    }
    else
    {
        toDoList.updateOther(status, id, Date())
        .then((toDoList) => {
            res.json(toDoList).catch((err) => {
            return res.status(404).send(err)
            })
        })
    }
})

router.delete('/:id', function(req, res, next) {
    const id = req.params.id
    toDoList.delete(id)
    .then((toDoList) => {
        res.json(toDoList).catch((err) => {
            return res.status(404).send(err)
        })
    })
})

module.exports = router