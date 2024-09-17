const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User')

router.get('/getUser/', async (req, res) => {
    var fetchid = req.get("appleId")
    console.log("fetching user ID: " + fetchid)

    try {
        const user = await User.findOne({appleId: fetchid}).exec();
        console.log("Application ID: " + user._id, "Apple ID: " + user.appleId, "FN: " + user.firstName, "LN: " + user.lastName, "email: " + user.email)
        console.log("User " + user)

        

        res.send(user)
    } catch(exception){
        console.log(exception)

    }
}) 

// fetch all users
router.get('/fetch', (req, res) => {
    console.log("fetch all . . .")
    User.find({}).then((DBItems) => {

        res.send(DBItems)
    })
})

//DELETE A USER BY _ID
//POST REQUEST
router.post('/deleteById/', async (req, res) => {
    deleteid = req.get("id")
    console.log("Deleting ID: " + deleteid)
    try {
        await User.findByIdAndDelete({_id: deleteid})
    } catch (err) {
        console.log(err)
    }
    //const user = await User.findById({id: deleteid}).exec
    //User.deleteOne(user)
    return res.send("Deleted ID: " + deleteid)  
})

// //DELETE A USER BY APPLE ID
// //POST REQUEST
router.post('/deleteByAppleId/', async (req, res) => {
    deleteid = req.get("appleId")
    console.log("ID: " + deleteid)
    try {
        await User.findOneAndDelete({appleId: deleteid})
    } catch (err) {
        console.log(err)
    }
    //const user = await User.findById({id: deleteid}).exec
    //User.deleteOne(user)
    return res.send("Deleted ID: " + deleteid)  
})

//UPDATE USER
//POST 
router.post('/updateUser/', async (req, res) => {
    console.log("fetching . . .")
    var fetchAppleid = req.get("appleId")
    var fetchFirstName = req.get("firstName")
    var fetchLastName = req.get("lastName")
    var fetchEmail = req.get("email")
    var userUpdateObj = new User()
    console.log("ID: " + fetchid)
    const user = await User.findById({_id: fetchid})
    console.log("Apple ID: " + user.appleId, "FN: " + user.firstName, "LN: " + user.lastName, "email: " + user.email)

    if(fetchAppleid != user.appleId){
        
        userUpdateObj.appleId = fetchAppleid
    }
    if(fetchFirstName != user.firstName){
        //await User.findByIdAndUpdate(fetchid, )
        userUpdateObj.firstName = fetchFirstName
    }
    if(fetchLastName != user.lastName){
        //await User.findByIdAndUpdate(fetchid, )
        userUpdateObj.lastName = fetchLastName
    }
    if(fetchEmail != user.email){
        //await User.findByIdAndUpdate(fetchid, )
        userUpdateObj.email = fetchEmail
    }
    await User.findByIdAndUpdate(fetchid, {firstName: userUpdateObj.firstName})
    console.log("Apple ID: " + user.appleId, "FN: " + user.firstName, "LN: " + user.lastName, "email: " + user.email)
    res.send(user.id)
})

//CREATE A USER
//POST REQUEST
router.post("/addUser", async (req, res) => {

try {
    const result = await User.create({
        _id: new mongoose.Types.ObjectId(),
        appleId: req.get("appleId"),
        firstName: req.get("firstName"),
        lastName: req.get("lastName"),
        email: req.get("email"),
        bands: []
    })
        console.log("RESULT: " + result);
        res.status(201).send("Saved user " + result);
    } catch (err) {
        console.log(err.message)
        res.status(500).send("User not saved!");
    }
})

module.exports = router;

