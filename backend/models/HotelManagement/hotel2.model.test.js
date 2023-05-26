const mongoose = require("mongoose");
const Hotel = require("./hotel.model");

test("add new incomplete(city) hotel to the database", async () => {
  const incompleteData = new Hotel({
    type: "Luxury",
    name: "hotel 01",
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
    expect(error.errors.city).toBeDefined();
  }
});
