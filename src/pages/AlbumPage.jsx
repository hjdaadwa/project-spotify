import React from "react";
import { NavLink, useParams } from "react-router-dom";

import useQuery from "../hook/useQuery";
import API from "../services/api";

import ArtistImg from "../components/artist_img/ArtistImg";
import DecorDot from "../components/decoration/DecorDot";
import Tracklist from "../components/tracklist/Tracklist";
import Title from "../components/title/Title";

import useColorThief from "use-color-thief";
import Loader from "../components/UI/loader/Loader";
import './AlbumPage.css';
import PlayButton from "../components/UI/play_button/PlayButton";


/**
 * Компонент страницы альбома
 * @returns {JSX.React}
 */
function AlbumPage() {
    const {id} = useParams();
    const {response: albumData, isLoading, error} = useQuery(API.get.bind(API), `albums/${id}`);
    const {color} = useColorThief(albumData?.images[1]?.url || albumData?.images[0]?.url || 'https://i.ibb.co/17ybWq4/default-playlist.png', {format: 'hex', colorCount: 0});

    if (error) {
        return (
            <article className="album">
                <Loader />
            </article>
        )
    }

    if (isLoading) {
        return (
            <article className="album">
                <Loader />
            </article>
        )
    }

    return (
        <article className='album'>
            <div className="album__header" style={{background: color}}>
                <div className="album__img-container">
                    <img 
                        className="album__img" 
                        src={albumData.images[1]?.url || albumData.images[0]?.url} 
                        alt="Album image" 
                        width="232" 
                        height="232" 
                        crossOrigin="anonymous" 
                    />  
                </div>
                <div className="album__info">
                    <p className="album__type">{albumData.album_type}</p>
                    <Title className="album__name">{albumData.name}</Title>
                    <div className="album__data">
                        {
                            albumData.artists.length === 1 ? 
                            (
                                <div className="album__avatar-container">
                                    <ArtistImg 
                                        id={albumData.artists[0].id} 
                                        className="album__avatar" 
                                        alt="Artist image" 
                                        width="24" 
                                        height="24"
                                    />
                                </div>
                            ) : null
                        }
                        <div className="album__artists">
                            {
                                albumData.artists.map((artist) => { return (
                                    <React.Fragment key={artist.id}>
                                        <NavLink 
                                            className="album__artist" 
                                            to={`/artist/${artist.id}`}
                                        >
                                            {artist.name}
                                        </NavLink>
                                        <DecorDot />
                                    </React.Fragment>
                                )})
                            }
                        </div>
                        <span className="album__year">{new Date(albumData.release_date).getFullYear()}</span>
                        <DecorDot/>
                        <span className="album__counter">{`tracks: ${albumData.total_tracks}`}</span>
                    </div>
                </div>
            </div>
            <div className="album__play-btn">
                <PlayButton 
                    tracklistID={albumData.id} 
                    tracklist={albumData.tracks.items}
                />
            </div>
            <div className="album__content-container">
                <Tracklist 
                    type='album' 
                    tracklistData={albumData.tracks.items}
                    
                    title='' 
                />
            </div>
        </article>
    )
}

export default AlbumPage;