import React from 'react'
import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset } from "@iconscout/react-unicons";
import { formatToLocalTime } from '/components/services/weatherService';

const TemperatureandDetails = ({weather: {details ,icon,timezone,temp,temp_min,temp_max,sunrise,sunset,speed,feels_like,humidity}}) => {
    return (
        <div>
            <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
                <p>{details}</p>



            </div>
            <div className='flex items-center justify-between text-white py-3'>
                <img className='w-20' src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
                <div className='flex flex-col space-y-2'>
                    <div className='flex font-light text-sm items-center justify-center'>
                        <UilTemperature size={18} className='mr-1' />
                        Real fell:
                        <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                    </div>
                    <div className='flex font-light text-sm items-center justify-center'>
                        <UilTemperature size={18} className='mr-1' />
                        Humidity:
                        <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
                    </div>
                    <div className='flex font-light text-sm items-center justify-center'>
                        <UilTemperature size={18} className='mr-1' />
                        Wind :
                        <span className='font-medium ml-1'>{`${speed.toFixed()} km/hr`}</span>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-center text-white space-x-2 py-3 text-sm'>
                <UilSun/>
                <p className='font-light'>
                    Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise-19800+timezone,'Europe/Berlin','hh:mm a')}</span>
                </p>
                <p className='font-light'> | </p>
                <UilSunset/>
                <p className='font-light'>
                    Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset-19800+timezone,'Europe/Berlin','hh:mm a')}</span>
                </p>
                <p className='font-light'> | </p>
                <UilSun/>
                <p className='font-light'>
                    High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
                </p>
                <p className='font-light'> | </p>
                <UilSun/>
                <p className='font-light'>
                    Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
                </p>



            </div>
        </div>
    )
}

export default TemperatureandDetails
