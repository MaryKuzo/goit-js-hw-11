import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import renderGallery from './js/render_gallery';
import {alertEndOfSearch,alertImagesFound,alertNoEmptySearch,displayNoResultsAlert} from './js/notifix'
import { refs } from './js/refs';

const API_KEY = '37259040-666f8102f8645398c01db5082';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages(query, page, perPage) {
  const url = `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);
  return response;
}

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;
let scrollTarget;
let observer = new IntersectionObserver(handleIntersection, { threshold: 0 });

refs.searchForm.addEventListener('submit', onSearchForm);

async function onSearchForm(e) {
  e.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  refs.gallery.innerHTML = '';
  observer.disconnect()

  if (query === '') {
    alertNoEmptySearch();
    return;
  }

  try {
    const { data } = await fetchImages(query, page, perPage);

    if (data.totalHits === 0) {
      displayNoResultsAlert();
     
    } else {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      alertImagesFound(data);

      if (data.totalHits >= perPage) {
        scrollTarget = document.querySelector('#scroll-target');
        observer.observe(scrollTarget);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    refs.searchForm.reset();

  }
}

async function handleIntersection(entries) {
  const entry = entries[0];
  if (entry.isIntersecting) {
    page += 1;

    try {
      const { data } = await fetchImages(query, page, perPage);
      renderGallery(data.hits);

      simpleLightBox.refresh();
      if (perPage * page >= data.totalHits && data.totalHits !== 0) {
        alertEndOfSearch();
        observer.unobserve(scrollTarget);
        observer = null; // Вимкнення спостереження
        return;
      }

    } catch (error) {
      console.log(error);
    }
  }
}

