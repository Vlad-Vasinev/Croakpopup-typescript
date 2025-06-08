
// import { delContainer } from "./deleteContainer.js"
// import { enableScroll } from "../appControl/scrollControl.js"

export function deleteGallery(startXSwipe: number, startYSwipe: number, storiesContainer: HTMLDivElement, storiesGallery: HTMLDivElement, keyEvent, mobTouchStart, mobTouchEnd) {
  document.removeEventListener('keydown', keyEvent)
  startXSwipe = 0
  startYSwipe = 0
  document.removeEventListener('touchstart', mobTouchStart)
  document.removeEventListener('touchend', mobTouchEnd)
  window.croakApp.activeSlide = undefined
  delContainer(storiesContainer)
  enableScroll()
  storiesGallery.classList.remove('gallery_transform')
  if(window.croakApp.buttonsParam) {

    let storiesContainer = storiesGallery.parentElement.parentElement
    let prevBtn = storiesContainer.querySelector('.stories-prev')
    let storiesNext = storiesContainer.querySelector('.stories-next')

    setTimeout(() => {

      prevBtn.removeAttribute('disabled')
      prevBtn.classList.remove('btn_disabled')
      storiesNext.removeAttribute('disabled')
      storiesNext.classList.remove('btn_disabled')
      
      window.croakApp.buttonsParam = false
    }, 300)
  }
}