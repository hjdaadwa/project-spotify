import { Routes, Route, Navigate } from 'react-router-dom';

import RequireAuth from './hoc/RequireAuth';

import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritePage';
import PlaylistPage from './pages/PlaylistPage';
import CollectionPage from './pages/CollectionPage';
import LoginPage from './pages/LoginPage';
import AlbumPage from './pages/AlbumPage';
import ArtistPage from './pages/ArtistPage';
import GenresPage from './pages/GenresPage';
import GenrePage from './pages/GenrePage';
import Loader from './components/UI/loader/Loader';

import './styles/App.css'


/**
 * Основной компонент приложения.
 * @returns 
 */
function App() {
  
  // Позже добавлю возможность работы большей части приложения без авторизации, а только с аутентификацией. 
  // И hoc <RequireAuth /> будет оборачивать только несколько страниц(библиотека и треки юзера), требующих авторизацию, а не все.
  return (
    <>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            } />

            <Route path='search'>
              <Route index element={
                <RequireAuth>
                  <GenresPage />
                </RequireAuth>
              } />
              <Route path=':query' element={
                <RequireAuth>
                  <SearchPage />
                </RequireAuth>
              } />
            </Route>
            
            <Route path='collection'>
              <Route index element={
                <RequireAuth>
                  <Navigate to="playlists" />
                </RequireAuth>
              } />
              <Route path='playlists' element={
                <RequireAuth>
                    <CollectionPage />
                </RequireAuth>
              } />
              <Route path='artists' element={
                <RequireAuth>
                  <CollectionPage />
                </RequireAuth>
              } />
              <Route path='albums' element={
                <RequireAuth>
                  <CollectionPage />
                </RequireAuth>
              } />
            </Route>

            <Route path='playlist/me' element={
              <RequireAuth>
                <FavoritePage />
              </RequireAuth>
            } />
            <Route path='playlist/:id' element={
              <RequireAuth>
                <PlaylistPage />
              </RequireAuth>
            } />

            <Route path='album/:id' element={
              <RequireAuth>
                <AlbumPage />
              </RequireAuth>
            } />

            <Route path='artist/:id' element={
              <RequireAuth>
                <ArtistPage />
              </RequireAuth>
            } />

            <Route path='genre/:id' element={
              <RequireAuth>
                <GenrePage />
              </RequireAuth>
            } />

            <Route path='loader' element={<Loader/>} />
            <Route path='login' element={<LoginPage />} />
            {/* todo */}
            <Route path='*' element={<div>NOT FOUND PAGE</div>} />
          </Route>
      </Routes>
    </>
  );
}

export default App;
