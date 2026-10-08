import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const ActionLogs = () => {
  const [logs, setLogs] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('activeSessionUser')) || { name: 'Guest', role: 'Client' };

  // Fetch active ledger items on mounting phase
  useEffect(() => {
    const databaseLogs = JSON.parse(localStorage.getItem('libraryLogs')) || [];
    setLogs(databaseLogs);
  }, []);

  // Filter items: Librarians read everything; Clients see actions containing their specific name
  const filteredLogs = currentUser.role === 'Librarian'
    ? logs
    : logs.filter(log => log.includes(`[${currentUser.name}]`));

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dash-content">
        <section className="dash-section">
          <h3>🕒 Library Action History Log</h3>
          <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '0.9rem' }}>
            {currentUser.role === 'Librarian' 
              ? "Displaying master administrative system audit logs." 
              : `Displaying active rental logs for client profile: ${currentUser.name}`}
          </p>
          
          <ul className="log-list" id="transaction-log-list" style={{ paddingLeft: '0', listStyle: 'none' }}>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <li key={index} style={{
                  padding: '12px 15px',
                  backgroundColor: '#f8fafc',
                  borderLeft: '4px solid var(--accent)',
                  marginBottom: '8px',
                  borderRadius: '0 8px 8px 0',
                  fontSize: '0.95rem',
                  color: '#334155',
                  fontFamily: 'monospace'
                }}>
                  {log}
                </li>
              ))
            ) : (
              <li style={{ padding: '12px', color: '#94a3b8', fontStyle: 'italic' }}>No actions registered in this tracking cycle.</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ActionLogs;
