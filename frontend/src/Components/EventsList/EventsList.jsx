import { useEffect, useState } from 'react';
import axios from 'axios';

function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/locations')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
            {event.name}
             - {event.date}
             - {event.street_address_1}
             - {event.city}
             - {event.state}
             - {event.zip_code}
             
             
             </li>
      ))}
    </ul>
  );
}

export default EventsList;
