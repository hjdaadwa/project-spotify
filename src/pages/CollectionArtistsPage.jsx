import useRequireAuth from "../hook/useRequireAuth";
import useQuery from '../hook/useQuery';
import API from '../services/api';

import Collection from '../components/collection/Collection';

import './CollectionPage.css'


/**
 * Возвращает компонент страницы личной медиатеки текущего юзера
 * @returns {JSX.Element}
 */
function CollectionArtistsPage() {
    useRequireAuth();
    const artists = useQuery(API.get.bind(API), `me/following?type=artist&limit=30`);

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

export default CollectionArtistsPage;