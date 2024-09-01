import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Table from './Table';
import { RootState } from '../../features/store';
import { sortByField } from '../../features/slices/userSlice';

const mockStore = configureStore([]);

describe('Table Component', () => {
  let store: ReturnType<typeof mockStore>;

  const initialState: RootState = {
    users: {
      users: [
        { id: 1, name: 'John Doe', username: 'johndoe', email: 'john.doe@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane.doe@example.com', phone: '123-456-7891' },
        { id: 3, name: 'Sam Smith', username: 'samsmith', email: 'sam.smith@example.com', phone: '123-456-7892' },
        { id: 4, name: 'Emily Johnson', username: 'emilyjohnson', email: 'emily.johnson@example.com', phone: '123-456-7893' },
        { id: 5, name: 'Michael Brown', username: 'michaelbrown', email: 'michael.brown@example.com', phone: '123-456-7894' },
        { id: 6, name: 'Sarah Davis', username: 'sarahdavis', email: 'sarah.davis@example.com', phone: '123-456-7895' },
      ],
      status: 'succeeded',
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

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders table with users', () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('sorts by name when clicking on the "Name" header', () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    const actions = store.getActions();
    expect(actions).toContainEqual(sortByField('name'));
  });

  test('loads more users when "Load more" button is clicked', () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const loadMoreButton = screen.getByText('Load more...');
    fireEvent.click(loadMoreButton);
});

  test('does not show "Load more" button if all users are visible', () => {
    store = mockStore({
      ...initialState,
      users: {
        ...initialState.users,
        users: [
          { id: 1, name: 'John Doe', username: 'johndoe', email: 'john.doe@example.com', phone: '123-456-7890' },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    expect(screen.queryByText('Load more...')).not.toBeInTheDocument();
  });
});