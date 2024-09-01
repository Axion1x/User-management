import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { AppDispatch, RootState } from './features/store';
import { useEffect } from 'react';
import { fetchUser, setFilters } from './features/slices/userSlice';
import ReactLoading from 'react-loading'
import Table from './components/table/Table';
import Search from './components/search/Search';

const App:React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {status, error } = useSelector((state: RootState) =>  ({
    status:state.users.status,
    error:state.users.error
}));

  useEffect (()=>{
    if (status === 'idle'){
      dispatch(fetchUser())
    }
  }, [dispatch, status])
  
  const handleSearch = (filters: { name: string, username: string, email: string, phone: string }) => {
    dispatch(setFilters(filters));
  };

  const handleReset = () => {
    dispatch(setFilters({ name: '', username: '', email: '', phone: '' }));
  };

  return (
    <div className="App">
    {status === 'loading' && (
      <div className="loading-container">
        <ReactLoading type={'spokes'} color={'#fff'} />
        <div className='loading-text'>Loading...</div>
      </div>
    )}
    {status === 'failed' && <p>Error: {error}</p>}
    {status === 'succeeded' && (
      <>
        <div className = 'header'>User Management</div>
        <Search onReset={handleReset} onSearch={handleSearch} />
        <Table />
      </>
    )}
  </div>
  );
}

export default App;
