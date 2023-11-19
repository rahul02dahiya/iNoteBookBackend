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


// Route-1 // Get all user's notes using POST "api/notes/addnotes" Login required
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
            title : req.body.title,
            description : req.body.description, 
            tag : req.body.tag, 
            user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("SOme error occured")
    }


})


module.exports = router;