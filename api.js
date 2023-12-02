const router = require('express').Router()

const fs = require('fs')


router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err

        const savedNotes = JSON.parse(data)
        res.json(savedNotes)
    })
})

router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = Date.now()
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err

        const savedNotes = JSON.parse(data)
        savedNotes.push(newNote)
        fs.writeFile('./db/db.json', JSON.stringify(savedNotes), (err) => {
            if (err) throw err
            res.json(newNote)
        })
    })
})

router.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err

        const savedNotes = JSON.parse(data)
        const newNotes = savedNotes.filter(note => note.id != req.params.id)
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
            if (err) throw err
            res.send('not deleted')
        })
    })
})
module.exports = router;