import { useEffect, useState } from 'react';
import axios from 'axios';

function EventsList() {
    const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch locations
        const locationsResponse = await axios.get('http://localhost:3003/locations');
        setLocations(locationsResponse.data);

        // Fetch events
        const eventsResponse = await axios.get('http://localhost:3003/events');
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
          {event.title}
          - {event.locationId}
          - {event.location.name}
          - {event.startDate}
          - {event.endDate}
          - {event.description}
          - {event.location.street_address_1}
          - {event.location.city}
          - {event.location.state}
          - {event.location.zip_code}
         

             
             </li>
      ))}
    </ul>
  );
}

export default EventsList;
