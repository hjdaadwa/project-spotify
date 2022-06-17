import { useContext } from 'react';

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
function CollectionPlaylistsPage() {
    useRequireAuth();
    const {user} = useContext(AuthUserContext);
    const playlists = useQuery(API.get.bind(API), `users/${user?.id}/playlists?limit=30&offset=0`);

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
}

export default CollectionPlaylistsPage;