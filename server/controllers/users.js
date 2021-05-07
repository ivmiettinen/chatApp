const chatterArray = require('../chatterArray')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = chatterArray
        if (users) {
            res.json(users.map((user) => user))
        } else {
            res.status(404).end()
        }
    } catch (err) {
        next(err)
    }
})

usersRouter.post('/', async (req, res, next) => {
    const body = req.body

    if (body.username === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }

    const checkForDuplicate = (p) => p.username === body.username

    if (chatterArray.find(checkForDuplicate)) {
        return res.status(409).json({ error: 'Username is already in use' })
    } else {
        const person = {
            username: body.username,
        }

        res.status(200).json({ person })
    }
})

module.exports = usersRouter
