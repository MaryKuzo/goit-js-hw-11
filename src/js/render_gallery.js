import scrollToTop from "./scroll";
import { refs } from "./refs";
export default function renderGallery(images) {

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
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.classList.add('scroll-to-top');
  scrollToTopBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
  scrollToTopBtn.addEventListener('click', scrollToTop);
  document.body.appendChild(scrollToTopBtn);

}