const mongoose = require("mongoose");
const Blog = require("./blog.model");

test("add new incomplete(blogtitle) blog to the database", async () => {
  const incompleteData = new Blog({
    blogdescription: "Lorem ipsum dolor sit amet",
    date: "2022-10-27",
    bloggername: "John Doe",
    photos: ["photo1.jpg", "photo2.jpg"],
    rating: 4.5,
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.blogtitle).toBeDefined();
  }
});
