import { useEffect, useRef, useState } from "react"
import PlayerContext from "./PlayerContext";


function PlayerProvider({children}) {
    const player = useRef(new Audio());

    const [trackID, setTrackID] = useState('');
    const [trackIndex, setTrackIndex] = useState(null);
    const [tracklist, setTracklist] = useState({id: null, tracks: []});
    const [isPlaying, setIsPlaying] = useState(false);
    
    useEffect(() => {
        if (tracklist.tracks.length !== 0) {
                player.current.src = tracklist.tracks[trackIndex].preview_url;
                setTrackID(tracklist.tracks[trackIndex].id);
        }
    }, [trackIndex, tracklist.tracks]);

    useEffect(() => {
        isPlaying ? player.current.play() : player.current.pause();
    });


    player.current.onended = () => {
        changeTrackIndex(trackIndex + 1);
    }

    const load = (newTrackID, newTracklist) => {
        if (!newTrackID && newTracklist.tracks.length === 0) {
            console.log('Empty tracklist or trackID');
            return;
        }

        if (trackID === newTrackID) {
            togglePlayingState();
        } else if (tracklist.id === newTracklist.id) {
            setTrackID(newTrackID);
            const newIndex = tracklist.tracks.findIndex(item => item?.id === newTrackID);
            setTrackIndex(newIndex);
            setIsPlaying(true);
        } else {
            const filteredTracklist = newTracklist.tracks.filter(item => item.preview_url);
            setTracklist({
                id: newTracklist.id, 
                tracks: filteredTracklist
            })
            const newIndex = filteredTracklist.findIndex(item => item?.id === newTrackID);
            setTrackID(newTrackID);
            setTrackIndex(newIndex);
            setIsPlaying(true);
        }   
    }
    const changeTrackIndex = (index) => {
        if (tracklist.tracks[index]) {
            setTrackIndex(index);
        } else {
            setTrackIndex(0);
            setIsPlaying(false);
        }
    }
    const togglePlayingState = () => isPlaying ? setIsPlaying(false) : setIsPlaying(true);

    return (
        <PlayerContext.Provider 
            value={{
                    player,
                    isPlaying, 
                    trackID, 
                    tracklist, 
                    trackIndex,  
                    load, 
                    togglePlayingState, 
                    changeTrackIndex
                }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider;