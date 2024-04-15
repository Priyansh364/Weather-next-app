'use client'
import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import Topbuttons from '/components/Topbuttons'
import Inputs from '/components/Inputs'
import TimeandLocation from '/components/TimeandLocation'
import TemperatureandDetails from '/components/TemperatureandDetails'
import Forecast from '/components/Forecast'
import getFormatedData from '/components/services/weatherService'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
// import newcitydata from '../services/CityService'


const Main = () => {
    // extract query parameters from props

    const params = useSearchParams();
    const [query, setQuery] = useState({ q: params.get('city') ?? 'Berlin' })
    const [units, setUnits] = useState('metric')
    const [weather, setWeather] = useState(null)


    useEffect(() => {

        const fetchWeather = async () => {
            await getFormatedData({ ...query, units }).then(data => {
                { setWeather(data) }
                console.log(data);
            })

        }

        fetchWeather();


    }, [query, units])



    const formatbackground = () => {

        if (!weather) return 'from-cyan-700 to-blue-700'

        const threshold = units === "metric" ? 25 : 80;

        if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

        return 'from-orange-700 to-yellow-700'

    }

    return (
        <div className='h-fit w-full mt-0g'>
            <div className={`z-2 relative mx-auto max-w-screen-md my-5 py-5 sm:px-32 bg-gradient-to-br ${formatbackground()} h-fit shadow-xl shadow-gray-400 container rounded-3xl`}>
                <Link href="/" className=' z-2 absolute  container w-full mx-10 text-white left-0'>&larr; Home</Link>
                <Topbuttons setQuery={setQuery} />
                    <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

                {weather &&
                    <div>

                        <TimeandLocation weather={weather} />
                        <TemperatureandDetails weather={weather} />
                        <Forecast title='3 Hourly Forecast' items={weather.list} />

                    </div>

                }
            </div>
        </div>
    )
}

export default Main
