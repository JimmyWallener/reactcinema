import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Layout from './components/Layout';
import AddMovie from './pages/AddMovie';
import Login from './pages/Login';
import Movies from './pages/Movies';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Movies />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/addMovie'
          element={
            <Auth>
              <AddMovie />
            </Auth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
