'use strict';
const bcrypt = require('bcrypt');
const { Users } = require('./models/index')
const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic')

router.post('/signup', signupHangler);
router.post('/signin', basicAuth, signinHandler);

async function signupHangler(req, res) {
    let { username, password } = req.body;
    try {
        let hashedPassword = await bcrypt.hash(password, 5);
        console.log('after hashing >>> ', hashedPassword)
        const user = await Users.create({
            username: username,
            password: hashedPassword
        })
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
    }
}

async function signinHandler(req, res) {
    await res.status(200).json(req.user);
}

module.exports = router