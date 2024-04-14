import React from 'react'

const Forecast = ({title,items}) => {
  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>
                {title}
            </p>
        </div>
        <hr className='my-2' />

        <div className='flex items-center justify-between text-white flex-row'>
            {items.map((item,index)=>(

            <div key={index} className='flex flex-col items-center justify-center'>
                <p className='font-light text-sm '>
                    {item.title}
                </p>
                <img className='w-12 m-1' src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="" />
                <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>

            </div>

            ))}

            

        </div>
    </div>
  )
}

export default Forecast
