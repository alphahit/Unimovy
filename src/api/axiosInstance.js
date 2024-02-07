import axios from 'axios';
import config from './config';
console.log('config===>', config);

export const fetchImdbData = async movieId => {
  // console.log("movieId===>",movieId)
  // console.log("config.IMDB_KEY=====>",config.IMDBAPI_KEY)
  const options = {
    method: 'GET',
    url: 'https://imdb146.p.rapidapi.com/v1/title/',
    params: {id: movieId},
    headers: {
      'X-RapidAPI-Key': config.IMDBAPI_KEY,
      'X-RapidAPI-Host': 'imdb146.p.rapidapi.com',
    },
  };

  try {
    //console.log("tEst ===>")
    const response = await axios.request(options);
    //console.log('response=======>', JSON.stringify(response));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTrendingData = async (page = 1) => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/all/day',
      {
        params: {
          language: 'en-US',
          api_key: config.TMDBAPI_KEY, // Make sure to define API_KEY somewhere in your code
          page: page,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching trending data:', error);
    throw error;
  }
};

export const getSearchResults = async query => {
  console.log('getSearchResults====>', query);
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/multi',
      {
        params: {
          language: 'en-US',
          api_key: config.TMDBAPI_KEY,
          query: query,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching trending data:', error);
    throw error;
  }
};

export const getMovieDetails = async (id, type) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}`,
      {
        params: {
          language: 'en-US',
          api_key: config.TMDBAPI_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching trending data:', error);
    throw error;
  }
};
