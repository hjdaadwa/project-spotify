import './PreviousButton.css';
import {ReactComponent as PreviousButtonIcon} from '../../../assets/icons/prev.svg';


function PreviousButton({onClick}) {
    return (
        <button className="music-player__previous-btn" onClick={onClick} aria-label="Previous track button">
            <PreviousButtonIcon className="music-player__previous-img" />
        </button>
    )
}

export default PreviousButton;