const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');
var Band = require('../models/Band');
const { ObjectId } = mongoose.Types;

//GET USER
router.get('/getUser/', async (req, res) => {
    var fetchid = req.get("appleId")
    console.log("fetching user ID: " + fetchid)

    try {
        const user = await User.findOne({appleId: fetchid})
        //console.log("Application ID: " + user._id, "Apple ID: " + user.appleId, "FN: " + user.firstName, "LN: " + user.lastName, "email: " + user.email)
        .populate({ 
                path: 'bands',
                model: 'Band'
             })
         .exec();
        console.log("User " + user)
        res.status(201).send(user);

    } catch(exception){
        console.log(exception)
        res.status(500).send("User not found!");
    }
}) 

// FETCH ALL USERS
router.get('/fetch', (req, res) => {
    console.log("fetch all . . .")
    User.find({}).then((DBItems) => {
        res.status(201).send(DBItems);
    })
})

//DELETE A USER BY _ID
//POST REQUEST
router.post('/deleteById/', async (req, res) => {
    deleteid = req.get("id")
    console.log("Deleting ID: " + deleteid)
    try {
        var currentUser = await User.findById(deleteid)
        console.log('user bands: ' + user.bands)
        for(i=0; i > currentUser.bands.length; i++){
            console.log("band: " + currentUser.bands.i.bandName)
        }

        try {
            await User.findByIdAndDelete({_id: deleteid})
        } catch (err) {
            console.log(err)
        }
      } catch (err) {
          console.log(err.message)
          res.status(500).send("Band loop not working");
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
            //build user
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
                console.log("User Not Found.  Building New User " + err.message)
                res.status(500).send("User not saved! " + err.message);
            }
    })

router.post('/addBandToUser/', async (req, res) => {
    userId = req.get('id');
    bandId = req.get('bandId');

    try {
        const result = await User.updateOne(
            {_id: userId},
            { $addToSet: { bands: bandId  } })
            console.log('Band added to user!');
        try {
            const band = await Band.updateOne(
                {_id: bandId},
                { $addToSet: { members: userId  } })
            res.status(201).send('Band added to user.');
        } catch {
            res.status(500).send('Band not found!');
        }
    } catch (err){
        res.status(500).send('User and Band relationship not mapped ' + err);
    }
})


//DELETE A USER FROM BAND BY ID
//POST REQUEST
router.post('/deleteUserFromBand/', async (req, res) => {
    userId = req.get("id")
    bandId = req.get("bandId")
    
    { $toObjectId : userId }
    console.log('Valid ' + mongoose.Types.ObjectId.isValid(userId));
    try {
        const band = await Band.updateOne( { _id: bandId},
        { 
          $pull: { "members": userId}
        })
         res.status(201).send('User removed from band')
    } catch (err) {
        console.log("failed to drop user from band " + err)
        res.status(500).send("Nope")
    }
    // deleteid = req.get("id")
    // console.log("Deleting User " + deleteid + " from band: " + bandId)
    // try {
    //     await User.findByIdAndDelete({_id: deleteid})
    // } catch (err) {
    //     console.log(err)
    // }
    // //const user = await User.findById({id: deleteid}).exec
    // //User.deleteOne(user)
    // return res.send("Deleted ID: " + deleteid)  
})

module.exports = router;

