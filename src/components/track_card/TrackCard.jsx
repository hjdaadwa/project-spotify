import './TrackCard.css';


function TrackCard({track}) {
    return (
        <div className="current-track">
            <div className="current-track__img-container">
                <img 
                    className="current-track__img" 
                    src={
                        track?.album?.images[2]?.url ||
                        track?.album?.images[1]?.url ||
                        track?.album?.images[0]?.url ||
                        'https://i.ibb.co/qrkY0xJ/track-placeholder.png'
                    } 
                    alt="Image for music track" 
                    width="56" 
                    height="56"
                />
            </div>
            <div className="current-track__text-container">
                <span className="current-track__name">
                    {track?.name}
                </span>
            </div>
        </div>
    )
}

export default TrackCard;