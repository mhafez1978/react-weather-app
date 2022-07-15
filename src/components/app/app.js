import React, { useState } from 'react';
import { fetchWeather } from '../../api/fetchWeather';

const App = () => {
  const [query, setQuery] = useState('');
  const [temp, setTemp] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [sunRise, setSunRise] = useState('');
  const [sunSet, setSunSet] = useState('');
  //   const [timeZone, setTimeZone] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.length === 0) {
      console.log('please enter a city to search for the weather ....');
    } else {
      const data = await fetchWeather(query);
      setTemp(data.main.temp);
      setCity(data.name);
      setCountry(data.sys.country);
      setSunRise(data.sys.sunrise);
      setSunSet(data.sys.sunset);
      //   setTimeZone(data.timezone);
      console.log(data);
      setQuery('');
    }
  };

  return (
    <div className="main">
      <section>
        <div className="row">
          <div className="col">
            <center>
              <h1>Lookup the Weather App</h1>
              <p>Search for weather around the globe ... </p>
            </center>
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="col">
            <center>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="type city name to see weather ..."
                />
                <button type="submit" className="search-btn">
                  Search
                </button>
              </form>
            </center>
          </div>
        </div>
      </section>
      <section>
        <center>
          <h2>Country: {country}</h2>
          <h3>City: {city}</h3>
          <h4>
            Tempreture: {temp}{' '}
            <span>
              <sup> &#x2109;</sup>
            </span>
          </h4>
          <p>Sunrise: {sunRise} </p>
          <p>Sunset: {sunSet} </p>
        </center>
      </section>
    </div>
  );
};

export default App;
