import React, { useEffect } from "react";

export default function Maps() {
    useEffect(() => {
        const mapBoxApiKey= import.meta.env.REACT_APP_MAPBOX_API_KEY;
        console.log(process.env.REACT_APP_MAPBOX_API_KEY);

        mapboxgl.accessToken = mapBoxApiKey;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            // center: [-74.5, 40], // Example center coordinates
            // zoom: 9 // Example zoom level
        });

    }, []); 

    return (
        <div id='map' style={{ width: '400px', height: '300px' }}></div>
    );
}

