import React, { useState } from 'react'
import style from './search.module.css'
interface SearchFiltersProps {
  onSearch: (filters: { name: string, username: string, email: string, phone: string }) => void;
  onReset: () => void;
}

const Search:React.FC<SearchFiltersProps> = ({ onSearch, onReset }) => {
  const [filters, setFilters] = useState({ name: '', username: '', email: '', phone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const handlefilters = { ...filters, [e.target.name]: e.target.value }
    setFilters(handlefilters);
    onSearch(handlefilters);
  };

  const handleReset = () => {
    setFilters({ name: '', username: '', email: '', phone: '' });
    onReset();
  };

  return (
    <div className={style.searchContainer}><input
    type="text"
    name="name"
    placeholder="Search by Name"
    value={filters.name}
    onChange={handleChange}
    className={style.search}
  />
  <input
    type="text"
    name="username"
    placeholder="Search by Username"
    value={filters.username}
    onChange={handleChange}
    className={style.search}
  />
  <input
    type="text"
    name="email"
    placeholder="Search by Email"
    value={filters.email}
    onChange={handleChange}
    className={style.search}
  />
  <input
    type="text"
    name="phone"
    placeholder="Search by Phone"
    value={filters.phone}
    onChange={handleChange}
    className={style.search}
  />
  <button onClick={handleReset} className={style.button}>X</button></div>
  )
}

export default Search