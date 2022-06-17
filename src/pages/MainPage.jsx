import { useContext } from "react";

import Collection from "../components/collection/Collection";
import Tracklist from "../components/tracklist/Tracklist";
import Recomendations from "../components/recomendations/Recomendations";
import Loader from "../components/UI/loader/Loader";

import AuthUserContext from "../contexts/auth/AuthUserContext";
import useRequireAuth from "../hook/useRequireAuth";

import useQuery from "../hook/useQuery";
import API from "../services/api";

import './MainPage.css';


/**
 * Компонент главной страницы
 * @returns {JSX.Element}
 */
function MainPage() {
    useRequireAuth();
    const {user} = useContext(AuthUserContext);
    
    const topTracks = useQuery(API.get.bind(API), 'me/top/tracks?time_range=medium_term&limit=10&offset=0');
    const topArtists = useQuery(API.get.bind(API), 'me/top/artists?limit=10&offset=0');
    const news1 = useQuery(API.get.bind(API), 'browse/new-releases?country=KZ&limit=20&offset=0');
    const news2 = useQuery(API.get.bind(API), 'browse/new-releases?country=US&limit=14&offset=0');
    const feat1 = useQuery(API.get.bind(API), 'browse/featured-playlists?country=US&limit=14&offset=0');
    const feat2 = useQuery(API.get.bind(API), 'browse/featured-playlists?country=DE&limit=14&offset=0');

    return (
        <section className="main-page">
            <div className="main-page__header">
                <h1 className="main-page__title">
                    {
                        user ? `Hi, ${user.name}!` : 'Hi, friend!'
                    }
                </h1>
            </div>
            <div className="main-page__content">
                {
                    topTracks.error ?
                        null :
                        <Tracklist 
                            tracklistData={topTracks.response?.items} 
                            isLoading={topTracks.isLoading} 
                            type='artist' 
                            title='Your TOP tracks'
                        />
                }
                {
                    topArtists.error ?
                        null :
                        <Collection 
                        collectionData={topArtists.response?.items} 
                        isLoading={topArtists.isLoading} 
                        type='artist' 
                        title='Your TOP artists'
                    />
                }       
                {   
                    !topTracks.response && !topArtists.response ? 
                        <Loader className='loader__recomendations' /> : 
                        topTracks.response && topArtists.response && topTracks.response.total >= 2 && topArtists.response.total >= 3 ?
                            <Recomendations 
                                topTracks={topTracks.response.items} 
                                topArtists={topArtists.response.items} 
                            /> :
                            null
                }
                <Collection 
                    collectionData={news1.response?.albums.items} 
                    isLoading={news1.isLoading} 
                    type='album' 
                    title='New Releases from Soviet Union'
                    error={news1.error}
                />
                <Collection 
                    collectionData={news2.response?.albums.items} 
                    isLoading={news2.isLoading} 
                    type='album' 
                    title='New Releases from USA'
                    error={news2.error}
                />
                <Collection 
                    collectionData={feat1.response?.playlists.items} 
                    isLoading={feat1.isLoading} 
                    type='playlist' 
                    title={feat1.response?.message || ''}
                    error={feat1.error}
                />
                <Collection 
                    collectionData={feat2.response?.playlists.items} 
                    isLoading={feat2.isLoading} 
                    type='playlist' 
                    title={feat2.response?.message || ''}
                    error={feat2.error}
                />
            </div>
        </section>
    )
}

export default MainPage;