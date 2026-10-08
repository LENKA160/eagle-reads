import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LowStockAlert from '../components/LowStockAlert';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('activeSessionUser')) || {};

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('eagleReadsBooks')) || [];
    setBooks(storedBooks);
  }, []);

  const handleRentClick = (index) => {
    const updatedBooks = [...books];
    
    if (updatedBooks[index].qty > 0) {
      updatedBooks[index].qty -= 1;
      setBooks(updatedBooks);
      localStorage.setItem('eagleReadsBooks', JSON.stringify(updatedBooks));

      const logs = JSON.parse(localStorage.getItem('libraryLogs')) || [];
      const timestamp = new Date().toLocaleTimeString();
      logs.unshift(`[${timestamp}] Client [${currentUser.name}] checked out 1 copy of "${updatedBooks[index].title}"`);
      localStorage.setItem('libraryLogs', JSON.stringify(logs));
      
      alert(`Transaction Success! Checked out: "${updatedBooks[index].title}".`);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dash-content">
        <section className="dash-section">
          <h3>📚 Book Inventory Catalog</h3>
          <LowStockAlert books={books} />
          
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Stock Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td><strong>{book.title}</strong></td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td><code>{book.isbn}</code></td>
                  <td>{book.qty}</td>
                  <td>
                    {currentUser.role === 'Client' ? (
                      <button 
                        onClick={() => handleRentClick(index)} 
                        className="btn-sm btn-rent" 
                        disabled={book.qty === 0}
                      >
                        {book.qty === 0 ? 'Out of Stock' : 'Rent'}
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Admin Controls Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
