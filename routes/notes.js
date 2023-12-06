const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');

// Route-1 // Get all user's notes using GET "api/notes/fetchallnotes" Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("SOme error occured")
    }

})


// Route-2 // adding notes using POST "api/notes/addnotes" Login required
router.post('/addnotes', fetchuser, [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters long").isLength({ min: 5 })
], async (req, res) => {

    try {
        // If there are errors return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Notes({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("SOme error occured")
    }

})

// Route-3 // Updating existing note using POST "api/notes/updatenotes" Login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }


        let note = await Notes.findById(req.params.id)

        if (!note) {
            return res.status(404).send("Access not allowed");
        }

        if (note.user.toString() != req.user.id) {
            return res.status(404).send("Access not allowed");
        }
        // Find the note and update
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("SOme error occured")
    }

})

// Route-4 // Deleting existing note using DELETE "api/notes/deletenotes" Login required
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    try {

        // Find the note
        let note = await Notes.findById(req.params.id)
        // chech weaher note exist or not
        if (!note) {
            return res.status(404).send("Access not allowed");
        }
        // Check if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(404).send("Access not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note deleted" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("SOme error occured")
    }

})



module.exports = router;