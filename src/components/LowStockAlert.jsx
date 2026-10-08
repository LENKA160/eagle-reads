import React from 'react';

const LowStockAlert = ({ books }) => {
  // Filter out books that have fewer than 2 copies left in stock
  const lowStockTitles = books
    .filter(book => book.qty < 2)
    .map(book => book.title);

  if (lowStockTitles.length === 0) return null;

  return (
    <div className="low-stock-badge">
      ⚠️ Low Stock Warning (&lt; 2 copies): {lowStockTitles.join(', ')}
    </div>
  );
};

export default LowStockAlert;
