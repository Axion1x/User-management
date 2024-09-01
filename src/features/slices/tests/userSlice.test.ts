import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setFilters, setUsers, sortByField } from '../userSlice';
import { User, UsersState } from '../../types';

describe('userSlice reducer', () => {
  const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null,
    sortField: null,
    sortOrder: 'asc',
    filters: {
      name: '',
      username: '',
      email: '',
      phone: '',
    },
  };

  test('should handle initial state', () => {
    const store = configureStore({ reducer: userReducer });
    const state = store.getState();
    expect(state).toEqual(initialState);
  });

  test('should handle setFilters', () => {
    const filters = { name: 'John', username: 'johndoe', email: '', phone: '' };
    const action = setFilters(filters);
    const state = userReducer(initialState, action);
    expect(state.filters).toEqual(filters);
  });

  test('should handle setUsers', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john.doe@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane.doe@example.com', phone: '123-456-7891' },
    ];
    const action = setUsers(users);
    const state = userReducer(initialState, action);
    expect(state.users).toEqual(users);
  });

  test('should handle sortByField', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john.doe@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane.doe@example.com', phone: '123-456-7891' },
    ];
    const initialStateWithUsers = { ...initialState, users };
    
    let action = sortByField('name');
    let state = userReducer(initialStateWithUsers, action);
    expect(state.users[0].name).toBe('Jane Doe');
    
    action = sortByField('name');
    state = userReducer(state, action);
    expect(state.users[0].name).toBe('John Doe');
  });
});
