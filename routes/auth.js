const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

// Create a user using POST "/api/auth". Doesn't required authentication

router.post('/',[
    body("password","enter a valid pass").isLength({min:5}),
    body("email","enter a valid email").isEmail(),
    body("name","Enter a valid name").isLength({min:3})
],(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    User.create({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password        
    }).then(user => res.json(user))
    .catch(err=>{console.log(err)
    res.json({error:"Please enter a unique email"})
console.log(err.index)
})
})

module.exports = router;