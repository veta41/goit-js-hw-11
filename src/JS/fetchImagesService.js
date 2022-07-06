
import axios from 'axios';


const API_KEY = '28265078-0316afef2c157389b1fbaa4c7';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(name, page) {
  const params = {
    url: BASE_URL,
    params: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: false,
      q: name,
      page: page,
      per_page: 40,
    },
  };

  return await axios(params);
}


