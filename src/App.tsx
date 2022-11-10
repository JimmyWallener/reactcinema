import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authenticated from './components/Auth/Authenticated';
import Layout from './components/UI/Layout';
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
            <Authenticated>
              <AddMovie />
            </Authenticated>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
