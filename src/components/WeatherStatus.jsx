import {useState, useEffect} from 'react'

const WeatherStatus = () =>{
    const [weathers, setWeather] = useState()
    const fetchWeather = async () =>{
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=33.4484&longitude=-112.074&current=temperature_2m,precipitation,rain,wind_speed_10m,relative_humidity_2m,apparent_temperature,is_day&wind_speed_unit=ms&temperature_unit=fahrenheit&precipitation_unit=inch')
        const weatherList = await response.json()
        setWeather(weatherList)
    }
    useEffect(() => {
        fetchWeather();
    })
    
    return (
        <div>
            <h1>List of All</h1>
            {weathers.weather.map((p, index) =>{
                return <div key={index}><h1>{p.pokemon.name}</h1></div>
            })}
        </div>
    )
}

export default WeatherStatus
