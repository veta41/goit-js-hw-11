import 'modern-normalize';
import './css/styles.css';


import { fetchImages } from './JS/fetchImagesService';
import { makeImageMarkup } from './JS/markupService';
import { refs } from './JS/getRefs';
import {lightbox} from './JS/lightBoxGallery';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';




let page = 1;
let searchQuery = null;



const observer = new IntersectionObserver(onObserver, {
  rootMargin: '200px',
  threshold: 1.0, 

});

refs.formSearch.addEventListener('submit', onSubmitForm);



function onSubmitForm(e) {
  e.preventDefault();
  
  observer.unobserve(refs.scroll);
  
  refs.gallery.innerHTML = '';
  page = 1;
  searchQuery = e.target.elements.searchQuery.value;
  e.currentTarget.reset();
  

  if (searchQuery === '') {
    return Notiflix.Notify.failure("Sorry, you didn't write anything");
  }

  fetchImages(searchQuery, page)
    .then(response => {
      console.log(response);
      if (!response.data.totalHits) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
      console.log(response.data);
      makeImageMarkup(response.data.hits);
    
      lightbox.refresh();
      observer.observe(refs.scroll);
      
    })
    .catch(console.log);
}

function onObserver(entries) {

  
  entries.forEach(entry => {
    console.log(entry);
    
    if (entry.isIntersecting) {
      page += 1;

      fetchImages(searchQuery, page)
        .then(response => {
            makeImageMarkup(response.data.hits);
          lightbox.refresh();
          onPageScrolling()
          if (page * 40 > response.data.totalHits) {
            observer.unobserve(refs.scroll);
            return Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(console.log);
    }
  });
}

  // Плавная прокрутка страницы после запроса и отрисовки каждой следующей группы изображений
 
  function onPageScrolling(){ 
     const { height: cardHeight } = refs.gallery
         .firstElementChild.getBoundingClientRect();
         window.scrollBy({
         top: cardHeight * 2,
         behavior: "smooth",
         });
 }
