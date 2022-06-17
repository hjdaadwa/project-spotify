import { usePlayer } from '../../../contexts/player/usePlayer';

import {ReactComponent as StopIcon} from '../../../assets/icons/stop_max.svg';
import {ReactComponent as PlayIcon} from '../../../assets/icons/play_max.svg';
import './PlayButton.css';


function PlayButton({tracklistID, tracklist}) {
    const {tracklist: currentTracklist, isPlaying, load, togglePlayingState} = usePlayer();

    return (
        <>
            {
                (tracklistID === currentTracklist.id) ?
                    isPlaying ? 
                        <div onClick={togglePlayingState} className='play-button'>
                            <StopIcon height="28" width="28" viewBox="0 0 24 24" />
                        </div> :
                        <div onClick={togglePlayingState} className='play-button'>
                            <PlayIcon height="28" width="28" viewBox="0 0 24 24" />
                        </div> :
                    <div 
                        className='play-button' 
                        onClick={() => {
                            const index = tracklist.findIndex(item => item.preview_url);
                            if (index !== -1) {
                                load(tracklist[index].id, {id: tracklistID || tracklist[index].id, tracks: tracklist})
                            }
                        }} 
                    >
                        <PlayIcon height="28" width="28" viewBox="0 0 24 24" />
                    </div>
            }
        </>
    )
}

export default PlayButton;
