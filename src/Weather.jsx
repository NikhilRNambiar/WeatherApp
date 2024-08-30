
import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading,setLoading]=useState(false);

    const apiKey = '27c28ca3522847c5ba760301243008'; 

    const fetchWeather = (e) => {
        e.preventDefault();
        setLoading(true);
        setWeatherData(null);

        axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
            .then(response => {
                setWeatherData(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(error => {
                alert('Failed to fetch weather data');
                setLoading(false);
            });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <form onSubmit={fetchWeather}>
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city name"
                    style={{ padding: '10px', width: '200px', marginRight: '10px',border:'1px' }}
                />
                <button type="submit" style={{ padding: '10px 20px',backgroundColor:'green',color:'white',border:'none' }}>Search</button>
            </form>

            {loading && <p> Loading data…</p>}

            
            {weatherData && (
                <div className='weather-cards' >
                    <div className='weather-card'>
                        <h3>Temparature</h3>
                        <p>{weatherData.current.temp_c} C</p>
                    </div>

                    <div className='weather-card'>
                        <h3>Humidity</h3>
                        <p>{weatherData.current.humidity}%</p>
                    </div>

                    <div className='weather-card'>
                        <h3>Condition</h3>
                        <p>{weatherData.current.condition.text} </p>
                    </div>

                    <div className='weather-card'>
                        <h3>Wind Speed</h3>
                        <p>{weatherData.current.wind_kph} kph </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;
