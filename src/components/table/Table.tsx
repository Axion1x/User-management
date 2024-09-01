import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import style from './table.module.css'
import { sortByField } from '../../features/slices/userSlice';
import React, { useState } from 'react'
const Table = () => {
  
  const dispatch = useDispatch();
  const sortField = useSelector((state: RootState) => state.users.sortField);
  const sortOrder = useSelector((state: RootState) => state.users.sortOrder);
  const [visibleCount, setVisibleCount] = useState(5)

  const handleSort = (field: 'name' | 'username' | 'email' | 'phone') => {
    dispatch(sortByField(field));
  };

  const loadMore = () => {
    setVisibleCount((prevCount):number => prevCount + 5);
  };
  const { users, filters } = useSelector((state: RootState) => state.users);

  const lowerCaseFilters = {
    name: filters.name.toLowerCase(),
    username: filters.username.toLowerCase(),
    email: filters.email.toLowerCase(),
    phone: filters.phone.toLowerCase(),
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(lowerCaseFilters.name) &&
    user.username.toLowerCase().includes(lowerCaseFilters.username) &&
    user.email.toLowerCase().includes(lowerCaseFilters.email) &&
    user.phone.toLowerCase().includes(lowerCaseFilters.phone)
  );

  return (
    <>
    <ul className={style.table}>
        <li className={style.capitalRow}>
          <div onClick={() => handleSort('name')}
            className={style.cell}>
            Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </div>
          <div onClick={() => handleSort('username')}
            className={style.cell}>
            Username {sortField === 'username' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </div>
          <div onClick={() => handleSort('email')}
            className={style.cell}>
            Email {sortField === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </div>
          <div onClick={() => handleSort('phone')}
            className={style.cell}>
            Phone {sortField === 'phone' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </div>
        </li>
        {filteredUsers.slice(0, visibleCount).map((user, index) => (
          <li key={index} className={style.row}>
            <div className={style.cell}>{user.name}</div>
            <div className={style.cell}>{user.username}</div>
            <div className={style.cell}>{user.email}</div>
            <div className={style.cell}>{user.phone}</div>
          </li>
        ))}
        
      </ul>
      {visibleCount < filteredUsers.length && filteredUsers.length > 0 && (
  <button onClick={loadMore} className={style.button}>Load more...</button>
)}
      </>
  )
}

export default Table