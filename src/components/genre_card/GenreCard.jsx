import { useNavigate } from 'react-router-dom';

import './GenreCard.css';


/**
 * Компонент карточки жанра
 * @param {Object} props - пропсы
 * @param {Object} props.genreData - данные жанра
 * @param {string} props.genreData.id - id жанра
 * @param {Object[]} props.genreData.icons - массив картинок жанра
 * @param {string} props.genreData.icons[].url - адрес картинки
 * @param {string} props.genreData.name - имя жанра
 * @param {string} props.colot - цвет hex
 * @returns {JSX.Element}
 */
function GenreCard({genreData, color}) {
    const navigate = useNavigate();

    return (
        <article 
            className='search-page__card genre-card' 
            style={{background: color}} 
            onClick={() => navigate(`/genre/${genreData.id}`, {state: genreData.name})}
        >
            <h3 
                className='genre-card__title'>
                {genreData.name}
            </h3>
            <img 
                className='genre-card__img' 
                src={genreData.icons[0].url} 
                alt={genreData.name} 
                width='100' 
                height='100'
            />
        </article>
    )
}

export default GenreCard;