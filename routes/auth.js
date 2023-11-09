const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');

// Create a user using POST "/api/auth". Doesn't required login

router.post('/createuser', [
    body("password", "enter a valid pass").isLength({ min: 5 }),
    body("email", "enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 })
], async (req, res) => {


    // If there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Check weather the user is already exist
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log(user)
            return res.status(400).json({ errors: "Sorry a user is already exist with same email" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })


        res.json(user)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("SOme error occured")
    }

})


module.exports = router;