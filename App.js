import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  if (!token) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="auth-wrapper">
          {showRegister ? (
            <Register onRegister={() => setShowRegister(false)} />
          ) : (
            <Login setToken={setToken} />
          )}
          <button onClick={() => setShowRegister(r => !r)} style={{marginTop: 10}}>
            {showRegister ? 'Back to Login' : 'Register'}
          </button>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard token={token} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
