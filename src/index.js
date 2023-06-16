import axios from 'axios';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import onScroll from './on_scroll';
import onToTopBtn from './on_to_top_btn';
const API_KEY = '37259040-666f8102f8645398c01db5082';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages(query, page, perPage) {
  const url = `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);
  return response;
}
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';
let page = 1;
let simpleLightBox;
const perPage = 21;

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

onScroll();
onToTopBtn();

async function onSearchForm(e) {
  e.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

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

      if (data.totalHits > perPage) {
        loadMoreBtn.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    searchForm.reset();
  }
}
function renderGallery(images) {
  const gallery = document.querySelector('.gallery');

  function generateMarkup({ id, largeImageURL, webformatURL, tags, likes, views, comments, downloads }) {
    return `
      <a class="gallery__link" href="${largeImageURL}">
        <div class="gallery-item" id="${id}">
          <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes &nbsp;</b>${likes}</p>
            <p class="info-item"><b>Views &nbsp;</b>${views}</p>
            <p class="info-item"><b>Comments &nbsp;</b>${comments}</p>
            <p class="info-item"><b>Downloads &nbsp;</b>${downloads}</p>
          </div>
        </div>
      </a>
    `;
  }

  const markup = images.reduce((acc, image) => acc + generateMarkup(image), '');
  gallery.insertAdjacentHTML('beforeend', markup);
}


async function onLoadMoreBtn() {
  page += 1;
  simpleLightBox.destroy();

  try {
    const { data } = await fetchImages(query, page, perPage);

    renderGallery(data.hits);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page >= totalPages) {
      loadMoreBtn.classList.add('is-hidden');
      await delay(500);
      alertEndOfSearch();
    }
  } catch (error) {
    console.log(error);
  }
}

function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure('The search bar cannot be empty. Please type any criteria in the search bar.');
}

function displayNoResultsAlert() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
}

function alertEndOfSearch() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function debounce(callback, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, delay);
  };
}





const toTopBtn = document.querySelector('.btn-to-top');
window.addEventListener('scroll', debounce(onScroll, 10));
toTopBtn.addEventListener('click', onToTopBtn);