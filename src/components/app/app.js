import React, { useState } from 'react';
import { fetchWeather } from '../../api/fetchWeather';
import './index.css';

const App = () => {
  let dateObject = {};

  const [query, setQuery] = useState('');
  const [temp, setTemp] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [sunRise, setSunRise] = useState('');
  const [sunSet, setSunSet] = useState('');
  const [description, setDesciption] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [humidity, setHumidity] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.length === 0) {
      console.log('please enter a city to search for the weather ....');
    } else {
      const data = await fetchWeather(query);
      setTemp(data.main.temp);
      setCity(data.name);
      setCountry(data.sys.country);
      setSunRise(JSON.stringify(new Date(data.sys.sunrise * 1000)));
      setSunSet(JSON.stringify(new Date(data.sys.sunset * 1000)));
      setDesciption(data.weather[0].description);
      setWindSpeed(data.wind.speed);
      setHumidity(data.main.humidity);
      console.log(data);
      document.getElementById('cardwidth').style.opacity = 1;
      setQuery('');
    }
  };

  return (
    <div className="main">
      <section className="title">
        <div className="row">
          <div className="col">
            <center>
              <h1>React Weather API App</h1>
              <p className="motto">Lets see what today's weather like ... </p>
            </center>
          </div>
        </div>
      </section>
      <section className="sandraColor">
        <div className="row">
          <div className="col">
            <center>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a city name to see its weather ..."
                />
                <br />
                <br />
                <button type="submit" className="search-btn">
                  Search
                </button>
              </form>
            </center>
          </div>
        </div>
      </section>
      <section id="cardwidth" className="container card cardwidth">
        <h3>
          City: {city}{' '}
          <span>
            <sup>Country Code: {country}</sup>
          </span>
        </h3>
        <h4>
          Tempreture: {temp}{' '}
          <span>
            <sup> &#x2109;</sup>
          </span>
        </h4>
        <h5>Humidity: {humidity}</h5>
        <p>Description: {description}</p>
        <p>Wind Speed: {windSpeed} Knots</p>
        <p>Sunrise: {sunRise} </p>
        <p>Sunset: {sunSet} </p>
      </section>
    </div>
  );
};

export default App;
