import {useState, useEffect} from 'react'

const WeatherStatus = () =>{
    const [weather, setWeather] = useState(null);
    const [latitude, setLatitude] = useState(33.4484);
    const [longitude, setLongitude] = useState(-112.0740);

    const fetchWeather = async () =>{
        try{
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,rain,wind_speed_10m,relative_humidity_2m,apparent_temperature,is_day&wind_speed_unit=ms&temperature_unit=fahrenheit&precipitation_unit=inch`);

            const data = await response.json();
            setWeather(data.current);
        }catch(error){
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() =>{
        fetchWeather();
    }, [latitude, longitude]);
    
    useEffect(() =>{
        const interval = setInterval(() =>{
            fetchWeather();
        }, 60000);

        return () => clearInterval(interval);
    }, [])

    const handleLatitudeChange = (e) =>{
        setLatitude(parseFloat(e.target.value) || 0);
    };

    const handleLongitudeChange = (e) =>{
        setLongitude(parseFloat(e.target.value) || 0);
    };
    
    return(
        <div className='container'>
            <h2>Weather Location</h2>
                <p>Latitude:</p>
                <input type="number" value={latitude} onChange={handleLatitudeChange} placeholder='Put your latitude here' min="-90" max="90"/>
                <p>Longitude:</p>
                <input type="number" value={longitude} onChange={handleLongitudeChange} placeholder='Put your longitude here' min="-180" max="180"/>
                <p>Refresh Weather Status</p>
                <button onClick={fetchWeather}>Refresh Now</button>
            {weather ?(
                <div>
                    <h3>Current Weather at your location</h3>
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