// import { gallerySwipe } from "./gallerySwipe"

export function clickGallery (storiesGallery: HTMLDivElement) {

  let storiesGalleryItems = storiesGallery.querySelectorAll('.gallery .gallery__el')

  document.querySelectorAll('.gallery .gallery__el').forEach((element, indexEl) => {
    element.addEventListener('click', (e) => {

      storiesGalleryItems[window.croakApp.activeSlide].classList.remove('stories-el_active')

      window.croakApp.activeSlide = indexEl
      const elActive = e.currentTarget as HTMLElement
 
      elActive.classList.add('stories-el_active')
      gallerySwipe(elActive, storiesGallery, false)

      if(window.croakApp.buttonsParam) {
        
        let storiesContainer = storiesGallery.parentElement.parentElement
        let prevBtn = storiesContainer.querySelector('.stories-prev')
        let storiesNext = storiesContainer.querySelector('.stories-next')
        
        if(window.croakApp.activeSlide == 0) {
          prevBtn.setAttribute('disabled', 'true')
          prevBtn.classList.add('btn_disabled')
        }
        else {
          prevBtn.removeAttribute('disabled')
          prevBtn.classList.remove('btn_disabled')
        }
        if(window.croakApp.activeSlide == storiesGallery.getElementsByClassName('gallery__el').length - 1) {
          storiesNext.setAttribute('disabled', 'true')
          storiesNext.classList.add('btn_disabled')
        }
        else {
          storiesNext.removeAttribute('disabled')
          storiesNext.classList.remove('btn_disabled')
        }
      }

    })
  })
}