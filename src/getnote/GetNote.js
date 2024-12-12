import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoCards = ({ userId }) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        //lina el user id y tjibouh bil useparams bil usl wela juste tjibou el user bil redux wela props tet3ada u choose . 
        const response = await axios.get(`http://localhost:5000/api/todos/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTodos(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Une erreur est survenue");
      }
    };

    fetchTodos();
  }, [userId]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={styles.cardContainer}>
      {todos.map((todo) => (
        <div key={todo._id} style={styles.card}>
          <h3 style={styles.cardTitle}>{todo.title}</h3>
          <p style={styles.cardDescription}>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  cardTitle: {
    margin: "0 0 10px",
    fontSize: "1.5em",
    color: "#333",
  },
  cardDescription: {
    margin: "0",
    color: "#555",
  },
};

export default TodoCards;
