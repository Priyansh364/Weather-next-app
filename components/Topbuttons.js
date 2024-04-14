import React from 'react'

const Topbuttons = ({setQuery}) => {

    const cities = [
        {
            id:1,
            title : 'Jabalpur'
        },
        {
            id:2,
            title : 'tokyo'
        },
        {
            id:3,
            title : 'Paris'
        },
        {
            id:4,
            title : 'Bangalore'
        },
        {
            id:5,
            title : 'Mumbai'
        },
    ]

  return (
    <div>
        <div className='flex items-center justify-around my-6'>

        {cities.map((city)=>(
            <div key={city.id} >

            <button onClick={()=> setQuery({q:city.title})} className='text-white text-lg font-medium' >{city.title}</button>
            </div>
        ))}

        </div>
    </div>
  )
}

export default Topbuttons
