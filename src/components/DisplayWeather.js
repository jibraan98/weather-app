import moment from 'moment/moment';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureThreeQuarters, faDroplet, faWind, faSmog, faSun, faMoon, faGauge } from '@fortawesome/free-solid-svg-icons';

const DisplayWeather = ({data}) => {

  const now = new Date();
  const name = data.name;


  //chooses what day to display based on number returned from Date() method...
  function today(day) {
    switch(day) {
      case 1:
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
      case 0:
        return 'Sunday'
      default: 
        return null;
    }
  }

  const logoChooser = (icon) => {
    switch(icon) {
      case '01n':
        return (<img src='http://openweathermap.org/img/wn/01n@2x.png' alt='logo'/>)
          case '02n':
        return (<img src='http://openweathermap.org/img/wn/02n@2x.png' alt='logo'/>)
        case '03n':
        return (<img src='http://openweathermap.org/img/wn/03n@2x.png' alt='logo'/>)
        case '04n':
        return (<img src='http://openweathermap.org/img/wn/04n@2x.png' alt='logo'/>)
        case '09n':
        return (<img src='http://openweathermap.org/img/wn/09n@2x.png' alt='logo'/>)
        case '10n':
        return (<img src='http://openweathermap.org/img/wn/10n@2x.png' alt='logo'/>)
        case '11n':
        return (<img src='http://openweathermap.org/img/wn/11n@2x.png' alt='logo'/>)
        case '13n':
        return (<img src='http://openweathermap.org/img/wn/13n@2x.png' alt='logo'/>)
        case '50n':
        return (<img src='http://openweathermap.org/img/wn/50n@2x.png' alt='logo'/>)

        case '01d':
          return (<img src='http://openweathermap.org/img/wn/01d@2x.png' alt='logo'/>)
          case '02d':
          return (<img src='http://openweathermap.org/img/wn/02d@2x.png' alt='logo'/>)
          case '03d':
          return (<img src='http://openweathermap.org/img/wn/03d@2x.png' alt='logo'/>)
          case '04d':
          return (<img src='http://openweathermap.org/img/wn/04d@2x.png' alt='logo'/>)
          case '09d':
          return (<img src='http://openweathermap.org/img/wn/09d@2x.png' alt='logo'/>)
          case '10d':
          return (<img src='http://openweathermap.org/img/wn/10d@2x.png' alt='logo'/>)
          case '11d':
          return (<img src='http://openweathermap.org/img/wn/11d@2x.png' alt='logo'/>)
          case '13d':
          return (<img src='http://openweathermap.org/img/wn/13d@2x.png' alt='logo'/>)
          case '50d':
          return (<img src='http://openweathermap.org/img/wn/50d@2x.png' alt='logo'/>)
      default:
        return null
    }
  }

  const calculateSunrise = () => {
    let timezone = data.timezone;
    let sunrise = data.sys.sunrise;

    let sunRise = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('HH:mm a')
    return sunRise;
  }

  const calculateSunset = () => {
    let timezone = data.timezone;
    let sunset = data.sys.sunset;

    let sunSet = moment.utc(sunset, 'X').add(timezone, 'seconds').format('HH:mm a')
    return sunSet;
  }

  //displays time location and logo of current weather
  const weatherInfo = () => {
    return (
      <div className='weather'>
      <div>
        {today(now.getDay()) + ' ' + now.getDate() + '/'+now.getMonth() + '/' +now.getFullYear()}
        <div className='location'>
          {name}
        </div>
      </div>
      <div className="logo">
        {logoChooser(data.weather[0].icon)}
      </div>
      <div className='temp'>
        {(data.main.temp).toFixed()}°C
      </div>
      <div className="description">
        {data.weather[0].description}
      </div>
      <div className="details">
        <div className="cardDetails">
          <p><FontAwesomeIcon icon={faTemperatureThreeQuarters} /> Feels like</p>
          {(data.main.feels_like).toFixed()}°C
        </div>
        <div className="cardDetails">
          <p><FontAwesomeIcon icon={faTemperatureThreeQuarters} /> Min|Max</p>
          {(data.main.temp_min).toFixed()}°C | {(data.main.temp_max).toFixed()}°C
        </div>
        <div className="cardDetails">
          <p><FontAwesomeIcon icon={faDroplet}/> Humidity</p>
          {(data.main.humidity).toFixed()}%
        </div>
        <div className="cardDetails">
          <p><FontAwesomeIcon icon={faGauge} /> Pressure</p>
          {(data.main.pressure).toFixed()}
        </div>
        <div className="cardDetails">
          <p><FontAwesomeIcon icon={faWind} /> Wind</p>
          {(data.wind.speed).toFixed()} km/h
        </div>
        <div className="cardDetails">
          <p><FontAwesomeIcon icon={faSmog} /> Visibility</p>
          {(data.visibility)/1000} km
        </div>
        <div className="cardDetails">
          <p><FontAwesomeIcon icon={faSun} /> Sunrise</p>
          {calculateSunrise()}
        </div>
        <div className="cardDetails">
          <p><FontAwesomeIcon icon={faMoon} /> Sunset</p>
          {calculateSunset()}
        </div>
      </div>
    </div>
    )

  }

  //start up code when first loaded -> displays welcome message
  const startUp = (info) => {
    if(info === undefined) {
      return (<div className="welcome">
          <h1>Welcome</h1>
          <p>Search for a city to get started...</p>
        </div>)
    }else {
      return (
          weatherInfo()
      )
    }
  }

  return (
    <div>
        {startUp(data.name)}
    </div>
  )
}

export default DisplayWeather