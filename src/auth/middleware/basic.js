'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const {Users}=require('../models/index');

async function basicAuth(req,res,next){
    try {
        let basicHeaderParts= req.headers.authorization.split(' ');
        let encodedPart = basicHeaderParts.pop(); 
        let decoded = base64.decode(encodedPart);
        let [username,password]= decoded.split(':');
        const user = await Users.findOne({where:{username:username}});
        const valid = await bcrypt.compare(password,user.password);
        if(valid) {
            res.status(200).json(user)
            next();
        } else {
            res.status(403).send('user is not valid')
        }
    } catch(error) {
        res.status(403).send('user is not valid')
    }
}

module.exports= basicAuth;