import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [formData, setFormData] = useState({ name: '', birthdate: '', birthtime: '', city: '' });
    const [compatibility, setCompatibility] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/natal_chart', formData)
            .then(response => {
                setCompatibility(response.data.positions);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Dating with the Stars</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <input type="date" name="birthdate" placeholder="Birthdate" onChange={handleChange} />
                <input type="time" name="birthtime" placeholder="Birth Time" onChange={handleChange} />
                <input type="text" name="city" placeholder="Birth City" onChange={handleChange} />
                <button type="submit">Get Compatibility</button>
            </form>
            {compatibility && (
                <div>
                    <h2>Compatibility Results</h2>
                    <p>{JSON.stringify(compatibility)}</p>
                </div>
            )}
        </div>
    );
};

export default App;
