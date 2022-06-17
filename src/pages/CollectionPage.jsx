import { useContext } from 'react';
import { useMatch } from 'react-router-dom';

import AuthUserContext from '../contexts/auth/AuthUserContext';
import useRequireAuth from "../hook/useRequireAuth";
import useQuery from '../hook/useQuery';
import API from '../services/api';

import Collection from '../components/collection/Collection';

import './CollectionPage.css'


/**
 * Возвращает компонент страницы личной медиатеки текущего юзера
 * @returns {JSX.Element}
 */
function CollectionPage() {
    useRequireAuth();
    const {params: {path}} = useMatch('/collection/:path');
    const {user} = useContext(AuthUserContext);
    const playlists = useQuery(API.get.bind(API), `users/${user?.id}/playlists?limit=30&offset=0`);
    const albums = useQuery(API.get.bind(API), `me/albums?limit=30&offset=0&market=US`);
    const artists = useQuery(API.get.bind(API), `me/following?type=artist&limit=30`);

    if (path === 'playlists') {
        return (
                <section className='collection-page'>
                    {   
                        playlists.response?.items.length !== 0 ?
                            <div className='collection-page-content'>
                                <Collection 
                                    type='playlist' 
                                    collectionData={playlists.response?.items} 
                                    title='Playlists'
                                    isLoading={playlists.isLoading}
                                    toggle={{hasToggle: false, initState: true}}
                                    error={playlists.error} 
                                />
                            </div> : 
                            <div className='collection-page__error'>
                                <h1 className='collection-page__error-description'>Empty</h1>
                            </div>
                    }
                </section>
        )
    } else if (path === 'albums') {
        return (
            <section className='collection-page'>
                {
                    albums.response?.items.length !== 0 ?
                        <div className='collection-page-content'>
                            <Collection 
                                type='album' 
                                collectionData={albums.response?.items.map(item => {return {...item.album}})} 
                                title='Albums'
                                isLoading={albums.isLoading}
                                toggle={{hasToggle: false, initState: true}}
                                error={albums.error} 
                            />
                        </div> :
                        <div className='collection-page__error'>
                            <h1 className='collection-page__error-description'>Empty</h1>
                        </div>
                }
            </section> 
        )
    } else if (path === 'artists') {
        return (
            <section className='collection-page'>
                {
                    artists.response?.artists.items.length !== 0 ?
                        <div className='collection-page-content'>
                            <Collection 
                                type='artist' 
                                collectionData={artists.response?.artists.items} 
                                title='Artists'
                                isLoading={artists.isLoading}
                                toggle={{hasToggle: false, initState: true}}
                                error={artists.error} 
                            /> 
                        </div> :
                        <div className='collection-page__error'>
                            <h1 className='collection-page__error-description'>Empty</h1>
                        </div>
                }
            </section> 
        )
    }
}

export default CollectionPage;