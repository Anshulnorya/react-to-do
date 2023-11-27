// App.js
import React, { useState ,createContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TodoList from './components/TodoList';

// import TodoUpdate from './components/TodoUpdate';
// import TodoDelete from './components/TodoDelete';
import './App.css'
export const AuthContext = createContext();

function App() {

  const [token, setToken] = useState(localStorage.getItem('authToken') || '');
  return (
    <Router>
      <AuthContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todos" element={<TodoList  />} />
      
        {/* <Route path="/todo/:id/update" element={<TodoUpdate />} /> */}
        {/* <Route path="/todo/:id/delete" element={<TodoDelete />} /> */}
      </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
