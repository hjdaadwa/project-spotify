import './MuteButton.css';
import {ReactComponent as MuteButtonOn} from '../../../assets/icons/mute_on.svg';
import {ReactComponent as MuteButtonOff} from '../../../assets/icons/mute_off.svg';



function MuteButton({onClick, state}) {

    return (
        <button className="music-player__volume-bar-btn" onClick={onClick} aria-label="Turn off the sound">
            {
                state ?
                    <MuteButtonOn className="music-player__volume-bar-img" /> :
                    <MuteButtonOff className="music-player__volume-bar-img" />
            }
        </button>
    )
}

export default MuteButton;