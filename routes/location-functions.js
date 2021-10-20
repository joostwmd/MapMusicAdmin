const router = require("express").Router();
const Location = require("../models/Location.js");

//get all locations
router.get("/locations", (req, res, next) => {
    console.log("backend")
    Location.find()
            .then(locations => {
              res.status(200).json(locations)
            })
            .catch(err => next(err))
  })

//get specific location
router.get("/locations/:id", (req, res, next) => {
    console.log("backend", req.params.id)
    Location.findById(req.params.id)
            .then(location => {
                console.log("backend",location)
                res.status(200).json(location)
            })
            .catch(err => next(err))
})

//create a location
router.post("/locations", (req, res, next) => {
    const name = req.body.name
    const altitude = req.body.latitude
    const longitude = req.body.longitude
    const discription = req.body.discription
    const nearestStationName = req.body.nearestStation
    const distance = req.body.distance
    const availableLines = req.body.availableLines
    console.log(name, altitude, longitude)
    
    Location.create({
      name : name,
      //check altitude, logitude if correct order
      coordinates : [Number(altitude), Number(longitude)],

    //   discription : discription,
    //   nearestStation : nearestStationName, 
    //   distance : distance,
    //   availableLines : availableLines
    

    })
  
    .then(location => {
      console.log(location)
      res.status(201).json(location)
    })
  })


//delete location
router.delete('/locations/:id', (req, res, next) => {
    console.log(req.params.id);
     Location.findByIdAndDelete(req.params.id)
         .then(() => {
             console.log("gelöscht")
             res.status(200).json({ message: 'location deleted' });
        })
  });

//edit location
router.post('/locations/edit/:id', (req, res, next) => {
	const { newName, newLongitude, newLatitude } = req.body;
	Location.findByIdAndUpdate(req.params.id, { name: newName,  coordinates : [Number(newLatitude), Number(newLongitude)] }, { new: true })
		.then(updatedProject => {
			res.status(200).json(updatedLocation);
		})
		.catch(err => next(err));
});

module.exports = router