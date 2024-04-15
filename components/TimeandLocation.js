import React from 'react'
import { formatToLocalTime } from '/components/services/weatherService'
import Map from './Map';

const TimeandLocation = ({weather}) => {

    const formattedTime = (dt,timezone)=>{
        let time = timezone < 0 ? dt-19800 + timezone : dt-19800 + timezone ;
        console.log(time);
    
     return formatToLocalTime(time )
    }

    return (
        <div>
            <div className='flex items-center justify-center my-6'>
                <p className=' text-white text-xl font-extralight'>
                    { formattedTime(weather.dt,weather.timezone)}

                </p>

            </div>
            <div className='flex items-center justify-center my-3'>
                <p className='text-white text-3xl font-medium'>
                    { `${weather.name} , ${weather.country}`}
                </p>
            </div>
                <Map lat={weather.lat} lon={weather.lon} />
        </div>
    )
}

export default TimeandLocation
