import './NextButton.css';
import {ReactComponent as NextButtonIcon} from '../../../assets/icons/next.svg';


function NextButton({onClick}) {
    return (
        <button className="music-player__next-btn" onClick={onClick} aria-label="Next track button">
            <NextButtonIcon className="music-player__next-img" />
        </button>
    )
}

export default NextButton;