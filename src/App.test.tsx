import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
import { RootState } from './features/store';

const mockStore = configureStore([]);
let a = 5 +'lazy';
const initialState: RootState = {
  users: {
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
  },
};

test('renders loading indicator when status is loading', () => {
  const store = mockStore({
    ...initialState,
    users: { ...initialState.users, status: 'loading' },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const loadingIndicator = screen.getByText(/Loading.../i);
  expect(loadingIndicator).toBeInTheDocument();
});

test('renders error message when status is failed', () => {
  const store = mockStore({
    ...initialState,
    users: { ...initialState.users, status: 'failed', error: 'Failed to fetch users' },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const errorMessage = screen.getByText(/Error: Failed to fetch users/i);
  expect(errorMessage).toBeInTheDocument();
});

test('renders User Management header, Search and Table components when status is succeeded', () => {
  const store = mockStore({
    ...initialState,
    users: { ...initialState.users, status: 'succeeded' },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const header = screen.getByText(/User Management/i);
  const searchComponent = screen.getByPlaceholderText(/Search by name/i);
  const tableComponent = screen.getAllByText(/Name/i);

  expect(header).toBeInTheDocument();
  expect(searchComponent).toBeInTheDocument();
  expect(tableComponent.length).toBeGreaterThan(0);
});
