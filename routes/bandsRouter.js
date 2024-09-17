const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
var Band = require('../models/Band');

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
        console.log("Application ID: " + band._id, "BN: " + band.bandName, "LN: "
             + band.members, "email: " + band.email)
        console.log("Band " + band)
        res.send(band)
    } catch(exception){
        console.log(exception)

    }
}) 

//Create BAND - POST 
router.post("/addBand", async (req, res) => {
    
    try {
        const result = await Band.create({
            _id: new mongoose.Types.ObjectId(),
            bandName: req.get("bandName"),
            members: req.get("members"),
            email: req.get("email")
        })
        console.log("RESULT: " + result);
        res.status(201).send("Saved user " + result);
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Band not saved!");
    }
})

module.exports = router;
