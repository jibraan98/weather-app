import React, {useState} from 'react'
import axios from 'axios';
import DisplayWeather from './DisplayWeather';

//set a default location for loadup page
//pass down data as prop for display

const Home = () => {

  const[data, setData] = useState({});
  const[location, setLocation] = useState('');

  const api_key = (process.env.REACT_APP_API_KEY)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`;

  const findLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setLocation('')
    }
  }

  return (
    <div className='home'>
        <h1>Weather</h1>
        <div>
            <input 
            className="search" 
            type='search' 
            value={location} 
            placeholder='Search for a city' 
            onChange={event => setLocation(event.target.value)} 
            onKeyPress={findLocation}
            />
        </div>
        <DisplayWeather data={data}/>
    </div>
  )
}

export default Home