import { useNavigate } from 'react-router-dom';

import './ArtistCard.css'


/**
 * Возвращает компонент карточки артиста
 * @param {Object} props - пропсы
 * @param {Object} props.artistData - данные артиста
 * @param {string} props.artistData.id - уникальный айди
 * @param {Object[]} [props.artistData.images] - массив изображений
 * @param {string} [props.artistData.images.url] - адрес изображения
 * @param {string} props.artistData.name - имя артиста
 * @param {string} props.artistData.type - тип
 * @returns {JSX.Element}
 */
function ArtistCard({artistData}) {
    const navigate = useNavigate();

    return (
        <article className='collection__card artist-card' onClick={() => navigate(`/artist/${artistData.id}`, {replace: true})}>
            <div className="artist-card__img-container">
                <img 
                    className="artist-card__img" 
                    src={artistData.images[1]?.url || artistData.images[2]?.url || artistData.images[0]?.url || 'https://i.ibb.co/L8KvKX5/default-artist-card.png'} 
                    alt="Artist image" 
                    width="150" 
                    height="150"
                />
            </div>
            <div className="artist-card__text">
                <h3 className="artist-card__title">{artistData.name}</h3>
                <p className="artist-card__description">{artistData.type.slice(0,1).toUpperCase() + artistData.type.slice(1)}</p>
            </div>
        </article>
    )
}

export default ArtistCard;