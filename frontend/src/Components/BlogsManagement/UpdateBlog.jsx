import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateBlog = () => {
  const [blog, setBooking] = useState({
    blogtitle: '',
    bloggername: '',
    blogdescription: '',
    date: '',
    rating: ''
  });
  const [errors, setErrors] = useState({}); // State to store validation errors

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8060/bloggers/blogs/view/${id}`)
      .then((res) => {
        setBooking({
          blogtitle: res.data.blogtitle,
          bloggername: res.data.bloggername,
          blogdescription: res.data.blogdescription,
          date: res.data.date,
          rating: res.data.rating
        });
      })
      .catch((err) => {
        console.log('Unsuccessfully');
      });
  }, [id]);

  const onChange = (e) => {
    setBooking({ ...blog, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Perform form validation before submitting
    if (validateForm()) {
      const data = {
        blogtitle: blog.blogtitle,
        bloggername: blog.bloggername,
        blogdescription: blog.blogdescription,
        date: blog.date,
        rating: blog.rating
      };

      axios
        .put(`http://localhost:8060/bloggers/blogs/update/${id}`, data)
        .then((res) => {
          navigate(`/blogs`);
          alert('Updated successfully....');
        })
        .catch((err) => {
          console.log('Error in UpdateBookInfo!');
        });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!blog.blogtitle.trim()) {
      errors.blogtitle = 'Blog title is required';
    }

    if (!blog.bloggername.trim()) {
      errors.bloggername = 'Blogger name is required';
    }

    if (!blog.date) {
      errors.date = 'Date is required';
    }

    if (!blog.blogdescription.trim()) {
      errors.blogdescription = 'Blog description is required';
    }

    if (blog.rating < 0 || blog.rating > 5) {
      errors.rating = 'Rating must be between 0 and 5';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  return (
    <div className="container mt-5" style={{ width: '800px', height: '700px' }}>
      <div>
        <h1 style={{textAlign:"center"}}>Update blog</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group" style={{ margin: '30px' }}>
            <label>Blog Title</label>
            <br />
            <input
              type="text"
              name="blogtitle"
              placeholder="Blog Title"
              id="blogtitle"
              className={`form-control ${errors.blogtitle && 'is-invalid'}`}
              value={blog.blogtitle}
              onChange={onChange}
              required
            />
            {errors.blogtitle && (
              <div className="invalid-feedback">{errors.blogtitle}</div>
            )}
          </div>
          <div className="form-group" style={{ margin: '30px' }}>
            <label>Blogger Name</label>
            <br />
            <input
              type="text"
              name="bloggername"
              placeholder="Blogger Name"
              id="bloggername"
              className={`form-control ${errors.bloggername && 'is-invalid'}`}
              value={blog.bloggername}
              onChange={onChange}
              required
            />
            {errors.bloggername && (
              <div className="invalid-feedback">{errors.bloggername}</div>
            )}
          </div>
          <div className="form-group" style={{ margin: '30px' }}>
            <label>Date</label>
            <br />
            <input
              type="date"
              name="date"
              placeholder="Date"
              id="date"
              className={`form-control ${errors.date && 'is-invalid'}`}
              value={blog.date}
              onChange={onChange}
              required
            />
            {errors.date && (
              <div className="invalid-feedback">{errors.date}</div>
            )}
          </div>
          <div className="form-group" style={{ margin: '30px' }}>
            <label>Description</label>
            <br />
            <textarea
              type="text"
              name="blogdescription"
              placeholder="Description"
              id="blogdescription"
              className={`form-control ${errors.blogdescription && 'is-invalid'}`}
              value={blog.blogdescription}
              onChange={onChange}
              required
            />
            {errors.blogdescription && (
              <div className="invalid-feedback">{errors.blogdescription}</div>
            )}
          </div>
          <div className="form-group" style={{ margin: '30px' }}>
            <label>Ratings</label>
            <input
              type="number"
              name="rating"
              min={0}
              max={5}
              placeholder="Rating"
              id="rating"
              className={`form-control ${errors.rating && 'is-invalid'}`}
              value={blog.rating}
              onChange={onChange}
              required
            />
            {errors.rating && (
              <div className="invalid-feedback">{errors.rating}</div>
            )}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="/blogs">
              <button
                className="btn btn-secondary"
                style={{ margin: '20px', width: '100px' }}
              >
                Back
              </button>
            </a>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: '20px', width: '100px' }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
