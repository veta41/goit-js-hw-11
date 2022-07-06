// import axios from "axios";
// axios.defaults.baseURL = 'https://pixabay.com/api';
// const API_KEY = '28265078-0316afef2c157389b1fbaa4c7';
// const PARAM = 'per_page=40&orientation=horizontal&image_type=photo&safesearch=true';

// export class FetchImagesService {
//     constructor(){
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     async fetchImages () {
//         try{
//             const responce = await axios.get(`/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${PARAM}`);
//             this.incrementPage();
//             return responce;
//             console.log(responce);
        
//         } catch (error) {
//             console.log(error);
//         }
        
//     }

//     incrementPage() {
//         this.page += 1;
//     }

//     resetPage() {
//         this.page = 1;
//     }
// }

import axios from 'axios';
//----------------------------------------------//

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

// export { getImgs };
