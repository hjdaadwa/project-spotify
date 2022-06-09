import './VolumeInput.css';


function VolumeInput({changeVolume}) {
    return (
        <input 
            className="music-player__volume-bar-input" 
            type="range" 
            min="0" 
            max="1" 
            step="0.001" 
            defaultValue="0.1"
            onClick={(event) => changeVolume(event.target.value)}
        />
    )
}

export default VolumeInput;