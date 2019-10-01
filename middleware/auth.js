const jwt = require('jsonwebtoken')
const User = require('../model/users')

const auth = async (req , res ,next) => {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    // console.log(req)
    console.log(req.header('Authorization'))
    // console.log(req.headers('Authorization'))
    console.log(jwt.verify(req.header('Authorization'),'thisismysecret'))
    // console.log(jwt.verify(req.headers('Authorization'),'thisismysecret'))
    try{
        //taking data from header
        const token = req.header('Authorization')
        const decoded = jwt.verify(token,'thisismysecret')
        const user = await User.findOne({_id: decoded._id , 'tokens.token': token})
        console.log(token)
        if(!user){
            throw new Error()
        }
        console.log(user)
        req.token = token
        req.user=user
        next()
    }catch(e){
        res.status(401).send({error: 'Please authenticate'})
    }

    // console.log('auth middleware')
    // next()
}

module.exports = auth