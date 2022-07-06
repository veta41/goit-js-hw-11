import { refs } from './getRefs';

export function makeImageMarkup ( hits ) {
  const markup = hits.map(({ largeImageURL, webformatURL, tags, likes, views,comments, downloads } ) => {
return `<div class="photo-card">
   <a class="gallery__link" href="${largeImageURL}">
   <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
   <div class="info">
   <p class="info-item">
       <b>Likes: ${likes}</b>
   </p>
   <p class="info-item">
       <b>Views: ${views} </b>
   </p>
   <p class="info-item">
       <b>Comments: ${comments}</b>
   </p>
   <p class="info-item">
       <b>Downloads: ${downloads}</b>
   </p>
   </div>
   </div>`})

  .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}


