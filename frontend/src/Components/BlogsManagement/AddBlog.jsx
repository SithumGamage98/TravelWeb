import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const [blogtitle, setBlogTitle] = useState("");
  const [bloggername, setBloggerName] = useState("");
  const [blogdescription, setBlogDescription] = useState("");
  const [date, setDate] = useState("");
  const [photos, setPhotos] = useState([]);
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({}); // State to store validation errors

  const navigate = useNavigate();

  const handleEventImageChange = (e) => {
    setPhotos(e.target.files);
  };

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("blogtitle", blogtitle);
      formData.append("bloggername", bloggername);
      formData.append("blogdescription", blogdescription);
      formData.append("date", date);
      formData.append("rating", rating);
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }

      // Perform form validation before submitting
      if (validateForm()) {
        const result = await axios.post(
          "http://localhost:8060/bloggers/add/new",
          formData
        );

        if (result?.status === 201) {
          alert("Blog added successfully");
          resetForm();
          navigate("/blogs");
          window.location.reload();
        }
      }
    } catch (err) {
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!blogtitle.trim()) {
      errors.blogtitle = "Blog title is required";
    }

    if (!bloggername.trim()) {
      errors.bloggername = "Blogger name is required";
    }

    if (!date) {
      errors.date = "Date is required";
    }

    if (!blogdescription.trim()) {
      errors.blogdescription = "Blog description is required";
    }

    if (rating < 0 || rating > 5) {
      errors.rating = "Rating must be between 0 and 5";
    }

    if (photos.length === 0) {
      errors.photos = "Please select at least one photo";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const resetForm = () => {
    setBlogTitle("");
    setBloggerName("");
    setBlogDescription("");
    setDate("");
    setPhotos([]);
    setRating(0);
    setErrors({});
  };

  return (
    <div className="container mt-5" style={{ width: "800px", height: "700px" }}>
      <h1 className="text-center mb-4">Add a Blog</h1>
      <form onSubmit={addBlog}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Blog Title"
            required
            value={blogtitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            className={`form-control ${errors.blogtitle && "is-invalid"}`}
          />
          {errors.blogtitle && (
            <div className="invalid-feedback">{errors.blogtitle}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Blogger Name"
            required
            value={bloggername}
            onChange={(e) => setBloggerName(e.target.value)}
            className={`form-control ${errors.bloggername && "is-invalid"}`}
          />
          {errors.bloggername && (
            <div className="invalid-feedback">{errors.bloggername}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="date"
            placeholder="Date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`form-control ${errors.date && "is-invalid"}`}
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>
        <div className="mb-3">
          <textarea
            rows={4}
            placeholder="Description"
            required
            value={blogdescription}
            onChange={(e) => setBlogDescription(e.target.value)}
            className={`form-control ${errors.blogdescription && "is-invalid"}`}
          />
          {errors.blogdescription && (
            <div className="invalid-feedback">{errors.blogdescription}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Ratings (0 - 5)"
            required
            min={0}
            max={5}
            step={0.1}
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            className={`form-control ${errors.rating && "is-invalid"}`}
          />
          {errors.rating && (
            <div className="invalid-feedback">{errors.rating}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="file"
            name="photos"
            accept="image/jpeg, image/jpg, image/png"
            required
            multiple
            onChange={(e) => handleEventImageChange(e)}
            className={`form-control ${errors.photos && "is-invalid"}`}
          />
          {errors.photos && (
            <div className="invalid-feedback">{errors.photos}</div>
          )}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Save Blog
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
