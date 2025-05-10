import React from 'react';
import './SearchBar.css';

function SearchBar({ searchQuery, setSearchQuery, handleSearch, placeholder }) {
  return (
    <div className='searchinput' style={{ 
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }}>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder || "Search..."}
        value={searchQuery}
        onChange={handleSearch}
        style={{ 
          width: '70%', 
          padding: '12px 20px', 
          borderRadius: '30px', 
          border: '1px solid rgba(204, 204, 204, 0.3)', 
          fontSize: '16px', 
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          color: '#333',
          transition: 'all 0.3s ease',
          outline: 'none',
          textAlign: 'center'
        }}
      />
    </div>
  );
}

export default SearchBar;
