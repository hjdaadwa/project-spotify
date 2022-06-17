import { useNavigate } from 'react-router-dom';

import DecorDot from '../decoration/DecorDot';

import './AlbumCard.css'


/**
 * Возвращает компонент карточки альбома
 * @param {Object} props - пропсы
 * @param {Object} props.albumData - данные альбома
 * @param {string} props.albumData.id - уникальный айди
 * @param {Object[]} [props.albumData.images] - изображения альбома
 * @param {string} [props.albumData.images[].url] - адрес изображения
 * @param {string} props.albumData.name - название альблома
 * @param {string} props.albumData.release_date - дата выпуска альбома 'YYYY-MM-DD'
 * @param {string} albumData.album_type - тип альбома
 * @returns {JSX.Element}
 */
function AlbumCard({albumData}) {
    const navigate = useNavigate();

    return (
        <article className="collection__card album-card" onClick={() => navigate(`/album/${albumData.id}`)}>
            <div className="album-card__img-container">
                <img 
                    className="album-card__img" 
                    src={
                        albumData.images[1]?.url || 
                        albumData.images[2]?.url || 
                        albumData.images[0]?.url || 
                        'https://i.ibb.co/p2bwMsX/playlist-placeholder.png'
                    } 
                    alt="Album image" 
                    width="150" 
                    height="150"
                />
            </div>
            <div className="album-card__text">
                <h3 className="album-card__title">{albumData.name}</h3>
                <p className="album-card__description">
                    <span className="album-card__description-year">{albumData.release_date.slice(0,4)}</span>
                    <DecorDot/>
                    <span className="album-card__description-other">
                        {
                            albumData.album_type.slice(0,1).toUpperCase() + albumData.album_type.slice(1)
                        }
                    </span>
                </p>
            </div>
        </article>
    )
}


export default AlbumCard;