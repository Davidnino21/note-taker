const router = require('express').Router()

const db = require('./db/db.json')

router.get('/api/notes', (req, res) => {
    res.send(db)
})

module.exports = router;