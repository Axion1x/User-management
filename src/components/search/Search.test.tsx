import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search';

const mockOnSearch = jest.fn();
const mockOnReset = jest.fn();

describe('Search Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search inputs and reset button', () => {
    render(<Search onSearch={mockOnSearch} onReset={mockOnReset} />);

    expect(screen.getByPlaceholderText('Search by Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by Phone')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  test('calls onSearch with correct filters when inputs change', async () => {
    render(<Search onSearch={mockOnSearch} onReset={mockOnReset} />);

    fireEvent.change(screen.getByPlaceholderText('Search by Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Search by Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('Search by Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Search by Phone'), { target: { value: '1234567890' } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith({
        name: 'John',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '1234567890',
      });
    });
  });

  test('calls onReset when reset button is clicked', () => {
    render(<Search onSearch={mockOnSearch} onReset={mockOnReset} />);

    fireEvent.click(screen.getByText('X'));

    expect(mockOnReset).toHaveBeenCalled();
  });

  test('clears input fields when reset button is clicked', () => {
    render(<Search onSearch={mockOnSearch} onReset={mockOnReset} />);

    fireEvent.change(screen.getByPlaceholderText('Search by Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Search by Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('Search by Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Search by Phone'), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByText('X'));

    expect(screen.getByPlaceholderText('Search by Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Search by Username')).toHaveValue('');
    expect(screen.getByPlaceholderText('Search by Email')).toHaveValue('');
    expect(screen.getByPlaceholderText('Search by Phone')).toHaveValue('');
  });
});
