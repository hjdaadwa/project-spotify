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
    const {isDisplayed, isPlaying, trackIndex, tracklist, muted, currentTime, togglePlayingState, next, prev, mute, changeVolume, changePlaybackPosition} = usePlayer();

    if (!isDisplayed) {
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