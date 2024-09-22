const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
var Band = require('../models/Band');
var User = require('../models/User');

// fetch all users
router.get('/fetch', (req, res) => {
    console.log("fetch all bands . . .")
    Band.find({}).then((DBItems) => {

        res.send(DBItems)
    })
})

router.get('/getBand/', async (req, res) => {
    var fetchid = req.get("_id")
    console.log("fetching band ID: " + fetchid)

    try {
        const band = await Band.findOne({_id: fetchid})
        .populate({ 
            path: 'bands',
            model: 'Band'
         })
         .exec();
        console.log("Band ID: " + band._id, "BN: " + band.bandName, "Members: "
             + band.members, "email: " + band.email)
        console.log("Band " + band)
        res.send(band)
    } catch(exception){
        console.log(exception)

    }
}) 

//Create BAND - POST 
router.post("/addBand", async (req, res) => {
    //create the band
    try {
        const result = await Band.create({
            _id: new mongoose.Types.ObjectId(),
            bandName: req.get("bandName"),
            members: req.get("members"),
            email: req.get("email")
        })
            console.log("RESULT: " + result);
            const fetchid = result.get("members")
            console.log("ID: " + fetchid[0])

            //update user.bands with new band they created
        try {
            var currentUser = await User.findById(fetchid)
            currentUser.bands.push(result)
            await currentUser.save()
                  res.status(201).send("Saved Band " + result);
          } catch (err) {
              console.log(err.message)
              res.status(500).send("User not updated!");
          }           
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Band not saved!");
    }
    
})

//DELETE A USER BY _ID
//POST REQUEST
router.post('/deleteById/', async (req, res) => {
    deleteid = req.get("id")
    console.log("Deleting BAND ID: " + deleteid)
    try {
        await Band.findByIdAndDelete({_id: deleteid})
    } catch (err) {
        console.log(err)
    }
    return res.send("Deleted ID: " + deleteid)  
})

//addBand_User - POST
router.post("/addUserToBand", async (req, res) => {
    bandId = req.get("id")
    userId = req.get("userId")

    try{
        const result = await Band.findOne({_id: bandId})
        console.log("Band " + result)
        result.members.push(userId)
        console.log("Band ID: " + result._id, "BN: " + result.bandName, "Members: "
            + result.members, "email: " + result.email)
        result.save()
        res.status(201).send("Saved User to Band " + result);
    } catch {
        res.status(500).send("User not saved to band!");
    }
       
        console.log("Band ID: " + result._id, "BN: " + result.bandName, "Members: "
             + result.members, "email: " + result.email)
        console.log("Band " + result)
        res.send(band)
    

})

module.exports = router;
