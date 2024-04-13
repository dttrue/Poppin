import axios from "axios";

const getAllEvents = async () => {
    try {
        const response = await axios.get("http://localhost:3003/events");
        return response.data;
}

    catch (error) {
        console.error(error);
    }

}

const createEvent = async (event) => {
    try {
        const response = await axios.post("http://localhost:3003/events", event);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    
}

const deleteEventById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3003/events/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    
}

const updateEventById = async (id, event) => {
    try {
        const response = await axios.put(`http://localhost:3003/events/${id}`, event);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    
}

const getEventById = async (id) => {
    try{
        const response = await axios.get(`http://localhost:3003/events/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    
}

const getEventsByLocationId = async (id) => {
    try{
        const response = await axios.get(`http://localhost:3003/events/location/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default {
     getAllEvents,
     createEvent,
     deleteEventById,
     updateEventById,
     getEventById,
     getEventsByLocationId
    };
