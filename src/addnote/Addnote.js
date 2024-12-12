import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TodoForm = () => {
    //ici le format donc t7otou ey element madhkour fil model si nn bil we7ed 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/todos", formData, {
        //ICI DANS LE CAS T7EBOU TETÉKDOU EL PERSONNE EN REALTION EST AUTHORISE , SI NN U DONT NEED TO ADD IT , EXEMPLE EY USER YNEJEM YZID WELA EL ADMIN KHW DONC FIL COMPOSANT ADMIN TET7AT 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      //partie toas is just the element 
      toast.success(response.data.message); // Notification de succès
      setFormData({ title: "", description: "" }); // Réinitialiser le formulaire
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred"); // Notification d'erreur
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
