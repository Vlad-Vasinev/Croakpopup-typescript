// import { gallerySwipe } from "./gallerySwipe"

export function nextClick(storiesGallery: HTMLDivElement) {

  let storiesGalleryItems = storiesGallery.querySelectorAll('.gallery .gallery__el')
  let lengthEl = storiesGallery.querySelectorAll('.gallery .gallery__el').length

  storiesGalleryItems[window.croakApp.activeSlide].classList.remove('stories-el_active')

  if(window.croakApp.buttonsParam) {
    let storiesContainer = storiesGallery.parentElement.parentElement
    if(window.croakApp.activeSlide <= 1) {
      let prevBtn = storiesContainer.querySelector('.stories-prev')
      prevBtn.removeAttribute('disabled')
      prevBtn.classList.remove('btn_disabled')
      prevBtn.classList.add('stories-el_active')
    }
    if(window.croakApp.activeSlide === lengthEl - 2) {
      let nextBtn = storiesContainer.querySelector('.stories-next')
      nextBtn.setAttribute('disabled', 'true')
      nextBtn.classList.add('btn_disabled')
    }
  }
  if(window.croakApp.activeSlide < (lengthEl - 1)) {

    window.croakApp.activeSlide += 1

    let elActive = storiesGalleryItems[window.croakApp.activeSlide]
    elActive.classList.add('stories-el_active')
    gallerySwipe(elActive, storiesGallery)
  }
}