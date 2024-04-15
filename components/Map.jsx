import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function Map(props) {
    const center = {
        lat: props.lat,
        lng: props.lon,
    }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            mapContainerClassName='w-full h-96'
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)
