import useQuery from "../../hook/useQuery";
import API from "../../services/api";

import './ArtistImg.css'


function ArtistImg({id, ...props}) {
    const artist = useQuery(API.get.bind(API), `artists/${id}`);
    
    if (id) {
        return (
            <img 
                src={artist.response?.images[2]?.url || artist.response?.images[1]?.url || artist.response?.images[0]?.url || 'https://i.ibb.co/L8KvKX5/default-artist-card.png'} 
                {...props} 
            />
        )
    } else {
        return (
            <img {...props} />
        )
    }

}

export default ArtistImg;