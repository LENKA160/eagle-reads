import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const BookManagement = () => {
  // Master database state anchors
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Controlled component form field states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [qty, setQty] = useState(0);

  // Sync state data on mounting phase
  useEffect(() => {
    setBooks(JSON.parse(localStorage.getItem('eagleReadsBooks')) || []);
  }, []);

  const handleBookSubmit = (event) => {
    event.preventDefault();
    
    // Construct single clean data asset object matching specifications
    const bookData = {
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      isbn: isbn.trim(),
      qty: parseInt(qty)
    };

    let updatedBooks = [...books];
    const logs = JSON.parse(localStorage.getItem('libraryLogs')) || [];
    const timestamp = new Date().toLocaleTimeString();

    if (editIndex !== null) {
      // Operation context: UPDATE EXISTING ENTRY
      logs.unshift(`[${timestamp}] Librarian updated details for: "${updatedBooks[editIndex].title}"`);
      updatedBooks[editIndex] = bookData;
      setEditIndex(null);
    } else {
      // Operation context: CREATE NEW ENTRY INTO COLLECTIONS
      logs.unshift(`[${timestamp}] Librarian loaded new inventory asset: "${bookData.title}"`);
      updatedBooks.push(bookData);
    }

    // Push states to reactive view array and storage
    setBooks(updatedBooks);
    localStorage.setItem('eagleReadsBooks', JSON.stringify(updatedBooks));
    localStorage.setItem('libraryLogs', JSON.stringify(logs));

    // Reset all state field strings back to default clear formats
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setIsbn('');
    setQty(0);
    setEditIndex(null);
  };

  const startEditMode = (index) => {
    const targetBook = books[index];
    setEditIndex(index);
    
    // Bind current target book details cleanly back to active form states
    setTitle(targetBook.title);
    setAuthor(targetBook.author);
    setGenre(targetBook.genre);
    setIsbn(targetBook.isbn);
    setQty(targetBook.qty);
  };

  const handleDeleteSource = (index) => {
    if (window.confirm(`Delete system inventory file for: "${books[index].title}"?`)) {
      const updatedBooks = [...books];
      const logs = JSON.parse(localStorage.getItem('libraryLogs')) || [];
      const timestamp = new Date().toLocaleTimeString();
      
      logs.unshift(`[${timestamp}] Librarian dropped book item record: "${books[index].title}"`);
      updatedBooks.splice(index, 1);
      
      setBooks(updatedBooks);
      localStorage.setItem('eagleReadsBooks', JSON.stringify(updatedBooks));
      localStorage.setItem('libraryLogs', JSON.stringify(logs));
      
      if (editIndex === index) clearForm();
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dash-content">
        <section className="dash-section">
          <h3>{editIndex !== null ? "✏️ Update Existing Book Details" : "📝 Admin Book Management"}</h3>
          
          <form onSubmit={handleBookSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Genre</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>ISBN</label>
                <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Initial Quantity</label>
                <input type="number" min="0" value={qty} onChange={(e) => setQty(e.target.value)} required />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-success">
                {editIndex !== null ? "Update Book Entry Details" : "Add Book to Inventory"}
              </button>
              {editIndex !== null && (
                <button type="button" className="btn-logout" onClick={clearForm} style={{ padding: '0 20px', borderRadius: '10px' }}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <h3 style={{ marginTop: '40px' }}>📁 Current System Inventory File Registry</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Stock Qty</th>
                <th>Administrative Actions</th>
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
                    <button onClick={() => startEditMode(index)} className="btn-sm btn-edit" style={{ marginRight: '8px' }}>Edit</button>
                    <button onClick={() => handleDeleteSource(index)} className="btn-sm btn-delete">Delete</button>
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

export default BookManagement;
