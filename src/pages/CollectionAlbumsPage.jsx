import useRequireAuth from "../hook/useRequireAuth";
import useQuery from '../hook/useQuery';
import API from '../services/api';

import Collection from '../components/collection/Collection';

import './CollectionPage.css'


/**
 * Возвращает компонент страницы личных альбомов
 * @returns {JSX.Element}
 */
function CollectionAlbumsPage() {
    useRequireAuth();
    const albums = useQuery(API.get.bind(API), `me/albums?limit=30&offset=0&market=US`);

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
}

export default CollectionAlbumsPage;