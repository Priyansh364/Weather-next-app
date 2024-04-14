import { DateTime } from "luxon";

const API_KEY = 'd0c996b2dcd134ea9fbe466ca52cb54e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const getWeatherData = (infoType, searchParams) => {

    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url)
        .then(response => response.json())
}

const formatCurrentData = (data) => {
    const {
        timezone:timezone,
        coord: { lat, lon },
        main: { temp, temp_min, feels_like, temp_max, humidity },
        name,
        dt,
        weather,
        sys: { country, sunrise, sunset },
        wind: { speed }

    } = data

    const { main: details, icon } = weather[0];

    return { lat, lon,timezone, temp, temp_min, feels_like, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed }
}

const formatForecastData = (data) => {
    let { list } = data;
    let offset = data.city.timezone;
    
    
    list = list.slice(0, 5).map(d =>{
        
        let dt = d.dt;
        dt = offset < 0 ? dt-19800 + offset : dt-19800 + offset;

        return{

            title:formatToLocalTime(dt,data.city.timezone,'hh:mm a'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        }
    });



    return {list}


    // daily=daily.map(d =>{
    //     return{
    //         title:formatToLocatTime(d.dt,timezone,'ccc'),
    //         temp: d.temp.day,
    //         icon: d.weather[0].icon

    //     }
    // })
    // hourly=data.list.slice(1,5).map(d =>{
    //     return{
    //         title:formatToLocatTime(d.dt,dt_txt,'ccc'),
    //         temp: d.temp,
    //         icon: d.weather[0].icon

    //     }
    // })


}


const getFormatedData = async (searchParams) => {
    const formatedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentData);

    const { lat, lon } = formatedCurrentWeather

    const formattedForecastWeather = await getWeatherData('forecast', { lat, lon, exclude: 'current,minutly,alerts', units: searchParams.units }).then(formatForecastData)

    return { ...formatedCurrentWeather, ...formattedForecastWeather };
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone("Asia/Kolkata").toFormat(format);

  


export default getFormatedData;

export { formatToLocalTime };

