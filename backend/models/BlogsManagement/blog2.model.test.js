const mongoose = require("mongoose");
const Blog = require("./blog.model");

test("add new incomplete(blogdescription) blog to the database", async () => {
  const incompleteData = new Blog({
    blogtitle: "title 01",
    date: "2022-10-27",
    bloggername: "John Doe",
    photos: ["photo1.jpg", "photo2.jpg"],
    rating: 4.5,
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.blogdescription).toBeDefined();
  }
});
