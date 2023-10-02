import React from "react";
import axios from "axios";

import WeatherForecastDisplay from "./WeatherForecastDisplay";
import Cities from "./Cities"
import "../styles/WeatherForecast.css"

function WeatherForecast() {
    const [city, setCity] = React.useState();
    const [weatherData, setweatherData] = React.useState({});

    function getLocation(){
        const geocodingURl = 'https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json&name=';
        setCity(Cities[document.getElementById("weather-forecast-select-city").value]);
        axios.get(geocodingURl + document.getElementById("weather-forecast-select-city").value).then(res => {
            getWeather(res.data.results[0]);
        });
    };

    function getWeather(res){
        const start_date = new Date();
        const end_date = new Date();
        if (document.getElementById("weather-forecast-checkbox").checked) {
            end_date.setDate(end_date.getDate() + 4);
        };
        const weatherURL = `https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max,temperature_2m_min&timezone=GMT&latitude=${res.latitude}&longitude=${res.longitude}&start_date=${start_date.toISOString().slice(0, 10)}&end_date=${end_date.toISOString().slice(0, 10)}`;
        axios.get(weatherURL).then(res => {
            setweatherData(res.data.daily);
        });

    };

    return (
        <>
            <div className="weather-forecast-input">
                <div>
                    <select id="weather-forecast-select-city">
                        { Object.keys(Cities).map((city) => <option className="weather-forecast-option-city" value={city} key={city}>{Cities[city]}</option>) }
                    </select>
                </div>
                <div>
                    <input className="weather-forecast-checkbox" id="weather-forecast-checkbox" type="checkbox" />
                    <label htmlFor="weather-forecast-checkbox" >На ближайшие 5 дней.</label>
                </div>
                <div>
                    <button id="weather-forecast-button" onClick={getLocation}>КлиК</button>
                </div>
            </div>
            <div><h1>{ city }</h1></div>
            { Object.entries(weatherData).length > 0 ? <WeatherForecastDisplay weatherData={weatherData}/> : ""}
        </>
        );
};

export default WeatherForecast;