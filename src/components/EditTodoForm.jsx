import React, { useState } from 'react';
import "./EditTodoForm.css"

const EditTodoForm = ({ todo, onSubmit, onCancel }) => {
  const [updatedTitle, setUpdatedTitle] = useState(todo.name);
  const [updatedDescription, setUpdatedDescription] = useState(todo.description);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTodo = {
      ...todo,
      name: updatedTitle,
      description: updatedDescription,
    };
    onSubmit(updatedTodo);
    setLoading(false);
  };

  return (
    <div className='editform'>
      <form onSubmit={handleSubmit} className='formContent' >
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
      <button type="submit" className='editSubmit'>{loading ? 'Updating...' : 'Update Todo'}</button>
      <button type="button" className='editCancel' onClick={onCancel}>
        Cancel
      </button>
    </form>
    </div>
  );
};

export default EditTodoForm;
