const router = require("express").Router();
const Event = require("../models/Event");

//get all event 
router.get("/events", (req, res, next) => {
    Event.find().populate("location")
         .then(events => {
           console.log("response from events route ", events)
           res.status(200).json(events)
         })
  
         .catch(err => next(err))
  })



//create a event

//get all locations for drop down
router.get("/events", (req, res, next) => {
    Location.find()
            .then(locations => {
              console.log("response from location route ", events)
              res.status(200).json(locations)
            })
            .catch(err => next(err))
  })    
  
  
  router.post("/events", (req, res, next) => {
    const name = req.body.name
    const date = req.body.date
    const location =  req.body.location
    const discription = req.body.discription
    const cost = req.body.price
    const startingTime = req.body.startingTime
    const endingTime = req.body.endingTime
    const ageOfEntrance = req.body.ageOfEntrance
    const gerne = req.body.genre
    const lineUp = req.body.lineUp
    console.log("back-end ", lineUp)

    Event.create({
      name : name,
      date : date,
      discription : discription,
      location : location,
      cost : cost,
      startingTime : startingTime,
      endingTime : endingTime,
      ageOfEntrance : ageOfEntrance,
      genre : gerne,
      

    })
  
    .then(event => {
      res.status(201).json(event)
    })
    .catch(err => next(err))
  })


//delete event 
router.delete('/events/:id', (req, res, next) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'location deleted' });
       })
 });
 
 
 
//edit event  
router.put('/events/edit/:id', (req, res, next) => {
     const { newName, newDate, newLocation } = req.body;
     Event.findByIdAndUpdate(req.params.id, { name: newName,  date : newDate , location : newLocation }, { new: true })
         .then(updatedProject => {
             res.status(200).json(updatedProject);
         })
         .catch(err => next(err));
 });
 
 
 
 //HOMEPAGE BUT NO OTHER PLACE
 
 router.get("/", (req, res, next) => {
   res.json("All good in here");
 });

module.exports = router;