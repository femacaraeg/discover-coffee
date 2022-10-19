const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};
export const fetchCoffeeStores = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(
      '7.084513095103229%2C125.61906172742461',
      'coffee',
      6
    ),
    options
  );

  const data = await response.json();
  return data.results;
};
