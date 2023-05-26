const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Routes
// const userRoute = require("./routes/userManagement/user.route");
// app.use("/users", userRoute);
 app.use("/bloggers", require("./routes/BlogsManagement/blog.route"));
 app.use("/events", require("./routes/EventsManagement/event.route"));
// app.use("/users", require("./routes/UserManagement/user.route"));
 app.use("/hotels", require("./routes/HotelManagement/hotel.route"));
 app.use("/packages", require("./routes/PackageManagement/package.route"));
 app.use("/events", require("./routes/EventsManagement/event.route"));
 app.use("/user", require("./routes/userManagement/user.router"));
app.use("/", require("./routes/userManagement/authentication.router"));

// Database connection
mongoose
  .connect(process.env.DBLINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
