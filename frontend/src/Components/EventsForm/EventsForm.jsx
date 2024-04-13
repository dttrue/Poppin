import eventsAPI from "../../Helpers/eventsHepler";
import axios from "axios";
import { useState } from "react";
import PropTypes from 'prop-types';

const EventsForm = ({ onSave }) => {
    console.log("EventsForm rendering");
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        locationId: '',
        newLocation: false, 
        locationName: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };



const handleSubmit = async (e) => {
    e.preventDefault();
    let finalLocationId = formData.locationId;

    // If creating a new location
    if (formData.newLocation && formData.locationName) {
        try {
            const locationData = {
                name: formData.locationName,
                street_address_1: formData.streetAddress1,
                city: formData.city,
                state: formData.state,
                zip_code: formData.zipCode,
                street_address_2: formData.streetAddress2 || '', 
            };
        
       
    

        // Post request to create a new location
        const locationResponse = await axios.post('http://localhost:3003/locations', locationData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Update the location ID with new one from the response
        finalLocationId = locationResponse.data.id;
      } catch (error) {
        console.error('Error creating location:', error.response ? error.response.data : error.message);
        return; // Stop the form submission if the location creation fails
      }
    }

    // Handling new event creation
    try {
       
        const newEvent = await eventsAPI.createEvent({ ...formData, locationId: finalLocationId });
        onSave(newEvent); // Callback function to handle the saved event
    } catch (error) {
        console.error("Error creating new event:", error.response ? error.response.data : error.message);
    }
};

    

return (
    <form onSubmit={handleSubmit}>
        <label>
            New Location:
            <input type="checkbox" name="newLocation" checked={formData.newLocation} onChange={handleChange} />
        </label>
        {formData.newLocation && (
            <div>
                <label>
                    Location Name:
                    <input type="text" name="locationName" value={formData.locationName} onChange={handleChange} required />
                </label>
                <label>
                    Street Address:
                    <input type="text" name="streetAddress1" value={formData.streetAddress1 || ''} onChange={handleChange} required />
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={formData.city || ''} onChange={handleChange} required />
                </label>
                <label>
                    State:
                    <input type="text" name="state" value={formData.state || ''} onChange={handleChange} required />
                </label>
                <label>
                    Zip Code:
                    <input type="text" name="zipCode" value={formData.zipCode || ''} onChange={handleChange} required />
                </label>
            </div>
        )}
        <button type="submit">Save Event</button>
    </form>
);

};

EventsForm.propTypes = {
    onSave: PropTypes.func.isRequired
  };

export default EventsForm;
