import { useParams } from 'react-router-dom';

import useQuery from '../hook/useQuery';
import API from '../services/api';

import ArtistImg from '../components/artist_img/ArtistImg';
import Tracklist from '../components/tracklist/Tracklist';
import Title from '../components/title/Title';
import Collection from '../components/collection/Collection';
import Loader from '../components/UI/loader/Loader';
import Error from '../components/error/Error';

import useColorThief from 'use-color-thief';
import './ArtistPage.css';


/**
 * Возвращает компонент страницы артиста
 * @returns {JSX.Element}
 */
function ArtistPage() {
    const {id} = useParams();
    const artist = useQuery(API.get.bind(API), `artists/${id}`);
    const topTracks = useQuery(API.get.bind(API), `artists/${id}/top-tracks?market=ES`);
    const albums = useQuery(API.get.bind(API), `artists/${id}/albums?include_groups=album,single&market=US&limit=25&offset=0`);
    const artists = useQuery(API.get.bind(API), `artists/${id}/related-artists`);

    const {color} = useColorThief(
        artist.response?.images[1]?.url || 
        artist.response?.images[0]?.url || 
        'https://i.ibb.co/f9sHgr9/default-artist.png', 
        {format: 'hex', colorCount: 0}
    );
    
    if (artist.error) {
        return (
            <article className="artist">
                <Error error={artist.error} />
            </article>
        )
    }

    if (artist.isLoading) {
        return (
            <article className="artist">
                <Loader />
            </article>
        )
    }

    return (
        <article className="artist">
            <div className="artist__header" style={{background: color}}>
                <div className="artist__img-container">
                    <ArtistImg 
                        className="artist__img" 
                        src={
                            artist.response?.images[1]?.url || 
                            artist.response?.images[0]?.url || 
                            'https://i.ibb.co/f9sHgr9/default-artist.png'
                        } 
                        alt="Artist image" 
                        width="232" 
                        height="232" 
                        crossOrigin="anonymous" 
                    />
                </div>
                <div className="artist__info">
                    <Title className="artist__name">{artist.response.name}</Title>
                    <div className="artist__data">
                        <span className="artist__followers">{`followers: ${artist.response.followers.total}`}</span>
                    </div>
                </div>
            </div>
            <div className="artist__play-btn">
                <div className="play-button">
                    {/* DODELAT */}
                    <svg className="play-button__img play-button__img_play" role="img" height="28" width="28" viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    <svg className="play-button__img play-button__img_stop" role="img" height="28" width="28" viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>
                </div>
            </div>
            <div className="artist__content-container">
                <div className="artist__tracklist-container">       
                    <Tracklist 
                        type='artist' 
                        tracklistData={topTracks.response?.tracks}
                        title='Popular tracks'
                        isLoading={topTracks.isLoading}
                        error={topTracks.error}
                    /> 
                </div>
                <div className="artist__tracklist-container-list">
                    <Collection
                        type='album'
                        collectionData={albums.response?.items}
                        title='Albums and Singles'
                        toggle={{hasToggle: true, initState: false}}
                        isLoading={albums.isLoading}
                        error={albums.error}
                    />
                    <Collection
                        type='artist'
                        collectionData={artists.response?.artists}
                        title='Fans love it too'
                        toggle={{hasToggle: true, initState: false}}
                        isLoading={artists.isLoading}
                        error={artists.error}
                    />
                </div>
            </div>
        </article>
    )
}

export default ArtistPage;