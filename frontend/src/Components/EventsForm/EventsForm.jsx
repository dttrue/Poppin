
import axios from "axios";
import { useState } from "react";
import PropTypes from 'prop-types';

const EventsForm = ({ onSave }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      locationId: '',
      newLocation: false,
      locationName: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zipCode: ''
    });
  
    const handleFormChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        let finalLocationId = formData.locationId;
    
        // If creating a new location
        if (formData.newLocation) {
            try {
                const locationData = {
                    name: formData.locationName,
                    streetAddress1: formData.streetAddress1,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                };
    
            const locationResponse = await axios.post('http://localhost:3003/locations', locationData, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            finalLocationId = locationResponse.data.id; // Update location ID with new one
          } catch (error) {
            console.error('Error creating location:', error.response ? error.response.data : error.message);
            return; // Stop the form submission if the location creation fails
          }
        }

        if (!finalLocationId) {
            console.error('Location ID is required');
            return; // Ensure there is a locationId before proceeding
        }
    
        // Create an event
        try {
            const eventData = {
              title: formData.title,  // Changed from 'name' to 'title'
              description: formData.description,
              startDate: formData.startDate,  // Changed to match schema
              endDate: formData.endDate,  // Changed to match schema
              locationId: finalLocationId,  // Ensure this is not undefined
            };
          
            const response = await axios.post('http://localhost:3003/events', eventData);
            onSave(response.data);
            console.log('Event created:', response.data);
            setFormData({
              title: '',
              description: '',
              startDate: '',
              endDate: '',
              locationId: '',  // Reset all form data including locationId
              newLocation: false
            });  // Reset form
          
          } catch (error) {
            console.error('Error creating event:', error);
          }
          
      };

    

return (
    <form onSubmit={handleSubmit}>
        {/* Location Fields */}
        <label>
            New Location:
            <input type="checkbox" name="newLocation" checked={formData.newLocation} onChange={handleFormChange} />
        </label>
        {formData.newLocation && (
        <div>
          <label>
            Location Name:
            <input type="text" name="locationName" value={formData.locationName} onChange={handleFormChange} required />
          </label>
          <label>
            Street Address:
            <input type="text" name="streetAddress1" value={formData.streetAddress1} onChange={handleFormChange} required />
          </label>
          {/* Additional location fields */}
          <label>
            City:
            <input type="text" name="city" value={formData.city} onChange={handleFormChange} required />
          </label>
          <label>
            State:
            <input type="text" name="state" value={formData.state} onChange={handleFormChange} required />
          </label>
          <label>
            Zip Code:
            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleFormChange} required />
          </label>
        </div>
        )}
      {/* Event Fields */}
      <label>
        Event Name:
        <input type="text" name="title" value={formData.title} onChange={handleFormChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleFormChange} required />
      </label>
      <label>
        Start Date:
        <input type="date" name="startDate" value={formData.startDate} onChange={handleFormChange} required />
      </label>
      <label>
        End Date:
        <input type="date" name="endDate" value={formData.endDate} onChange={handleFormChange} required />
      </label>
      <label>
        Location ID (if existing):
        <input type="text" name="locationId" value={formData.locationId} onChange={handleFormChange} disabled={formData.newLocation} required={!formData.newLocation} />
      </label>

      <button type="submit">Create Event</button>
    </form>
);

};

EventsForm.propTypes = {
    onSave: PropTypes.func.isRequired
  };

export default EventsForm;
