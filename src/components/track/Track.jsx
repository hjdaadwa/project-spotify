import { NavLink } from "react-router-dom";
import { usePlayer } from "../../contexts/player/usePlayer";

import { convertMsToMTime } from "../../services/helpers";

import './Track.css';


/**
 * Возвращает компонент трека
 * @param {Object} props - пропсы
 * @param {string} type - тип трека, в контексте какого контента находится. 'artist' | 'album' | 'playlist'
 * @param {Object} props.trackData - данные трека
 * @param {string} [props.trackData.name] - имя
 * @param {string} [props.trackData.preview_url] - адрес превью трека
 * @param {Object[]} [props.trackData.artists] - массив авторов трека
 * @param {Object} [props.trackData.album] - альбом
 * @param {string} [props.trackData.album.name] - имя альбома
 * @param {string} [props.trackData.added_at] - дата добавления 'YYYY-MM-DDTHH:MM:SSZ'
 * @param {number} [props.trackData.duration_ms] - длительность в мс
 * @param {number} order - порядковый номер
 * @returns {JSX.Element}
 */
function Track({type, trackData, order, onClick}) {
    const {trackID} = usePlayer();
    if (!trackData?.name || !trackData?.duration_ms) {
        return (
            <div className="full-track full-track_inactive">
                <div className="full-track__col1">{order}</div>
                <div className="full-track__col2"></div>
                <div className="full-track__col3"><h3>NO DATA</h3></div>
                <div className="full-track__col4"></div>
                <div className="full-track__col4"></div>
            </div>
        )
    }
    return (
        <div 
            className={
                !trackData.preview_url ? 
                    "full-track full-track_inactive" : 
                    trackID === trackData.id ?
                    "full-track full-track_active" :
                    "full-track"
            }
            onClick={
                trackData.preview_url ? onClick : null
            }
        >
            <div className="full-track__col1">{order}</div>
            <div className="full-track__col2">
                <div className="full-track__card">
                    {
                        type === 'album' ? 
                            null : 
                            <img 
                                className="full-track__img"
                                src={
                                    trackData.album.images[2]?.url || 
                                    trackData.album.images[1]?.url || 
                                    trackData.album.images[0]?.url || 
                                    'https://i.ibb.co/qrkY0xJ/track-placeholder.png'
                                } 
                                alt="Track image" 
                                width="40" 
                                height="40"
                            />
                    }
                    <div className="full-track__info">
                        <span className="full-track__name">{trackData.name}</span>
                        <div className="full-track__artists">
                            {
                                type === 'artist' ?
                                    null :
                                    trackData.artists.map(artist => 
                                        <NavLink 
                                            className='full-track__artist' 
                                            to={`/artist/${artist.id}`} 
                                            key={artist.id}
                                            onClick={(event) => {event.stopPropagation()}}
                                        >
                                                {artist.name}
                                        </NavLink>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="full-track__col3">
                {
                    type === 'album' ? 
                        null :
                        <NavLink 
                            className="full-track__col3-link" 
                            to={`/album/${trackData.album.id}`}
                            onClick={(event) => {event.stopPropagation()}}
                        >
                                {trackData.album.name}
                        </NavLink>
                }   
            </div>
            <div className="full-track__col4">
                {
                    type === 'album' || 
                    type === 'artist' ? 
                        '' 
                        : new Date(trackData.added_at).toDateString()
                }
            </div>
            <div className="full-track__col5">
                {convertMsToMTime(trackData.duration_ms)}
            </div>
        </div>
    )
}

export default Track;