const express = require("express");
const router = express.Router();
const Hotels = require("../../models/HotelManagement/hotel.model");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../frontend/src/components/HotelManagement/HotelImages');
  },
  filename: function(req, file, cb) {   
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage, fileFilter }).array('photos', 10);

router.post("/add/new", async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(422).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { name, type, city, address, distance, title, description, rooms, cheapestprice, featured, rating } = req.body;

    if (!name || !type || !city || !address || !distance || !title || !description || !rooms || !cheapestprice || !featured || !rating) {
      return res.status(422).json("Please enter all data");
    }

    try {
      const photos = req.files.map((file) => file.filename);

      const addhotel = new Hotels({
        name,
        type,
        city,
        address,
        distance,
        title,
        description,
        rooms,
        cheapestprice,
        featured,
        photos,
        rating
      });

      await addhotel.save();
      res.status(201).json(addhotel);
    } catch (error) {
      console.log("Error", error);
      res.status(422).json(error);
    }
  });
});

  router.get("/hotel/view/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const adindividual = await Hotels
        .findById({ _id: id });
      res.status(201).json(adindividual);
    } catch (error) {
      res.status(422).json(error);
    }
  });

  // Get all hotel hotel
router.get("/hotel", async (req, res) => {
  try {
    const hotel = await Hotels.find();
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/hotel/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletead = await Hotels.findByIdAndDelete(id);
    res.status(201).json(deletead);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.put("/hotel/update/:id", async (req, res) => {
    const { name, type, city, address, distance, title, rooms, description, cheapestprice, featured, rating } = req.body;
  if (
    !name || !type || !city || !address || !distance || !title || !rooms || !description || !cheapestprice || !featured || !rating
  ) {
    res.status(422).json("Please enter all data");
    return 0;
  }
  try {
    const { id } = req.params;

    const updatead1 = await Hotels.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updatead1);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/hotel/count", async (req, res) => {
  try {
    total = await Hotels.find().countDocuments();
    /* Sending the users object to the client. */
    res.json({ total: total });
    //console.log(total);
  } catch (err) {
    console.error(err); 
    res.status(500).send();
  }
});

  module.exports = router;