const router = require("express").Router();
const User = require("../../models/userManagement/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validation = require("../../utils/UserManagement/validation.util");
const service = require("../../utils/UserManagement/service.util");
const email = require("../../utils/UserManagement/email.util");

/* The above code is a route handler for the /register route. It is used to register a new user. */
router.post("/register", async (req, res) => {
  try {
    /* Validating the request body using the Joi schema. */
    const validated = await validation.userRegisterSchema.validateAsync(
      req.body
    );

    /* Checking if the email is already in the database. */
    const user = await User.findOne({ email: validated.email });

    /* Checking if the email is already in the database. */
    if (user)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.password, salt);

    // save a new user account to the db
    const newUser = new User({
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      // mobile: validated.mobile,
      // dob: validated.dob,
      // country: validated.country,
      passwordHash: passwordHash,
      userType: validated.userType,
    });

    /* Saving the new User to the database. */
    const savedUser = await newUser.save();

    //email verification
    const token = await service.getVerifyToken(savedUser._id);

    /* Sending an verification email to the user. */
    await email.sendVeri(
      savedUser.email,
      savedUser.firstName,
      savedUser._id,
      token.token
    );

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Verification Email sent to your email." });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

module.exports = router;
