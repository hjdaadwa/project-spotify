import { useMatch } from "react-router-dom"

import Collection from "../components/collection/Collection";
import Tracklist from "../components/tracklist/Tracklist";
import Loader from "../components/UI/loader/Loader";

import useQuery from "../hook/useQuery";
import API from "../services/api";

import './SearchPage.css';


/**
 * Компонент страницы поиска
 * @returns {JSX.Element}
 */
function SearchPage() {
    const match = useMatch('/search/:query');
    
    const {response: searchData, errorSearch} = useQuery(API.get.bind(API), `search?q=${match.params.query}&type=track%2Cartist%2Cplaylist%2Calbum&market=US&limit=10&offset=0`);

    if (searchData) {
        return (
            <section className="search-page">
                {
                    searchData.tracks.items.length ? 
                    <Tracklist 
                        tracklistData={searchData.tracks.items} 
                        type='artist' 
                        title='Tracks' 
                    /> :
                    null
                }
                {
                    searchData.artists.items.length ?
                    <Collection 
                        collectionData={searchData.artists.items} 
                        type='artist' 
                        title='Artists' 
                    /> :
                    null
                }
                {
                    searchData.playlists.items.length ?
                    <Collection 
                        collectionData={searchData.playlists.items} 
                        type='playlist' 
                        title='Playlists' 
                    /> :
                    null
                }
                {
                    searchData.albums.items.length ?
                    <Collection 
                        collectionData={searchData.albums.items} 
                        type='album' 
                        title='Albums' 
                    /> :
                    null
                }
                {
                    Object.values(searchData).map(item => item.total).reduce((prev, curr) => prev + curr) === 0 ?
                    <div className="search-page__error">
                        <h1 className="search-page__error-description">
                            {`No results found for "${match.params.query}"`}
                        </h1>
                    </div>
                    : null
                }
            </section>
        )
    } else {
        return (
            <Loader />
        )
    }

}

export default SearchPage;