import React, { useState, useEffect } from 'react';

const App = () => {

  const [formData, setFormData] = useState({});
  const [category, setCategory] = useState([]);
  const [error, setError] = useState({});
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  const languages = [
    "English",
    "Hindi",
    "Gujarati",
    "Bengali",
    "Punjabi"
  ];

  const handleChange = (e) => {
    let { name, value, checked } = e.target;

    if (name == 'category') {
      let newCategory = [...category]
      if (checked) {
        newCategory.push(value)
      } else {
        newCategory = newCategory.filter((lang) => lang !== value);
      }
      setCategory(newCategory);
      value = newCategory
    }

    setFormData({ ...formData, [name]: value })
  };

  const handelSubmit = async(e) => {
    e.preventDefault();
    if (!validation())
      return
    console.log(formData);

    if (editId != null) {
      const newList = list.map((item) => {
        if (item.id == editId) {
          return { ...formData, id: editId }
        }
        return item;
      });

      setList(newList);
      localStorage.setItem("book-list", JSON.stringify(newList));
      setFormData({});
      setEditId(null);
    }

    else {
      const newList = [...list, { ...formData, id: Date.now()}];
      setList(newList);
      localStorage.setItem("book-list", JSON.stringify(newList));
      setFormData({});
      setCategory([]);
    }
  };

  const handleDelete = (id) => {
    const newList = list.filter(
      (item) => item.id !== id
    );

    setList(newList);

    localStorage.setItem(
      "book-list",
      JSON.stringify(newList)
    );
  };
  const handleEdit = (id) => {
    const data = list.find(
      (item) => item.id === id
    );

    setFormData(data);
    setCategory(data.category)
    setEditId(id);
  };


  const validation = () => {
    let error = {};
    if (!formData.title || formData.title?.trim().length == 0) error.title = "Title is required";
    if (!formData.author || formData.author?.trim().length == 0) error.author = "Author is required";
    if (formData.length === 0) error.category = "Please select at least one category";
    if (!formData.price || formData.price?.trim().length == 0) error.price = "price is required";
    if (!formData.quantity || formData.quantity?.trim().length == 0) error.quantity = "quantity is required";
    if (!formData.languages) error.languages = "Please select a language";
    if (!formData.description || formData.description?.trim().length == 0) error.description = "description is required";


    setError(error);
    return Object.keys(error).length === 0;
  }
  useEffect(() => {
    const oldData = JSON.parse(
      localStorage.getItem("book-list")
    );

    if (oldData) {
      setList(oldData);
    }
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">

            <h2 className="text-center mb-4">Add New Book</h2>

            <form method='post' action='' onSubmit={handelSubmit}>
              <div className="mb-3">
                <label className="form-label">Book Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  placeholder="Enter Book Title" />
                {error.title && (
                  <p className="text-danger mt-1">
                    {error.title}
                  </p>
                )}
              </div>

              {/* Author Name */}
              <div className="mb-3">
                <label className="form-label">Author Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={formData.author || ""}
                  onChange={handleChange}
                  placeholder="Enter Author Name"
                />
                {error.author && (
                  <p className="text-danger mt-1">
                    {error.author}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label">
                  Categories
                </label>
                {error.category && (
                  <p className="text-danger mt-1">
                    {error.category}
                  </p>
                )}
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="category"
                    value={"Fiction"}
                    onChange={handleChange}
                    checked={category.includes("Fiction")}
                  />
                  <label className="form-check-label">
                    Fiction
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="category"
                    value="Science"
                    onChange={handleChange}
                    checked={category.includes("Science")}
                  />
                  <label className="form-check-label">
                    Science
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="category"
                    value="Motivation"
                    onChange={handleChange}
                    checked={category.includes("Motivation")}

                  />
                  <label className="form-check-label">
                    Motivation
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="category"
                    value=" Non-Fiction"
                    onChange={handleChange}
                    checked={category.includes(" Non-Fiction")}
                  />
                  <label className="form-check-label">
                    Non-Fiction
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="category"
                    value=" Boipic"
                    onChange={handleChange}
                    checked={category.includes(" Boipic")}

                  />
                  <label className="form-check-label">
                    Boipic
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="category"
                    value=" Motivational"
                    onChange={handleChange}
                    checked={category.includes(" Motivational")}

                  />
                  <label className="form-check-label">
                    Motivational
                  </label>
                </div>
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleChange}
                  placeholder="Enter Price"
                />
                {error.price && (
                  <p className="text-danger mt-1">
                    {error.author}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={formData.quantity || ""}
                  onChange={handleChange}
                  placeholder="Enter Quantity"
                />
              </div>

              {/* Language */}
              <div className="mb-3">
                <label className="form-label">Language</label>
                <select
                  className="form-select"
                  defaultValue=""
                  name="languages"
                  value={formData.languages || ""}
                  onChange={handleChange}>
                  <option value="" disabled>Choose Language</option>
                  {languages.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {error.languages && (
                  <p className="text-danger mt-1">
                    {error.languages}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  placeholder="Enter Book Description"
                ></textarea>
                {error.description && (
                  <p className="text-danger mt-1">
                    {error.description}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                {editId ? "Update Book" : "Add Book"}
              </button>
            </form>
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="col-md-12">
            <table className="table table-bordered table-responsive mt-4 caption-top">
              <caption><h2 className='text-center text-black m-4'>List</h2></caption>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Languages</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.length > 0 ? (
                  list.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.author}</td>

                      {/* Category Array */}
                      <td>{item.category?.join(", ")}</td>

                      <td>{item.price}</td>
                      <td>{item.quantity}</td>

                      {/* Language */}
                      <td>{item.languages}</td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-danger me-2"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>

                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No Books Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
