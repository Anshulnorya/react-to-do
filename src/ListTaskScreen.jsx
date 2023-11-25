import React, { useState, useEffect } from "react";
import axios from "axios";

const ListTaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://todos-api-aeaf.onrender.com/api/v1/todo/getAll?search=hey",
          {
            headers: {
              Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDNmYTAxZTZlMmFmODAwMzQ2Y2VlZjEiLCJuYW1lIjoic2hyZXlhIiwiaWF0IjoxNzAwNjY0NDI2LCJleHAiOjE3MDMyNTY0MjZ9.v4wae-pw5CY3Odi3rFnhIM0hqEvYxEjdjzERDS9Qz-U", // Replace with your actual authentication token
            },
          }
        );

        setTasks(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Authentication failed. Please check your credentials.");
        } else {
          setError("An error occurred while fetching tasks.");
        }
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <div className="ListTaskScreen">
      <h1>To-Do List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTaskScreen;
