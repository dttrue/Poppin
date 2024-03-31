import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import mapboxgl from "mapbox-gl";


const MapStyles = styled.div`
    width: 40vw;
    height: 100vh;
`;

export default function Maps() {
    const mapBoxApiKey = process.env.REACT_APP_MAPBOX_API_KEY;
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    // Set Manhattan NYC as default location (longitude, latitude order)
    const [currentLocation, setCurrentLocation] = useState([-73.985171, 40.758895]); 

    const successLocation = (position) => {
        const { latitude, longitude } = position.coords;

        setCurrentLocation(`${latitude},${longitude}`);
    
        // Create a new center object based on position
        const newCenter = [longitude, latitude]; // Mapbox uses [longitude, latitude]
    
        // Update the map center using setMap
        if (map) {
          map.setCenter(newCenter);
        }
      };

    const errorLocation = () => {
        // Consider providing a user-friendly message or fallback action here
        console.error("Location could not be found...");
    };

    useEffect(() => {
    if (mapContainer.current && !map) {
            mapboxgl.accessToken = mapBoxApiKey;

            const newMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: currentLocation,
            zoom: 13,
        });
        setMap(newMap);

        // Add the navigation control after creating the map
        const nav = new mapboxgl.NavigationControl();
        newMap.addControl(nav);  // Add control to the map

        const directions = new MapboxDirections({
            accessToken: mapBoxApiKey   
        });
        newMap.addControl(directions, 'top-left');

        navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
            enableHighAccuracy: true
        });
    
    }

    // Clean up the map instance on component unmount
    return () => {
        if (map) {
        try {
            map.remove();
        } catch (error) {
            console.error('Error removing map:', error);
        }
        }
    };
    }, [mapBoxApiKey, map]);

    return (
        <MapStyles ref={mapContainer} />
    );
}
