import Tracklist from "../tracklist/Tracklist";

import useQuery from "../../hook/useQuery"
import API from "../../services/api"


/**
 * Возвращает компонент подборки треков по артистам и трекам
 * @param {Object} props - пропсы
 * @param {Object[]} props.topTracks - массив треков
 * @param {Object[]} ptops.topArtists - массив артистов
 * @param {string} props.topTracks.id - id трека
 * @param {string} props.topArtists.id - id артиста
 * @returns {JSX.Element | null} 
 */
function Recomendations({topTracks, topArtists}) {
    const {response: recomendations, isLoading, error} = useQuery(
        API.get.bind(API), 
        `recommendations?limit=10&market=US&seed_artists=${topArtists[0].id},${topArtists[1].id},${topArtists[2].id}&seed_tracks=${topTracks[0].id},${topTracks[1].id}`
    );

    return (
        <>
            {
                recomendations ?
                <Tracklist 
                    tracklistData={recomendations.tracks} 
                    type='artist' 
                    title='You must like'
                    isLoading={isLoading} 
                /> :
                error ? null : null
            }
        </>
    )
}

export default Recomendations;