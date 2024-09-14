const express = require("express");
const router = express.Router();
const path = require('path');
var Band = require('../models/bandSchema');

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
             + band.bandMates, "email: " + band.email)
        console.log("Band " + band)
        res.send(band)
    } catch(exception){
        console.log(exception)

    }
}) 

//Create BAND - POST 
router.post("/addBand", (req, res) => {
    var band = new Band ({
        bandName: req.get("bandName"),
        bandMates: req.get("bandMates"),
        email: req.get("email")
    })

    console.log("BN: " + band.bandName, "BM: " + band.bandMates, "email: " + band.email)
    band.save().then(() => {
        if(band.isNew == false){
            console.log("Saved Data!")
            res.send("Saved band " + band._id)

        } else {
            console.log("failed to save data")
        }
    })
})

module.exports = router;
