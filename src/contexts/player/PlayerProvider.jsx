import { useEffect, useState } from "react"
import PlayerContext from "./PlayerContext";



function PlayerProvider({children}) {
    const player = useState(new Audio())[0];

    const [isDisplayed, setIsDisplayed] = useState(false);

    const [trackID, setTrackID] = useState('');
    const [trackIndex, setTrackIndex] = useState(null);
    const [tracklist, setTracklist] = useState({id: null, tracks: []});
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const [volume, setVolume] = useState(0.1);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        player.volume = volume;
    }, [volume, player])

    useEffect(() => {
        muted ? player.volume = 0 : player.volume = volume;
    }, [muted, player])

    useEffect(() => {
        if (tracklist.tracks.length !== 0) {
                player.src = tracklist.tracks[trackIndex].preview_url;
                setTrackID(tracklist.tracks[trackIndex].id);
        }
    }, [trackIndex, tracklist.tracks]);

    useEffect(() => {
        isPlaying ? player.play() : player.pause();
    });

    player.ontimeupdate = () => {
        setCurrentTime(Math.round(player.currentTime));
    }
    player.onended = () => {
        next();
    }

    const load = (newTrackID, newTracklist) => {
        if (!newTrackID && newTracklist.tracks.length === 0) {
            console.log('Empty tracklist or trackID');
            return;
        }
        display();

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

    const togglePlayingState = () => isPlaying ? setIsPlaying(false) : setIsPlaying(true);
    const next = () => {
        if (tracklist.tracks[trackIndex + 1]) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
            setIsPlaying(false);
        }
    }
    const prev = () => {
        if (tracklist.tracks[trackIndex - 1]) {
            setTrackIndex(trackIndex - 1);
        }
    }
    const display = () => {
        if (!isDisplayed) setIsDisplayed(true);
    }
    const mute = () => {
        muted ? setMuted(false) : setMuted(true);
    }
    const changeVolume = (value) => {
        setVolume(value);
    }
    const changePlaybackPosition = (value) => {
        player.currentTime = value;
    }

    return (
        <PlayerContext.Provider 
            value={{
                    isDisplayed, 
                    isPlaying, 
                    trackID, 
                    tracklist, 
                    trackIndex, 
                    muted,
                    currentTime, 
                    load, 
                    togglePlayingState, 
                    next, 
                    prev, 
                    mute, 
                    changeVolume,
                    changePlaybackPosition
                }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider;