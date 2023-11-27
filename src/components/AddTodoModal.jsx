// AddTodoModal.jsx

import React, { useState } from 'react';

const AddTodoModal = ({ showModal, onClose, onAddTodo }) => {
  const [newTodo, setNewTodo] = useState({
    name: '',
    description: '',
    status: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const handleAddTodo = () => {
    onAddTodo(newTodo);
    setNewTodo({
      name: '',
      description: '',
      status: false,
    });
    onClose();
  };

  return (
    <div className={`modal ${showModal ? 'visible' : ''}`}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Add Todo</h2>
        <div className="modal-inputs">
          <input
            type="text"
            name="name"
            placeholder="Todo Title"
            value={newTodo.name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Todo Description"
            value={newTodo.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="modal-buttons">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
