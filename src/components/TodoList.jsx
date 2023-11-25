// TodoList.js

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';
import { fetchTodos , deleteTodo,updatetodo} from '../api';
import './ToDoList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoList = () => {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState(null);

  const handleCheckboxChange = (todoId) => {
    // Update the state to reflect the change in status
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo._id === todoId ? { ...todo, status: !todo.status } : todo
      );
      const updatedTodo = updatedTodos.find((todo) => todo._id === todoId);
      // console.log(updatedTodo);
      // Call updatetodo with the updated todo
      updatetodo(token, updatedTodo);
   
      return updatedTodos;
    });
   };
   

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos(token);
        setTodos(data);
      } catch (error) {
        // Handle error if needed
      }
    };

    getTodos();
  }, [token]);

  const filteredTodos = todos.filter(
    (todo) =>
      todo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteIconClick = async (todoId) => {
   
   
    setDeletingTodoId(todoId);
    setShowModal(true);
    console.log('showModal:', showModal);
    console.log('deletingTodoId:', deletingTodoId);
  };
  
  const handleDeleteConfirmation = async () => {
    setShowModal(false);

    if (deletingTodoId) {
      // const confirmDelete = window.confirm('Are you sure you want to delete this todo?');

      // if (confirmDelete) {
        try {
          await deleteTodo(token, deletingTodoId);
          const updatedTodos = todos.filter((todo) => todo._id !== deletingTodoId);
          setTodos(updatedTodos);
          console.log(`Todo with ID ${deletingTodoId} deleted successfully.`);
        } catch (error) {
          console.error(`Failed to delete todo with ID ${deletingTodoId}. Error: ${error.message}`);
        }
      // }
    }
    console.log('showModal:', showModal);
    console.log('deletingTodoId:', deletingTodoId);
    setDeletingTodoId(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeletingTodoId(null);
  };
  return (
    <div className="todo-container">
      <h2>Todo List</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div
            key={todo._id}
            className={`todo-item ${todo.status ? 'completed' : ''}`}
          >
            <div className="todo-header">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => handleCheckboxChange(todo._id)}
                />
                <span className="slider"></span>
              </label>
              <FontAwesomeIcon
        icon={faTrash}
        className="delete-icon"
        onClick={() => handleDeleteIconClick(todo._id)}
      />
            </div>
            <div className="todo-details">
              <div className="todo-text">
                  <h3>Title: {todo.name}</h3>
              
                <p>Description: {todo.description}</p>
                <p className="meta">
                  Status: {todo.status ? 'Completed' : 'Incomplete'}
                  
                </p>
                <p>{todo._id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


      {showModal && (
        <div className={`modal ${showModal ? 'visible' : ''}`}>
          <div className="modal-content">
            <p>Are you sure you want to delete this todo?</p>
            <div className="modal-buttons">
              <button className="cancel" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="confirm" onClick={handleDeleteConfirmation}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
