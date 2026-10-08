import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookManagement from './pages/BookManagement';
import ProtectedRoute from './components/ProtectedRoute';
import ClientManagement from './pages/ClientManagement';
import ActionLogs from './pages/ActionLogs';



// Safe temporary placeholders so the router doesn't crash before files are built
const ClientManagementPlaceholder = () => (
  <div className="dashboard-container">
    <h2>System Client Accounts</h2>
    <p>Client page under construction...</p>
  </div>
);

const ActionLogsPlaceholder = () => (
  <div className="dashboard-container">
    <h2>Library Action History Log</h2>
    <p>Logs page under construction...</p>
  </div>
);

function App() {
  useEffect(() => {
    const initialBooks = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", isbn: "9780743273565", qty: 5 },
      { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", isbn: "9780061120084", qty: 1 },
      { title: "1984", author: "George Orwell", genre: "Dystopian", isbn: "9780451524935", qty: 4 }
    ];
    
    if (!localStorage.getItem('eagleReadsBooks')) {
      localStorage.setItem('eagleReadsBooks', JSON.stringify(initialBooks));
    }
    if (!localStorage.getItem('libraryLogs')) {
      localStorage.setItem('libraryLogs', JSON.stringify(["Database link online."]));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        
        <Route path="/manage-books" element={
          <ProtectedRoute><BookManagement /></ProtectedRoute>
        } />
        
        <Route path="/manage-clients" element={
          <ProtectedRoute><ClientManagementPlaceholder /></ProtectedRoute>
        } />
        
        <Route path="/logs" element={
          <ProtectedRoute><ActionLogsPlaceholder /></ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/manage-clients" element={
  <ProtectedRoute><ClientManagement /></ProtectedRoute>
} />
<Route path="/logs" element={
  <ProtectedRoute><ActionLogs /></ProtectedRoute>
} />


      </Routes>
    </Router>
  );
}

export default App;
