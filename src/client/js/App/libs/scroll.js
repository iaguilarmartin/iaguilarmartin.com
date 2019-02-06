// eslint-disable-next-line import/prefer-default-export
export function scrollToTop(animated = true) {
  let c = 9;
  if (animated) {
    c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      c -= c / 8;
    }
  }
  window.scrollTo(0, c);
}
