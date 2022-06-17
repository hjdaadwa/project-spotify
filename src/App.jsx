import { Routes, Route, Navigate } from 'react-router-dom';

// import RequireAuth from './hoc/RequireAuth';

import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritePage';
import PlaylistPage from './pages/PlaylistPage';
import LoginPage from './pages/LoginPage';
import AlbumPage from './pages/AlbumPage';
import ArtistPage from './pages/ArtistPage';
import GenresPage from './pages/GenresPage';
import GenrePage from './pages/GenrePage';
import CollectionPlaylistsPage from './pages/CollectionPlaylistsPage';
import CollectionArtistsPage from './pages/CollectionArtistsPage';
import CollectionAlbumsPage from './pages/CollectionAlbumsPage';

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
            <Route index element={<MainPage />} />

            <Route path='search'>
              <Route index element={<GenresPage />} />
              <Route path=':query' element={<SearchPage />} />
            </Route>
            
            <Route path='collection'>
              <Route index element={<Navigate to="playlists" />} />
              <Route path='playlists' element={<CollectionPlaylistsPage />} />
              <Route path='artists' element={<CollectionArtistsPage />} />
              <Route path='albums' element={<CollectionAlbumsPage />} />
            </Route>

            <Route path='playlist/me' element={<FavoritePage />} />
            <Route path='playlist/:id' element={<PlaylistPage />} />

            <Route path='album/:id' element={<AlbumPage />} />

            <Route path='artist/:id' element={<ArtistPage />} />

            <Route path='genre/:id' element={<GenrePage />} />

            <Route path='login' element={<LoginPage />} />
            {/* todo */}
            <Route path='*' element={<div>NOT FOUND PAGE</div>} />
          </Route>
      </Routes>
    </>
  );
}

export default App;
