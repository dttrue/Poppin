import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import mapboxgl from "mapbox-gl";

const MapStyles = styled.div`
    width: 30vw;
    height: 100vh; 
`;

export default function Maps() {
  const mapBoxApiKey = process.env.REACT_APP_MAPBOX_API_KEY;
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapContainer.current && !map) {
      mapboxgl.accessToken = mapBoxApiKey;
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
      });
      setMap(newMap);
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