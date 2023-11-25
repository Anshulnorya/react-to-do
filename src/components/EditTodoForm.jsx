// EditTodoForm.js
import React, { useState } from 'react';

const EditTodoForm = ({ todo, onSubmit, onCancel }) => {
  const [updatedTitle, setUpdatedTitle] = useState(todo.name);
  const [updatedDescription, setUpdatedDescription] = useState(todo.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTodo = {
      ...todo,
      name: updatedTitle,
      description: updatedDescription,
    };
    onSubmit(updatedTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
      </label>
      <button type="submit">Update Todo</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditTodoForm;
