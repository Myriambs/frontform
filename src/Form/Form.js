import React, { useState } from "react";
import './Form.css'
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.name) errors.name = "Name is required";
    if (!formData.lastname) errors.lastname = "Last name is required";
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{1,8}$/.test(formData.phone)) {
      errors.phone = "Phone must be numbers only and up to 8 digits";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
        />
        {errors.name && <small className="error-message">{errors.name}</small>}
      </div>

      <div className="form-field">
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className={errors.lastname ? "error" : ""}
        />
        {errors.lastname && (
          <small className="error-message">{errors.lastname}</small>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
        />
        {errors.phone && (
          <small className="error-message">{errors.phone}</small>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
        />
        {errors.email && (
          <small className="error-message">{errors.email}</small>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
        />
        {errors.password && (
          <small className="error-message">{errors.password}</small>
        )}
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
