import { useLocation, useParams } from 'react-router-dom';

import Collection from '../components/collection/Collection';
import Error from '../components/error/Error';
import Loader from '../components/UI/loader/Loader';

import useRequireAuth from "../hook/useRequireAuth";
import useQuery from '../hook/useQuery';
import API from '../services/api';

import './GenrePage.css';


/**
 * Компонент страницы жанра
 * @returns {JSX.Element}
 */
function GenrePage() {
    useRequireAuth();
    const {id} = useParams();
    const {state} = useLocation();
    const {response: genreData, error} = useQuery(API.get.bind(API), `browse/categories/${id}/playlists?country=US&limit=14&offset=0`);

    if (error) {
        return (
            <Error error={error}/>
        )
    }
    
    if (genreData?.playlists.total === 0) {
        return (
            <section className='genre-page'>
                <h1 className='genre-page__title'>{state}</h1>
                <h2 className='genre-page__description'>No results found</h2>
            </section>
        )
    } else  if (genreData){
        return (
            <section className='genre-page'>
                <h1 className='genre-page__title'>{state}</h1>
                <div className='genre-page__content'>
                    <Collection 
                        type='playlist' 
                        collectionData={genreData.playlists.items} 
                        title='Popular playlists' 
                        toggle={{hasToggle: false, initState: true}} />
                </div>
            </section>
        )
    } else {
        return (
            <Loader />
        )
    }
}

export default GenrePage;