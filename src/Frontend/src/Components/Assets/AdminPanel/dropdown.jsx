// Dropdown.js
import React, { useState } from 'react';

const Dropdown = ({ title, items, onAddItem, onDeleteItem }) => {
  const [open, setOpen] = useState(false);

  const handleAddItem = () => {
    const newItem = prompt(`Enter new ${title.slice(0, -1)}`); // Prompt user to add a new item
    if (newItem) {
      onAddItem(newItem);
    }
  };

  return (
    <div className="dropdown">
      <button onClick={() => setOpen(!open)} className="dropdown-button">
        {title}
      </button>
      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-item add-new" onClick={handleAddItem}>
            + Add New
          </div>
          {items.map((item, index) => (
            <div key={index} className="dropdown-item">
              {item}
              <button
                className="delete-button"
                onClick={() => onDeleteItem(item)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
