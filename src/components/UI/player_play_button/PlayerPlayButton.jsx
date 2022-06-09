import './PlayerPlayButton.css';
import {ReactComponent as StopIcon} from '../../../assets/icons/stop.svg';
import {ReactComponent as PlayIcon} from '../../../assets/icons/play.svg';


function PlayerPlayButton({onClick, state}) {

    return (
        <button className="music-player__play-btn" onClick={onClick} aria-label="Play/stop track button">
            {
                state ?
                    <StopIcon className="music-player__stop-img" height="16" width="16" viewBox="0 0 16 16" /> :
                    <PlayIcon className="music-player__play-img" height="16" width="16" viewBox="0 0 16 16" />
            }
        </button>
    )
}

export default PlayerPlayButton;