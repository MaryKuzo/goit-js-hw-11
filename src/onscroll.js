export default function onScroll() {
  const scrolled = window.pageYOffset;
  const comply = document.documentElement.clientHeight;
  const isScrolled = scrolled > comply;

  toTopBtn.classList.toggle('btn-to-top--visible', isScrolled);
}
