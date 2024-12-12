import React, { useState } from "react";
import axios from "axios";

const UpdateTodo = ({ userId, todoId, currentTitle, currentDescription, onUpdate }) => {
  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${userId}/${todoId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess("Tâche mise à jour avec succès!");
      setError("");
      onUpdate(response.data); // Notify parent component to refresh or update state
    } catch (err) {
      setError(err.response?.data?.error || "Une erreur est survenue");
      setSuccess("");
    }
  };

  return (
    <div style={styles.updateContainer}>
      <h3>Modifier la tâche</h3>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <div style={styles.formGroup}>
        <label style={styles.label}>Titre:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        ></textarea>
      </div>
      <button onClick={handleUpdate} style={styles.button}>
        Mettre à jour
      </button>
    </div>
  );
};

const styles = {
  updateContainer: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "400px",
    backgroundColor: "#f9f9f9",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    marginBottom: "10px",
  },
};

export default UpdateTodo;

// dont forget if u update u have to look for it , u can usenavigate 
