import './Player.css'


/**
 * Разметка плеера. Пока не реализован.
 * @returns {JSX.Element}
 */
function Player() {
    return (
        <footer className="music-player">
        <div className="current-track">
            <div className="current-track__img-container">
                <img className="current-track__img" src="" alt="Image for music track" width="56" height="56"/>
            </div>
            <div className="current-track__text-container">
                <span className="current-track__name"></span>
            </div>
        </div>
        <div className="music-player__controller">
            <div className="music-player__btns">
                <button className="music-player__previous-btn" aria-label="Previous track button">
                    <svg className="music-player__previous-img" role="img" height="16" width="16" viewBox="0 0 16 16"><path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"></path></svg>
                </button>
                <button className="music-player__play-btn" aria-label="Play/stop track button">
                    <svg className="music-player__play-img" role="img" height="16" width="16" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>
                    <svg className="music-player__stop-img"  role="img" height="16" width="16" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>
                </button>
                <button className="music-player__next-btn" aria-label="Next track button">
                    <svg className="music-player__next-img" role="img" height="16" width="16" viewBox="0 0 16 16"><path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path></svg>
                </button>
            </div>
            <div className="music-player__playback-container">
                <input className="music-player__playback-bar" type="range" min="0" max="30" step="0.0001" defaultValue="0"/>
                <div className="music-player__playback-clicker"></div>
            </div>
        </div>
        <div className="music-player__right-panel-wrapper">
            <button className="music-player__volume-bar-btn" aria-label="Turn off the sound">
                <svg className="music-player__volume-bar-img mute__off" role="img" height="16" width="16" viewBox="0 0 16 16">
                    <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path>
                    <path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
                </svg>
                <svg className="music-player__volume-bar-img mute__on" height="16" width="16"  id="volume-icon" viewBox="0 0 16 16">
                    <path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path>
                    <path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
                </svg>
                

            </button>
            <input className="music-player__volume-bar-input" type="range" min="0" max="1" step="0.001" defaultValue="0.3"/>
        </div>
    </footer>
    )
}

export default Player;