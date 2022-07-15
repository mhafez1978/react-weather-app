import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const APIKEY = 'b3fe6e0f63e6f3dd1aa4f70589031c4b';

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'imperial',
      appid: APIKEY,
    },
  });

  return data;
};
