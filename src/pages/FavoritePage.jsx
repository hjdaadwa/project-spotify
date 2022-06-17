import { useContext } from "react";

import Tracklist from "../components/tracklist/Tracklist";
import Loader from "../components/UI/loader/Loader";
import Error from "../components/error/Error";

import useRequireAuth from "../hook/useRequireAuth";
import AuthUserContext from "../contexts/auth/AuthUserContext";
import useQuery from "../hook/useQuery";
import API from "../services/api";

import useColorThief from "use-color-thief";
import './FavoritePage.css';
import PlayButton from "../components/UI/play_button/PlayButton";



/**
 * Возвращает компонент страницы лайкнутных треков текущего пользователя
 * @returns {JSX.Element}
 */
function FavoritePage() {
    useRequireAuth();
    const playlist = useQuery(API.get.bind(API), 'me/tracks?offset=0&limit=50');
    const {user} = useContext(AuthUserContext);
    const {color} = useColorThief('https://i.ibb.co/44mk1sy/playlist-favorite.png', {format: 'hex', colorCount: 0});
 
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
                    <img className="playlist__img" src="https://i.ibb.co/44mk1sy/playlist-favorite.png" alt="Playlist image" width="232" height="232" crossOrigin="anonymous" />  
                </div>
                <div className="playlist__info">
                    <p className="playlist__type">playlist</p>
                    <h1 className="playlist__name">Favorite tracks</h1>
                    <div className="playlist__data">
                        <div className="playlist__avatar-container">
                            <img 
                                className="playlist__avatar" 
                                src={user.images[0]?.url || user.images[1]?.url || user.images[2]?.url || 'https://i.ibb.co/51drLLx/default-user.png'} 
                                alt="User image" 
                                width="24" 
                                height="24" 
                            />
                        </div>
                        <span className="playlist__user-name">{user.name}</span>
                        <span className="playlist__counter">   tracks: {playlist.response.total}</span>
                        <span className="playlist__followers"></span>
                    </div>
                </div>
            </div>
            <div className="playlist__play-btn">
                <PlayButton 
                    tracklistID='me' 
                    tracklist={playlist.response.items.map((item) => {
                        const {added_at, track} = item;
                        return {added_at, ...track};
                    })}
                />
            </div>
            <div className="playlist__content-container">
                <Tracklist 
                    type='playlist' 
                    tracklistData={playlist.response.items.map((item) => {
                        const {added_at, track} = item;
                        return {added_at, ...track};
                    })} 
                    tracklistID='me'
                    title=''
                    isLoading={playlist.isLoading}
                    error={playlist.error} 
                />
            </div>
        </article>
    )
}

export default FavoritePage;