import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>

const TestMap = ({location}) => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact 
                bootstrapURLKeys={{ key: 'AIzaSyCcPkFk32eip5YQz3W5_PTn9PqKKX-8ukU' }}
                center={location.center}
                zoom={location.zoom}
            >
                <AnyReactComponent
                    lat={location.center.lat}
                    lng={location.center.lng}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}

export default TestMap;