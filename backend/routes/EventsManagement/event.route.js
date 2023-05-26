const express = require('express');
const router = express.Router();
const Events = require('../../models/EventsManagement/event.model');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const userAccess = require('../../middleware/accessChecker').userAccess;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/src/components/EventsManagement/EventImages');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter }).array('photos', 10);

router.post('/add/new', userAccess, async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(err); // Pass the error to the error-handling middleware
    } else if (err) {
      return next(err); // Pass the error to the error-handling middleware
    }

    const { eventname, category, month, place, description, rating } = req.body;

    if (
      !eventname ||
      !category ||
      !month ||
      !place ||
      !description ||
      !rating
    ) {
      return res.status(422).json('Please enter all data');
    }

    try {
      const photos = req.files.map((file) => file.filename);

      const addevent = new Events({
        eventname,
        category,
        month,
        place,
        description,
        photos,
        rating,
      });

      await addevent.save();
      res.status(201).json(addevent);
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  });
});

router.get('/event/view/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const adindividual = await Events.findById({ _id: id });
    res.status(201).json(adindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Get all Event event
router.get('/event', userAccess, async (req, res) => {
  try {
    const events = await Events.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/event/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletead = await Events.findByIdAndDelete(id);
    res.status(201).json(deletead);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.put('/event/update/:id', async (req, res) => {
  const { eventname, category, month, place, description, rating } = req.body;
  if (!eventname || !category || !month || !place || !description || !rating) {
    res.status(422).json('Please enter all data');
    return 0;
  }
  try {
    const { id } = req.params;

    const updatead1 = await Events.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updatead1);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get('/event/count', async (req, res) => {
  try {
    total = await Events.find().countDocuments();
    /* Sending the users object to the client. */
    res.json({ total: total });
    //console.log(total);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
