import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UsersState } from '../types';

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
  
  export const fetchUser = createAsyncThunk<User[]>(
    'users/fetchUser',
    async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    }
  );
  
  const userSlice = createSlice({
    name: 'users',
    initialState, 
    reducers: {
      setFilters: (state, action: PayloadAction<{ name: string, username: string, email: string, phone: string }>) => {
        state.filters = action.payload;
      },
      setUsers(state, action: PayloadAction<User[]>) {
        state.users = action.payload;
      },
      sortByField(state, action: PayloadAction<'name' | 'username' | 'email' | 'phone'>) {
        const field = action.payload;
  
        if (state.sortField === field) {
          state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          state.sortField = field;
          state.sortOrder = 'asc';
        }
  
        state.users.sort((a, b) => {
          const aValue = a[field] || '';
          const bValue = b[field] || '';
  
          if (aValue < bValue) {
            return state.sortOrder === 'asc' ? -1 : 1;
          } else if (aValue > bValue) {
            return state.sortOrder === 'asc' ? 1 : -1;
          }
          return 0;
        });
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.users = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Unknown error';
        });
    },
  });
  export const { setUsers, sortByField, setFilters } = userSlice.actions;
  export default userSlice.reducer;