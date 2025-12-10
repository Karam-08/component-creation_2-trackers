import {useState, useEffect, useCallback} from 'react'

const WeatherStatus = () =>{
    const [weather, setWeather] = useState(null);
    const [latitude, setLatitude] = useState(33.4484);
    const [longitude, setLongitude] = useState(-112.0740);

    const fetchWeather = useCallback(async () =>{
        try{
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,rain,wind_speed_10m,relative_humidity_2m,apparent_temperature,is_day&wind_speed_unit=ms&temperature_unit=fahrenheit&precipitation_unit=inch`);
            const data = await response.json();
            setWeather(data.current);
        }catch(error){
            console.error("Error fetching weather data:", error);
        }
    }, [latitude, longitude])

    useEffect(() =>{
        fetchWeather();
    }, [fetchWeather])

    const handleLatitudeChange = (e) =>{
        setLatitude(parseFloat(e.target.value));
    };

    const handleLongitudeChange = (e) =>{
        setLongitude(parseFloat(e.target.value));
    };
    
    return(
        <div class='container'>
            <h2>Current Weather Status</h2>
                <h3>Latitude:</h3>
                    <input type="number" value={latitude} onChange={handleLatitudeChange} placeholder='Put your latitude here' min="-90" max="90"/>
                <h3>Longitude:</h3>
                    <input type="number" value={longitude} onChange={handleLongitudeChange} placeholder='Put your longitude here' min="-180" max="180"/>
            {weather ?(
                <div>
                    <p>Latitude: {latitude}, Longitude: {longitude}</p>
                    <p>Last Updated: {weather.time}</p>
                    <p>Temperature: {weather.temperature_2m} degrees Fahrenheit</p>
                </div>
            ):(
                <p>Loading weather data...</p>
            )}
        </div>
    )
}

export default WeatherStatus