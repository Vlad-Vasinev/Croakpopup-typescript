// import { gallerySwipe } from "./gallerySwipe"

export function prevClick(storiesGallery: HTMLDivElement) {

  let storiesGalleryItems = storiesGallery.querySelectorAll('.gallery .gallery__el')

  if(window.croakApp.buttonsParam) {

    let lengthEl = storiesGallery.querySelectorAll('.gallery .gallery__el').length
    let storiesContainer = storiesGallery.parentElement.parentElement
    let storiesNext = storiesContainer.querySelector('.stories-next')
    let storiesprev = storiesContainer.querySelector('.stories-prev')

    if(window.croakApp.activeSlide === lengthEl - 1) {
      storiesNext.removeAttribute('disabled')
      storiesNext.classList.remove('btn_disabled')
    }
    if(window.croakApp.activeSlide === 1) {
      storiesprev.setAttribute('disabled', 'true')
      // storiesprev.setAttribute('disabled', true)
      storiesprev.classList.add('btn_disabled')
    }
  }

  storiesGalleryItems[window.croakApp.activeSlide].classList.remove('stories-el_active')

  if(window.croakApp.activeSlide != 0) {
    window.croakApp.activeSlide -= 1
    let elActive = storiesGalleryItems[window.croakApp.activeSlide]
    elActive.classList.add('stories-el_active')
    gallerySwipe(elActive, storiesGallery, false)
  }
}