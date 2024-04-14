'use client'
import Link from 'next/link';
import React from 'react'
// import Topbuttons from './Topbuttons'
// import Inputs from './Inputs'
// import newcitydata from '../services/CityService'
import { useEffect, useState } from 'react'
// import Citydata from './Citydata'
import InfiniteScroll from 'react-infinite-scroll-component';
import { UilSearch } from '@iconscout/react-unicons'



export default function Home() {
    const [city, setCity] = useState("")

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (city !== '') {
                window.location.href = `/Main?city=${city}`
            }
        }
    };


    const handleMain = (City) => {
        // Navigate to a new page and pass a prop
    };


    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 10; // Number of items per page

    const fetchData = (trigger) => async () => {
        const apiOffset = (trigger === 'scroll') ? items.length : 0;
        const apiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${apiOffset}` + (city ? `&where=%22${city}%22` : '');

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data.results);

            if (data.results && data.results.length > 0) {
                // Extract the relevant data from the API response
                const newItems = data.results.map(record => ({
                    city: record.ascii_name,
                    country: record.cou_name_en,
                    timezone: record.timezone,
                }));

                if (trigger === 'scroll') {
                    // Update state with new items
                    setItems(prevItems => [...prevItems, ...newItems]);

                    // Check if there are more items to load
                    if (data.results.length < pageSize) {
                        setHasMore(false);
                    }
                }
                else {
                    setItems(newItems);
                    setHasMore(true);
                }
            } else {
                setHasMore(false); // No more data to load
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setHasMore(false); // Set hasMore to false to stop infinite scroll on error
        }
    };

    useEffect(() => {
        fetchData()();
    }, [city])


    return (
        <>
            <div className='w-full h-fit mx-auto mt-0'>
                <section className="z-2 max-w-screen-md my-16 sm:px-32 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl shadow-gray-400 container rounded-3xl text-gray-50 body-font px-5 py-7 mx-auto">
                    <div className="flex flex-col text-center w-full mb-10">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font text-gray-50">Get the Weather </h1>
                    </div>
                    <div className='flex gap-2 items-center mb-4'>
                        <input
                            value={city} onKeyDown={handleKeyPress} onChange={(e) => setCity(e.currentTarget.value)}
                            className=' font-normal p-2 focus:outline-none grow shadow-xl text-black capitalize' type="text" placeholder='Search for city...' />
                        <Link href={`/Main?city=${city}`}>
                            <UilSearch />
                        </Link>
                    </div>

                    <div className=" w-full mx-auto ">
                        <table className="table-auto  w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 w-1/3 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">City</th>
                                    <th className="px-4 w-1/3 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Country</th>
                                    <th className="px-4 w-1/3 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Timezone</th>
                                </tr>
                            </thead>
                        </table>

                        {/* <Citydata city={city}/> */}
                        <InfiniteScroll
                            dataLength={items.length}
                            next={fetchData('scroll')}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={<p>No more items to load</p>}
                            // scrollThreshold={10}
                            height={384}
                        >
                            {items.map((item, index) => (

                                <table key={index} onClick={() => {window.location.href = `/Main?city=${item.city}` }} className="table-auto w-full text- whitespace-no-wrap hover:cursor-pointer hover:bg-slate-400/50 active:bg-slate-400/80">
                                    <tbody >

                                        <tr onClick={() => handleMain(item.city)}>
                                            <td className="w-1/3 px-4 py-3">{item.city}</td>
                                            <td className="w-1/3 px-4 py-3">{item.country}</td>
                                            <td className="px-4 w-1/3 py-3">{item.timezone}</td>

                                        </tr>
                                    </tbody>

                                </table>

                            ))}
                        </InfiniteScroll>
                    </div>
                </section>
            </div>


        </>

    );
}
