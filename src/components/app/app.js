import React, { useState } from 'react';
import { fetchWeather } from '../../api/fetchWeather';
import './index.css';

const App = () => {
  // let dateObject = {};

  const [query, setQuery] = useState('');
  const [temp, setTemp] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [sunRise, setSunRise] = useState('');
  const [sunSet, setSunSet] = useState('');
  const [description, setDesciption] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [humidity, setHumidity] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.length === 0) {
      console.log('please enter a city to search for the weather ....');
      document.getElementById('error').innerText =
        'Please type name of a city then hit search';
      document.getElementById('error').style.display = 'block';
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
      document.getElementById('error').style.display = 'none';
      setImgUrl(
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
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
              <label id="error"></label>
            </center>
          </div>
        </div>
      </section>
      <section id="cardwidth" className="container card cardwidth">
        <h3>City: {city} </h3>
        <h4>Country Code: {country}</h4>
        <tr>
          <td>
            <h4>
              Tempreture: {temp}{' '}
              <span>
                <sup> &#x2109;</sup>
              </span>
            </h4>
            <h5>Humidity: {humidity}</h5>
          </td>
          <td>
            <p>
              <img src={imgUrl} alt="weather impressions" />
            </p>
          </td>
        </tr>

        <p>Description: {description}</p>
        <p>Wind Speed: {windSpeed} Knots</p>
        <p>Sunrise: {sunRise} </p>
        <p>Sunset: {sunSet} </p>
      </section>
    </div>
  );
};

export default App;
