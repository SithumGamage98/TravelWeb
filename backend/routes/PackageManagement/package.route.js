const express = require("express");
const router = express.Router();
const Packages = require("../../models/PackageManagement/package.model");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../frontend/src/components/PackageManagement/PackageImages');
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

    const { packagename, packagedestination, packageid, distance, accomodation, locationtype, numofdays, days, featured, numofpassengers, totalprice, details , instructions, rating } = req.body;

    if (!packagename || !packagedestination || !packageid || !distance || !accomodation || !locationtype || !numofdays|| !days || !featured || !numofpassengers || !totalprice || !details || !instructions || !rating) {
      return res.status(422).json("Please enter all data");
    }

    try {
      const photos = req.files.map((file) => file.filename);

      const addpackage = new Packages({
        packagename,
        packagedestination,
        packageid,
        distance,
        accomodation,
        locationtype,
        numofdays,
        days,
        numofpassengers,
        photos,
        totalprice,
        details,
        instructions,
        rating,
        featured
      });

      await addpackage.save();
      res.status(201).json(addpackage);
    } catch (error) {
      console.log("Error", error);
      res.status(422).json(error);
    }
  });
});

  router.get("/package/view/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const adindividual = await Packages
        .findById({ _id: id });
      res.status(201).json(adindividual);
    } catch (error) {
      res.status(422).json(error);
    }
  });

  // Get all hotel packages
router.get("/package", async (req, res) => {
  try {
    const packages = await Packages.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/package/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletead = await Packages.findByIdAndDelete(id);
    res.status(201).json(deletead);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.put("/package/update/:id", async (req, res) => {
  const { packagename, packagedestination, packageid, distance, accomodation, locationtype, numofdays, featured, days, numofpassengers, totalprice, details , instructions, rating } = req.body;
  if (
    !packagename || !packagedestination || !packageid || !distance || !accomodation || !locationtype || !numofdays|| !featured || !days || !numofpassengers || !totalprice || !details || !instructions || !rating
  ) {
    res.status(422).json("Please enter all data");
    return 0;
  }
  try {
    const { id } = req.params;

    const updatead1 = await Packages.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updatead1);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/pack/count", async (req, res) => {
  try {
    total = await Packages.find().countDocuments();
    /* Sending the users object to the client. */
    res.json({ total: total });
    //console.log(total);
  } catch (err) {
    console.error(err); 
    res.status(500).send();
  }
});

  module.exports = router;