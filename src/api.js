// api.js
import axios from 'axios';

const apiUrl = 'https://todos-api-aeaf.onrender.com/api/v1';


// Login

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, credentials);
    
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('Invalid credentials'); 
    }
  } catch (error) {
    throw error;
  }
};


//  Fetch Todo

export const fetchTodos = async (accessToken) => {
  try {
    const response = await axios.get(`${apiUrl}/todo/getAll?search=hey`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
console.log(accessToken);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch todos. Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};



export const deleteTodo = async (accessToken, todoId) => {
  // const apiUrl = 'https://todos-api-aeaf.onrender.com/api/v1/todo'; // Correct API endpoint

  try {
    const response = await axios.delete(`${apiUrl}/todo/delete?id=${todoId}`, {
      
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      console.log(`Todo with ID ${todoId} deleted successfully.`);
    } else {
      console.log(`Failed to delete todo with ID ${todoId}. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};


// const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDNmYTAxZTZlMmFmODAwMzQ2Y2VlZjEiLCJuYW1lIjoic2hyZXlhIiwiaWF0IjoxNzAwODA5NDI1LCJleHAiOjE3MDM0MDE0MjV9.GcdpOnWpUyxb2ICfNfiBp-bGcuIxc-3OT6MZMbtlSjU';
// const todoIdToDelete = '6560e7f35f5f0c00332e2119';
export const updatetodo = async (accessToken, updatedTodo) => {
  try {
  console.log(accessToken+"response");
  const response = await axios.put(`${apiUrl}/todo/update?id=${updatedTodo._id}`, updatedTodo, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  });
 
  if (response.status === 200) {
  console.log(`Todo with ID ${updatedTodo._id} updated successfully.`);
  console.log('Updated todo:', response.data);
  return response.data;
  } else {
  throw new Error(`Failed to update todo with ID ${updatedTodo._id}. Status: ${response.status}`);
  }
  } catch (error) {
  console.error('Error:', error.message);
  if (error.response) {
  console.error('Error response:');
  }
  }
 };

// Register
export const register = async (userData) => {
  try {
    
    const response = await axios.post(`${apiUrl}/auth/register`, userData);
    console.log("Server Response:", response.data);

    if (response.status === 201) {
      return response.data; 
    } else {
      console.log(response);
      throw new Error(`Registration failed: ${response.data.message || 'Unknown error'}`);
    }
  } catch (error) {
    throw error;
  }
};
export const createTodo = async (accessToken, newTodo) => {
  try {
    const response = await axios.post(
      `${apiUrl}/todo/create`,
      newTodo,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log('Todo created successfully:', response.data);
      return response.data;
    } else {
      throw new Error(`Failed to create todo. Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};