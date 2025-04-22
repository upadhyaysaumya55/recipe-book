import React from 'react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search recipes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;