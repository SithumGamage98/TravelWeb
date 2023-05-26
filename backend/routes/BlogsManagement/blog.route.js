const express = require("express");
const router = express.Router();
const Bloggers = require("../../models/BlogsManagement/blog.model");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../frontend/src/components/BlogsManagement/Photos');
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

    const { blogtitle, blogdescription, date, bloggername, rating } = req.body;

    if (!blogtitle || !blogdescription || !date || !bloggername || !rating) {
      return res.status(422).json("Please enter all data");
    }

    try {
      const photos = req.files.map((file) => file.filename);

      const addblog = new Bloggers({
        blogtitle,
        blogdescription,
        date,
        bloggername,
        photos,
        rating
      });

      await addblog.save();
      res.status(201).json(addblog);
    } catch (error) {
      console.log("Error", error);
      res.status(422).json(error);
    }
  });
});

  router.get("/blogs/view/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const adindividual = await Bloggers
        .findById({ _id: id });
      res.status(201).json(adindividual);
    } catch (error) {
      res.status(422).json(error);
    }
  });

  // Get all hotel blogs
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Bloggers.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/blogs/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletead = await Bloggers.findByIdAndDelete(id);
    res.status(201).json(deletead);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.put("/blogs/update/:id", async (req, res) => {
  const { blogtitle, blogdescription, date, bloggername } = req.body;
  if (
    !blogtitle || !blogdescription|| !date|| !bloggername
  ) {
    res.status(422).json("Please enter all data");
    return 0;
  }
  try {
    const { id } = req.params;

    const updatead1 = await Bloggers.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updatead1);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/blog/count", async (req, res) => {
  try {
    total = await Bloggers.find().countDocuments();
    /* Sending the users object to the client. */
    res.json({ total: total });
    //console.log(total);
  } catch (err) {
    console.error(err); 
    res.status(500).send();
  }
});

  module.exports = router;