// export { onScroll, onToTopBtn };



// function debounce(callback, delay) {
//   let timeoutId;
//   return (...args) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       callback.apply(null, args);
//     }, delay);
//   };
// }

// function onScroll() {
//   const scrolled = window.pageYOffset;
//   const comply = document.documentElement.clientHeight;
//   const isScrolled = scrolled > comply;

//   toTopBtn.classList.toggle('btn-to-top--visible', isScrolled);
// }


// function onToTopBtn() {
//   if (window.pageYOffset > 0) {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }
// }


// const toTopBtn = document.querySelector('.btn-to-top');
// window.addEventListener('scroll', debounce(onScroll, 10));
// toTopBtn.addEventListener('click', onToTopBtn);