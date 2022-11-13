import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authenticated from './components/Auth/Authenticated';
import Layout from './components/UI/Layout';
import AuthContextProvider from './context/AuthContext';
import AddMovie from './pages/AddMovie';
import Login from './pages/Login';
import Movie from './pages/Movie';
import Movies from './pages/Movies';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/:title' element={<Movie />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
          <Route
            path='/addMovie'
            element={
              <Authenticated>
                <AddMovie />
              </Authenticated>
            }
          />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
