const router = require("express").Router();
const Event = require("../models/Event");

//get all event 
router.get("/events", (req, res, next) => {
    Event.find().populate("location")
         .then(events => {
           res.status(200).json(events)
         })
  
         .catch(err => next(err))
  })


//get specific event
router.get("/events/:id", (req, res, next) => {
  console.log("backend", req.params.id)
  Event.findById(req.params.id).populate("location")
          .then(event => {
              console.log("backend",event)
              res.status(200).json(event)
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
    const cost = req.body.cost
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const age = req.body.age
    const genre = req.body.genre
    const ticketLink = req.body.ticketLink

    const lineUp = req.body.lineUp

    Event.create({
      name : name,
      date : date,
      discription : discription,
      location : location,
      cost : cost,
      startTime : startTime,
      endTime : endTime,
      age : age,
      genre : genre,
      ticketLink : ticketLink
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
router.post('/events/edit/:id', (req, res, next) => {
  console.log(req.body)
    //  const { newName, newDate, newLocation } = req.body;
    //  Event.findByIdAndUpdate(req.params.id, { name: newName,  date : newDate , location : newLocation }, { new: true })
    //      .then(updatedProject => {
    //          res.status(200).json(updatedProject);
    //      })
    //      .catch(err => next(err));
 });
 
 
 
 //HOMEPAGE BUT NO OTHER PLACE
 
 router.get("/", (req, res, next) => {
   res.json("All good in here");
 });

module.exports = router;