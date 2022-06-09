import Track from '../track/Track';
import Loader from '../UI/loader/Loader';
import Error from '../error/Error';

import { usePlayer } from '../../contexts/player/usePlayer';

import { ReactComponent as ClockIcon } from '../../assets/icons/clock.svg';
import './Tracklist.css';



/**
 * Возвращает коллкцию треков
 * @param {Object} props
 * @param {string} props.type - тип треклиста = котекст контента. 'artist' | 'album' | 'playlist'
 * @param {Object[]} tracklistData - массив треков
 * @param {string} tracklistID - id треклиста
 * @param {boolean} [isLoading=false] - состояние загрузки данных
 * @param {string} [title=''] - заголовок треклиста
 * @param {Object} [error=null] - ошибка загрузки. Передается, если нужно, чтобы компонент сам обрабатывал ее, а не родительский компонент
 * @returns {JSX.Element}
 */
function Tracklist({type, tracklistData, tracklistID, isLoading = false, title='', error = null}) {
    const {load, tracklist} = usePlayer();
 
    if (error) {
        return (
            <div className='tracklist__loader'>
                <Error error={error} />
            </div> 
        )
    }

    if (isLoading) {
        return (
            <div className='tracklist__loader'>
                <Loader/>
            </div>
        )
    }
    
    if (!isLoading && tracklistData.length !== 0) {
        return (
            <div className="tracklist__content">
                <div className="tracklist__tracks-title">{title}</div>
                <div className="tracklist__headline">
                    <div className="tracklist__col1">#</div>
                    <div className="tracklist__col2">name</div>
                    <div className="tracklist__col3">
                        {type === 'album' ? '' : 'album'}
                    </div>
                    <div className="tracklist__col4">
                        {type === 'album' || type === 'artist' ? '' : 'date added'}
                    </div>
                    <div className="tracklist__col5">
                        <ClockIcon className="tracklist__col5-img" />
                    </div>
                </div>
                <div className="tracklist__tracks">
                    {
                        tracklistData.map((item, index) => {
                            return (
                                <Track 
                                    type={type} 
                                    trackData={item} 
                                    order={index + 1}
                                    key={item.id}
                                    onClick={()=> load(item.id, {id: tracklistID || item.id, tracks: tracklistData})}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Tracklist;