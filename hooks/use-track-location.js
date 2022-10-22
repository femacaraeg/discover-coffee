import React, { useState } from 'react';

const useTrackLocation = () => {
  const [locationErrorMessage, setLocationErrorMessage] = useState('');
  const [latLong, setLatLong] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMessage('');
    setIsFindingLocation(false);
  };

  const error = () => {
    setIsFindingLocation(false);
    setLocationErrorMessage('Unable to retrieve your location');
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMessage('Geolocation is not supported by your browser');
      setIsFindingLocation(false);
    } else {
      // setLocationErrorMessage('Locating…');
      navigator.geolocation.getCurrentPosition(success, error);
      // setIsFindingLocation(false);
    }
  };

  return {
    latLong,
    handleTrackLocation,
    locationErrorMessage,
    isFindingLocation,
  };
};

export default useTrackLocation;
