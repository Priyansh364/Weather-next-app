import React from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { useState } from 'react'


const Inputs = ({setQuery,setUnits,units}) => {
    const [city, setCity] = useState("")

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
      };


    const handleSearchClick =() =>{
        if(city!=='') setQuery({q:city})
    }

    const handleLocationclick =() =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                let lat = position.coords.latitude;
                let lon =position.coords.longitude;

                setQuery({
                    lat,lon
                });
            })
        }
    }


    const unitschange=(e)=>{

        const selectedunit = e.currentTarget.name;
        console.log(e.currentTarget.name);
        if(units !== selectedunit) setUnits(selectedunit); 

    }


    return (
        <div>

            <div className='flex flex-row justify-center my-6 '>
                <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                    <input value={city}  onKeyDown={handleKeyPress} onChange={(e)=>setCity(e.currentTarget.value)}
                     className='text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize' type="text" placeholder='Search for city...' />
                    <UilSearch onClick={handleSearchClick} className='h-8 w-8 text-white cursor-pointer transition ease-out hover:scale-125' />
                    <UilLocationPoint onClick={handleLocationclick} className='h-8 w-8 text-white cursor-pointer transition ease-out hover:scale-125' />

                </div>


                <div className='flex flex-row justify-center items-center w-1/4'> 
                <button onClick={unitschange} name='metric' className='transition ease-out hover:scale-125 text-xl text-white font-light' > °C</button>
                <p className='mx-1 text-white text-xl'> |</p>
                <button onClick={unitschange} name='imperial' className='text-xl text-white font-light transition ease-out hover:scale-125'> °F</button>
                </div>


            </div>

        </div>

    )
}

export default Inputs
