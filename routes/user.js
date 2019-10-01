const router = require("express").Router(); 

const mongoose = require("mongoose");

const User = require('../model/users')
const bcrypt = require('bcryptjs')
const config = require('../config/database')
const sec = config.jwtSecret;
const jwt = require ('jsonwebtoken')
const auth = require('../middleware/auth')




//  Get data
 router.get("/" , async (req , res) => {
    const user = await User.find()
    res.send(user)
})

router.post('/login' , async (req , res) => {
    console.log("oopppopopo")
    console.log(req.body)
    // res.send({
    //     "ok" : true
    // })
    //using async await
    try {
        console.log("uiiiuiuiuui")
        const user = await User.findByCredentials(req.body.email , req.body.password)
        console.log("8888888")
        const token = await user.generateAuthToken()
        res.status(201).send({user:user,token})
    }catch (err) {
        res.status(400).send(err)
    }
    
})


router.post("/checklogin" , async (req,res) => {
    const users = await User.findOne({
        email : req.body.email,
        password : req.body.password
    })
    .then(response => {
        console.log("pankaj SUCCESS");
        console.log(response.password);
    
     return res.status(201).json(response)
   })
   .catch(err => {
     console.log("bhardwaj ERROR");
     const response = {
        message : "Either Email or Password is wrong."
     }
     return res.status(404).json(response)
   });

})



// Post data
router.post("/" , async (req,res) => {
    console.log("in user0")
    const user = new User(req.body)
    console.log(req.body)

//using async await
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user , token})
    }catch (err) {
        res.status(400).send(err)
    }
 })


 router.post('/logout' ,auth, async (req , res) => {
    //using async await
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch (err) {
        console.log("error")
        res.status(500).send(err)
    }
    
})

 //Get data
 router.get("/:employeeId" , async (req , res) => {
        const employee = await Employee.findOne({_id: req.params.employeeId})
        res.send(employee)
 })

 //Update data
 router.put("/:employeeId" , async (req , res) => {
        const employee = await Employee.findByIdAndUpdate({
            _id: req.params.employeeId}
            ,req.body,{
                new : true,
                runValidators : true
            })
        res.send(employee)
 })

 //Delete data
 router.delete("/:userId" , async (req , res) => {
        const user = await User.findByIdAndRemove({
            _id: req.params.userId})
        res.send(user)
 })



module.exports = router;