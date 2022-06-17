import { useEffect, useState } from 'react';
import { usePlayer } from '../../contexts/player/usePlayer';
import TrackCard from '../track_card/TrackCard';
import MuteButton from '../UI/mute_btn/MuteButton';
import NextButton from '../UI/next_btn/NextButton';
import PlaybackBar from '../UI/playback_bar/PlaybackBar';
import PlayerPlayButton from '../UI/player_play_button/PlayerPlayButton';
import PreviousButton from '../UI/previous_btn/PreviousButton';
import VolumeInput from '../UI/volume_input/VolumeInput';
import './Player.css'


/**
 * Разметка плеера. Пока не реализован.
 * @returns {JSX.Element}
 */
function Player() {
    const {player, isPlaying, trackIndex, tracklist, togglePlayingState, changeTrackIndex} = usePlayer();

    const [volume, setVolume] = useState(0.1);
    const [muted, setMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    player.current.ontimeupdate = () => {
        setCurrentTime(Math.round(player.current.currentTime));
    }

    const next = () => {
        changeTrackIndex(trackIndex + 1);
    }
    const prev = () => {
        if (tracklist.tracks[trackIndex - 1]) {
            changeTrackIndex(trackIndex - 1);
        }
    }
    const changePlaybackPosition = (value) => {
        player.current.currentTime = value;
    }
    const mute = () => {
        muted ? setMuted(false) : setMuted(true);
    }
    const changeVolume = (value) => {
        setVolume(value);
    }

    useEffect(() => {
        player.current.volume = volume;
    }, [volume])

    useEffect(() => {
        muted ? player.current.volume = 0 : player.current.volume = volume;
    }, [muted])

    if (trackIndex === null) {
        return null;
    }

    return (
        <footer className="music-player">
            <TrackCard track={tracklist.tracks[trackIndex]} />
            <div className="music-player__controller">
                <div className="music-player__btns">
                    <PreviousButton onClick={prev} />
                    <PlayerPlayButton onClick={togglePlayingState} state={isPlaying} />
                    <NextButton onClick={next} />
                </div>
                <div className="music-player__playback-container">
                    <span 
                        className='music-player__playback-time'
                    >
                        {
                            currentTime > 9 ?
                                `00:${currentTime}` :
                                `00:0${currentTime}`
                        }
                    </span>
                    <PlaybackBar onChange={changePlaybackPosition} value={currentTime} />
                    <span className='music-player__playback-duration'>00:30</span>
                </div>
            </div>
            <div className="music-player__right-panel-wrapper">
                <MuteButton onClick={mute} state={muted} />
                <VolumeInput changeVolume={changeVolume} />
            </div>
        </footer>
    )
}

export default Player;