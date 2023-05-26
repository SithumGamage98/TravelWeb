const mongoose = require("mongoose");
const Hotel = require("./hotel.model");

test("add new incomplete(name) hotel to the database", async () => {
  const incompleteData = new Hotel({
    type: "Luxury",
    city: "New York",
    address: "123 Main Street",
    distance: "2 miles",
    title: "Luxury Hotel",
    description: "Lorem ipsum dolor sit amet",
    rooms: "10",
    cheapestprice: "$200",
    featured: "true",
    photos: ["photo1.jpg", "photo2.jpg"],
    rating: 4.5,
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.name).toBeDefined();
  }
});
