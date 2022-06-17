import { Link } from 'react-router-dom';

import './PlaylistCard.css';



/**
 * Возвращает компонент карточки плейлиста
 * @param {Object} props - пропсы
 * @param {Object} props.playlistData - данные плейлиста
 * @param {string} props.playlistData.id - id плейлиста
 * @param {Object[]} [props.playlistData.images] - массив изображений
 * @param {string} [props.playlistData.images[].url] - адрес изображения
 * @param {string} props.playlistData.name - название
 * @param {string} [props.playlistData.description] - описание
 * @param {string} props.playlistData.owner.display_name - имя автора плейлиста
 * @returns {JSX.Element}
 */
function PlaylistCard({playlistData}) {

    return (
        <Link className='playlist__card-link' to={`/playlist/${playlistData.id}`}>
            <article className="collection__card playlist-card" >
                <div className="playlist-card__img-container">
                    <img 
                        className="playlist-card__img" 
                        src={
                            playlistData.images[1]?.url ||
                            playlistData.images[2]?.url ||
                            playlistData.images[0]?.url ||
                            'https://i.ibb.co/17ybWq4/default-playlist.png'
                        } 
                        alt="Playlist image" 
                        width="150" 
                        height="150"
                    />
                </div>
                <div className="playlist-card__text">
                    <h3 className="playlist-card__title">{playlistData.name}</h3>
                    <p className="playlist-card__description">
                        {
                            playlistData.description ? 
                            playlistData.description : 
                            `Owner: ${playlistData.owner.display_name}`
                        }
                    </p>
                </div>
            </article>
        </Link>
    )
}

export default PlaylistCard;