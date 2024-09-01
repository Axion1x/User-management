export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
  }

export interface UsersState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    sortField: 'name' | 'username' | 'email' | 'phone' | null;
    sortOrder: 'asc' | 'desc';
    filters: {
      name: string;
      username: string;
      email: string;
      phone: string;
    };
  }