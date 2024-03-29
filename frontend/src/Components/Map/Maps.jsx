import React, { useEffect, useState } from "react";

export default function Maps() {
    const mapBoxApiKey = import.meta.env.REACT_APP_MAPBOX_API_KEY;
    const [map, setMap] = useState(null);

    useEffect(() => {
        mapboxgl.accessToken = mapBoxApiKey;

        const newMap = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
        });

        setMap(newMap);

        // Clean up the map instance on component unmount
        return () => newMap.remove();
    }, [mapBoxApiKey]);

    return (
        <div>
            <div id="map" style={{ width: '400px', height: '300px' }} />
        </div>
    );
}

