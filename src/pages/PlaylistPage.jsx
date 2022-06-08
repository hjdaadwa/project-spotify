import { useParams } from "react-router-dom";

import Title from "../components/title/Title";
import Tracklist from "../components/tracklist/Tracklist";
import Loader from "../components/UI/loader/Loader";
import Error from "../components/error/Error";

import useQuery from "../hook/useQuery";
import API from "../services/api";

import useColorThief from "use-color-thief";
import './PlaylistPage.css'


/**
 * Компонент страницы плейлиста
 * @returns {JSX.Element}
 */
function PlaylistPage() {
    const {id} = useParams();
    const playlist = useQuery(API.get.bind(API), `playlists/${id}`);

    const {color} = useColorThief(
        playlist.response?.images[0]?.url || 
        playlist.response?.images[1]?.url || 
        playlist.response?.images[2]?.url || 
        'https://i.ibb.co/p2bwMsX/playlist-placeholder.png', 
        {format: 'hex', colorCount: 0}
    );
    
    if (playlist.error) {
        return (
            <article className="playlist">
                <Error error={playlist.error} />
            </article>
        )
    }

    if (playlist.isLoading) {
        return (
            <article className="playlist">
                <Loader />
            </article>
        )
    }
    return (
        <article className="playlist">
            <div className="playlist__header" style={{background: color}}>
                <div className="plalist__img-container">
                    <img className="playlist__img" 
                        src={
                            playlist.response.images[0]?.url || 
                            playlist.response?.images[1]?.url || 
                            playlist.response?.images[2]?.url || 
                            'https://i.ibb.co/p2bwMsX/playlist-placeholder.png'}
                        alt="Playlist image" 
                        width="232" 
                        height="232" 
                        crossOrigin="anonymous"
                    />  
                </div>
                <div className="playlist__info">
                    <p className="playlist__type">{playlist.response.type}</p>
                    <Title className='playlist__name'>{playlist.response.name}</Title>
                    <p className="playlist__description">{playlist.response.description}</p>
                    <div className="playlist__data">
                        <span className="playlist__user-name">{playlist.response.owner.display_name}</span>
                        <span className="playlist__counter">{`tracks: ${playlist.response.tracks.total}`}</span>
                        <span className="playlist__followers">{`followers: ${playlist.response.followers.total}`}</span>
                    </div>
                </div>
            </div>
            <div className="playlist__play-btn">
                <div className="play-button">
                    {/* dodelat */}
                    <svg className="play-button__img play-button__img_play" role="img" height="28" width="28" viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                    <svg className="play-button__img play-button__img_stop" role="img" height="28" width="28" viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>
                </div>
            </div>
            <div className="playlist__content-container">
                <Tracklist 
                    type='playlist'
                    tracklistData={playlist.response.tracks.items.map((item) => {
                            const {added_at, track} = item;
                            return {added_at, ...track};
                        }
                    )}
                    title=''
                />
            </div>
        </article>
    )
}

export default PlaylistPage;