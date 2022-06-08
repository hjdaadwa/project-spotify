import { useEffect, useState } from "react";

import API from "../../services/api";

import './ArtistImg.css'


function ArtistImg({id, ...props}) {
    const [src, setSrc] = useState('https://i.ibb.co/L8KvKX5/default-artist-card.png');

    useEffect(async () => {
        if (id) {
            const response = await API.get(`artists/${id}`);
            const artistData = await response.json();
            setSrc(artistData.images[2].url || artistData.images[1].url || artistData.images[0].url)
        }
    }, [id]);

    if (id) {
        return (
            <img  src={src} {...props} />
        )
    } else {
        return (
            <img {...props} />
        )
    }

}

export default ArtistImg;