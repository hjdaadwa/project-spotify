import { useParams } from "react-router-dom";

import Title from "../components/title/Title";
import Tracklist from "../components/tracklist/Tracklist";
import Loader from "../components/UI/loader/Loader";
import Error from "../components/error/Error";

import useQuery from "../hook/useQuery";
import API from "../services/api";

import useColorThief from "use-color-thief";
import './PlaylistPage.css'
import PlayButton from "../components/UI/play_button/PlayButton";


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
                    <PlayButton 
                        tracklistID={playlist.response.id} 
                        tracklist={playlist.response.tracks.items.map((item) => {
                            const {added_at, track} = item;
                            return {added_at, ...track};
                        }
                        )}
                    />
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
                    tracklistID={playlist.response.id}
                    title=''
                />
            </div>
        </article>
    )
}

export default PlaylistPage;