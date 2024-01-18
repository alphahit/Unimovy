import axios from 'axios';
import config from './config';

export const fetchTrendingData = async (page = 1) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day`,
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
