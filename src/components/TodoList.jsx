// TodoList.js

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { fetchTodos, deleteTodo, updatetodo, createTodo } from '../api';
import './ToDoList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTodoForm from './EditTodoForm';

const TodoList = () => {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [newTodo, setNewTodo] = useState({
    name: '',
    description: '',
    status: false,
  });

  const handleCheckboxChange = (todoId) => {
    // Update the state to reflect the change in status
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo._id === todoId ? { ...todo, status: !todo.status } : todo
      );
      const updatedTodo = updatedTodos.find((todo) => todo._id === todoId);
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

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase());
  
    switch (selectedFilter) {
      case 'active':
        return matchesSearch && !todo.status;
      case 'completed':
        return matchesSearch && todo.status;
      default:
        return matchesSearch; 
    }
  });
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowFilterMenu(false);
  };
   const toggleFilterMenu = () => {
    setShowFilterMenu((prev) => !prev);
  };
  
  const handleDeleteIconClick = async (todoId) => {
    setDeletingTodoId(todoId);
    setShowModal(true);
  };

  const handleDeleteConfirmation = async () => {
    setShowModal(false);

    if (deletingTodoId) {
      try {
        await deleteTodo(token, deletingTodoId);
        const updatedTodos = todos.filter((todo) => todo._id !== deletingTodoId);
        setTodos(updatedTodos);
        console.log(`Todo with ID ${deletingTodoId} deleted successfully.`);
      } catch (error) {
        console.error(
          `Failed to delete todo with ID ${deletingTodoId}. Error: ${error.message}`
        );
      }
    }

    setDeletingTodoId(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeletingTodoId(null);
  };

  const handleEditIconClick = (todo) => {
    setEditingTodo(todo);
  };

  const handleEditSubmit = async (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );

    try {
      await updatetodo(token, updatedTodo);
      console.log(`Todo with ID ${updatedTodo._id} updated successfully.`);
    } catch (error) {
      console.error(
        `Failed to update todo with ID ${updatedTodo._id}. Error: ${error.message}`
      );
    }

    setEditingTodo(null);
  };

  const handleNewTodoInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const handleAddTodoSubmit = async () => {
    try {
      const response = await createTodo(token, newTodo);
      setTodos((prevTodos) => [...prevTodos, response]);
      setNewTodo({
        name: '',
        description: '',
        status: false,
      });
    } catch (error) {
      console.error('Error creating todo:', error.message);
    }
  };

  const renderAddTodoCard = () => (
    <div className="todo-item add-todo-card">
      <div className="todo-details">
        <div className="todo-text">
          <input
            type="text"
            name="name"
            placeholder="Todo Title"
            value={newTodo.name}
            onChange={handleNewTodoInputChange}
          />
          <textarea
            name="description"
            placeholder="Todo Description"
            value={newTodo.description}
            onChange={handleNewTodoInputChange}
          />
          <button onClick={handleAddTodoSubmit}>Add Todo</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      
      <div className="search-bar">
      <div className="action-menu">
          <div className="filter-button" onClick={toggleFilterMenu}>
            {selectedFilter === 'all' ? 'All' : selectedFilter === 'active' ? 'Active' : 'Completed'}
          </div>
          {showFilterMenu && (
            <div className="dropdown-menu">
              <div className="menu-option" onClick={() => handleFilterChange('all')}>All</div>
              <div className="menu-option" onClick={() => handleFilterChange('active')}>Active</div>
              <div className="menu-option" onClick={() => handleFilterChange('completed')}>Completed</div>
            </div>
          )}
        </div>
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
              <FontAwesomeIcon
                icon={faEdit}
                className="edit-icon"
                onClick={() => handleEditIconClick(todo)}
              />
            </div>
            <div className="todo-details">
              <div className="todo-text">
                <h3>Title: {todo.name}</h3>

                <p>Description: {todo.description}</p>
                <p className="meta">Status: {todo.status ? 'Completed' : 'Incomplete'}</p>
          
              </div>
            </div>
          </div>
        ))}
        {renderAddTodoCard()}
      </div>

      {editingTodo && (
        <EditTodoForm
          todo={editingTodo}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingTodo(null)}
        />
      )}

      {showModal && (
        <div className={`modal ${showModal ? 'visible' : ''}`}>
          <div className="modal-content">
            <span className="close-button" onClick={handleCancelDelete}>
              &times;
            </span>
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
