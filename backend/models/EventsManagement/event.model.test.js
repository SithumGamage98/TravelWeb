const mongoose = require("mongoose");
const Event = require("./event.model");

test("add new incomplete(eventname) event to the database", async () => {
  const incompleteData = new Event({
    category: "Music",
    month: "June",
    place: "Concert Hall",
    description: "Lorem ipsum dolor sit amet",
    photos: ["photo1.jpg", "photo2.jpg"],
    rating: 4.5,
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.eventname).toBeDefined();
  }
});
