import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'; // Ensure this is the correct import
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

const MapStyles = styled.div`
    width: 40vw;
    height: 100vh;
`;

export default function Maps() {
    const mapBoxApiKey = import.meta.env.VITE_MAPBOX_API_KEY; // Correct access for Vite
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [currentLocation, setCurrentLocation] = useState([-73.985171, 40.758895]); // Manhattan NYC

    const successLocation = (position) => {
        const { latitude, longitude } = position.coords;
        const newCenter = [longitude, latitude];
        setCurrentLocation(newCenter); // Store new center

        if (map) {
            map.setCenter(newCenter);
        }
    };

    const errorLocation = () => {
        console.error("Location could not be found...");
    };

    useEffect(() => {
        if (mapContainer.current && !map && mapBoxApiKey) {
            mapboxgl.accessToken = mapBoxApiKey;
    
            const initializeMap = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: currentLocation,
                zoom: 13,
            });
            setMap(initializeMap);

            const nav = new mapboxgl.NavigationControl();
            initializeMap.addControl(nav);

            const directions = new MapboxDirections({
                accessToken: mapBoxApiKey,
            });
            initializeMap.addControl(directions, 'top-left');

            navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
                enableHighAccuracy: true
            });
        }

        return () => { // Cleanup on unmount
            if (map) {
                map.remove();
            }
        };
    }, [mapBoxApiKey, currentLocation]); // Dependency array

    return <MapStyles ref={mapContainer} />;
}

