import { useState } from 'react';
import useToggle from '../../hook/useToggle';

import AlbumCard from '../album_card/AlbumCard';
import ArtistCard from '../artist_card/ArtistCard';
import Error from '../error/Error';
import PlaylistCard from '../playlist_card/PlaylistCard';
import Loader from '../UI/loader/Loader';
import Toggle from '../UI/toggle_btn/ToggleButton';

import './Collection.css';


/**
 * Возвращает компонент коллекции - набор карточек артиста, альбома, плейлиста
 * @param {Object} props - пропсы
 * @param {string} props.type - тип создаваемых карточек коллекции 'artist' | 'album' | 'playlist'
 * @param {Object} props.collectionData - объект данных коллекции
 * @param {boolean} [props.isLoading=false] - состояние загрузки данных
 * @param {string} [props.title=Collection] - загаловок коллекции
 * @param {Object} [props.toggle] - конфиг переключателя отображения
 * @param {boolean} [props.toggle.hasToggle=true] - наличие переключателя
 * @param {boolean} [props.toggle.initState=false] - начальное положение
 * @param {Object} [error=false] - объект ошибки
 * @returns {JSX.Element | null}
 */
function Collection({
        type, 
        collectionData, 
        isLoading = false, 
        title='Collection', 
        toggle: {hasToggle, initState} = {hasToggle: true, initState: false},
        error = false
    }) {

    const [overflow1, setOverflow1] = useToggle(initState);

    if (error) {
        return (
            <Error error={error} />
        )
    }

    if (isLoading) {
        return (
            <div className='collection__loader'>
                <Loader/>
            </div>
        )
    }

    if (collectionData?.length !==0 ) {
        return (
            <section className="collection">
                <div className="collection__header">
                    <h2 className="collection__title">{title}</h2>
                    {
                        (collectionData?.length > 7) && hasToggle ? 
                        <Toggle toggleFn={setOverflow1} className="collection__btn">
                            {
                                overflow1 ? 
                                'several' : 
                                'all'
                            }
                        </Toggle> : 
                        null
                    }
                </div>
                <div className={
                    "collection__content " + (
                        overflow1 ? 
                        'collection__content_overflow_visible' : 
                        'collection__content_overflow_hidden'
                    )
                }>
                    {   
                        type === 'album' ? collectionData.map(item => <AlbumCard key={item.id} albumData={item}/>) : 
                        type === 'artist' ? collectionData.map(item => <ArtistCard key={item.id} artistData={item}/>) : 
                        type === 'playlist' ? collectionData.map(item => <PlaylistCard key={item.id} playlistData={item}/>) : 
                        null
                    }    
                </div>
            </section>
        )
    } else {
        return null;
    }

}

export default Collection;