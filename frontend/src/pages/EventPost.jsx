// src/components/EventPost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EventPost = () => {
    const state = useLocation().state;
    const [eventName, setEventName] = useState(state?.eventName || '');
    const [eventDate, setEventDate] = useState(state?.eventDate || '');
    const [eventLocation, setEventLocation] = useState(state?.eventLocation || '');
    const [maxParticipants, setMaxParticipants] = useState(state?.maxParticipants || '');
    const [eventDescription, setEventDescription] = useState(state?.eventDescription || '');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = state
                ? await axios.put(`/api/events/${state.id}`, { eventName, eventDate, eventLocation, maxParticipants, eventDescription })
                : await axios.post('/api/events/', { eventName, eventDate, eventLocation, maxParticipants, eventDescription });

            console.log('Event posted:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error posting event:', error.response.data);
        }
    };

    return (
        <div>
            <h2>Post an Event</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Event Location"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Max Participants"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Event Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    required
                />
                <button type="submit">Post Event</button>
            </form>
        </div>
    );
};

export default EventPost;