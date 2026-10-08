import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const ClientManagement = () => {
  // Master database state anchors
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Controlled component input states
  const [name, setName] = useState('');
  const [cardId, setCardId] = useState('');
  const [role, setRole] = useState('Client');

  // Load registered client files on mounting phase
  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('eagleReadsUsers')) || []);
  }, []);

  const handleClientSubmit = (event) => {
    event.preventDefault();

    const clientData = {
      name: name.trim(),
      cardId: cardId.trim(),
      role: role,
      avatar: "red.png"
    };

    let updatedUsers = [...users];
    const logs = JSON.parse(localStorage.getItem('libraryLogs')) || [];
    const timestamp = new Date().toLocaleTimeString();

    if (editIndex !== null) {
      // Operation context: UPDATE EXISTING PROFILE
      logs.unshift(`[${timestamp}] Librarian updated profile details for: "${updatedUsers[editIndex].name}"`);
      updatedUsers[editIndex] = clientData;
      setEditIndex(null);
    } else {
      // Operation context: CREATE NEW PROFILE RECORD
      // Validation check: ensure membership ID string is completely unique
      const idExists = users.some(u => u.cardId === cardId.trim());
      if (idExists) {
        alert("This Membership ID is already claimed, try a different card string.");
        return;
      }
      logs.unshift(`[${timestamp}] Librarian created profile file for: "${clientData.name}"`);
      updatedUsers.push(clientData);
    }

    setUsers(updatedUsers);
    localStorage.setItem('eagleReadsUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('libraryLogs', JSON.stringify(logs));

    clearForm();
  };

  const clearForm = () => {
    setName('');
    setCardId('');
    setRole('Client');
    setEditIndex(null);
  };

  const startEditMode = (index) => {
    const targetUser = users[index];
    setEditIndex(index);
    setName(targetUser.name);
    setCardId(targetUser.cardId);
    setRole(targetUser.role);
  };

  const handleRevokeCard = (index) => {
    if (window.confirm(`Revoke membership records for ${users[index].name}?`)) {
      const updatedUsers = [...users];
      const logs = JSON.parse(localStorage.getItem('libraryLogs')) || [];
      const timestamp = new Date().toLocaleTimeString();

      logs.unshift(`[${timestamp}] Librarian terminated profile file for: ${users[index].name}`);
      updatedUsers.splice(index, 1);

      setUsers(updatedUsers);
      localStorage.setItem('eagleReadsUsers', JSON.stringify(updatedUsers));
      localStorage.setItem('libraryLogs', JSON.stringify(logs));

      if (editIndex === index) clearForm();
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dash-content">
        <section className="dash-section">
          <h3>{editIndex !== null ? "✏️ Update Profile Details" : "👥 System Client Accounts"}</h3>
          
          <form onSubmit={handleClientSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Legal Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Membership Card ID</label>
                <input type="text" value={cardId} onChange={(e) => setCardId(e.target.value)} disabled={editIndex !== null} required />
              </div>
              <div className="form-group">
                <label>Profile Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="Client">Standard Library Client</option>
                  <option value="Librarian">Librarian (Administrative Rights)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-success">
                {editIndex !== null ? "Update User Account" : "Issue Membership Card"}
              </button>
              {editIndex !== null && (
                <button type="button" className="btn-logout" onClick={clearForm} style={{ padding: '0 20px', borderRadius: '10px' }}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <h3 style={{ marginTop: '40px' }}>📁 Registered Client Registry</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Membership Card ID</th>
                <th>Profile Role</th>
                <th>Administrative Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td><code>{user.cardId}</code></td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => startEditMode(index)} className="btn-sm btn-edit" style={{ marginRight: '8px' }}>Update</button>
                    <button onClick={() => handleRevokeCard(index)} className="btn-sm btn-delete">Revoke Card</button>
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

export default ClientManagement;
