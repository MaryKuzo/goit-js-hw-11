import Notiflix from 'notiflix';
const options = {
  width: 500,
  position: 'left-top',
  height: 400,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  distance: '15px',
  borderRadius: '35px',
  timeout: 2000,
  clickToClose: true,
  fontSize: '20px',
    success: {
    background: 'burlywood',
    textColor: 'black',

  },

  failure: {
    background: 'lightcoral',
    textColor: 'black',

  },
}

export { alertEndOfSearch, alertImagesFound, alertNoEmptySearch, displayNoResultsAlert }
function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`,options);
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure('The search bar cannot be empty. Please type any criteria in the search bar.',options);
}

function displayNoResultsAlert() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.',options);
}

function alertEndOfSearch() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.",options);
}

