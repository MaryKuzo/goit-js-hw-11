import Notiflix from 'notiflix';

export { alertEndOfSearch, alertImagesFound, alertNoEmptySearch, displayNoResultsAlert }
function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure('The search bar cannot be empty. Please type any criteria in the search bar.');
}

function displayNoResultsAlert() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function alertEndOfSearch() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}

