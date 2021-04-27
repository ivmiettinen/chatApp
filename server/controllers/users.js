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

module.exports = usersRouter
