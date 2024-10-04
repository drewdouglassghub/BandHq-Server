const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
var Band = require('../models/Band');
var User = require('../models/User');
var BandList = require('../models/BandList')
const { ObjectId } = mongoose.Types;

router.post("/createBandList", async (req, res) => {
    try {
        var appleId = req.get("appleId")
        console.log("Creating Band List")
        const user = await User.findOne({appleId: appleId})
        //console.log("Application ID: " + user._id, "Apple ID: " + user.appleId, "FN: " + user.firstName, "LN: " + user.lastName, "email: " + user.email)
        // .populate({ 
        //         path: 'bands',
        //         model: 'Band'
        //      })
         .exec();

    try {
        //build BandList
        const result = await BandList.create({
            _id: new mongoose.Types.ObjectId(),
            refId: user._id,
            bands: user.bands
        })
            console.log("RESULT: " + result);
            res.status(201).send("Saved bandlist " + result);
        } catch (err) {
            console.log("BandList error " + err.message)
            res.status(500).send("BandList error " + err.message);
        }
    } catch (err) {
        console.log("BandList error " + err.message)
        res.status(500).send("BandList error " + err.message);
    }
})


//GET USER_BANDS
//getUserBands
router.get('/listBandsByUserId/', async (req, res) => {
    
    var fetchid = req.get("refId")
    console.log("LBUID - fetching user ID: " + fetchid)

    try {
        const user = await User.findOne({refId: fetchid})
        //console.log("Application ID: " + user._id, "Apple ID: " + user.appleId, "FN: " + user.firstName, "LN: " + user.lastName, "email: " + user.email)
        // .populate({ 
        //         path: 'bands',
        //         model: 'Band'
        //      })
         .exec();

         bands = [];
         console.log('fetching user bands for: ' + user._id);
         try {
                 const bands = await Band.find( { members: { $in: [user._id]}});
                 console.log("Bands: " + bands);
                 res.status(201).send(bands);
             } catch {
                 console.log("bands not found!");
                 res.status(500).send("bands not found!");
             }
         }catch (err) {
             console.log("Error! " + err)
             res.status(500).send(err);
         }
     })


     //GET USER_BANDS
//getUserBands
router.get('/listBandsByAppleId/', async (req, res) => {
    
    var fetchid = req.get("appleId")
    console.log("fetching user ID: " + fetchid)

    try {
        const user = await User.findOne({appleId: fetchid})
        //console.log("Application ID: " + user._id, "Apple ID: " + user.appleId, "FN: " + user.firstName, "LN: " + user.lastName, "email: " + user.email)
        // .populate({ 
        //         path: 'bands',
        //         model: 'Band'
        //      })
         .exec();

    bands = [];
    console.log('fetching user bands for: ' + user._id);
    try {
            const bands = await Band.find( { members: { $in: [user._id]}});
            console.log("Bands: " + bands);
            res.status(201).send(bands);
        } catch {
            console.log("bands not found!");
            res.status(500).send("bands not found!");
        }
    }catch (err) {
        console.log("Error! " + err)
        res.status(500).send(err);
    }
})
module.exports = router;