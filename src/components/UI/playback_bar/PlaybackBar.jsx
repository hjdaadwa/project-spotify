import './PlaybackBar.css';


function PlaybackBar({onChange, value}) {
    return (
        <input 
            onChange={(event) => onChange(event.target.value)} 
            className="music-player__playback-bar" 
            type="range" min="0" max="30" 
            step="0.0001" 
            value={value}
        />
    )
}

export default PlaybackBar;