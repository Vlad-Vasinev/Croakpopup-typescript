
export function createNextButton (storiesContainer: HTMLDivElement, storiesGallery: HTMLDivElement, domEl: string) {
  if(window.croakApp.buttonsParam) {
    
    const customNextArrow = document.querySelector(domEl).querySelector('.stories-next').cloneNode()
    const nextArrow = customNextArrow as HTMLElement

    storiesContainer.appendChild(customNextArrow)
    nextArrow.classList.add('custom-right')

    if(window.croakApp.activeSlide == storiesGallery.getElementsByClassName('gallery__el').length - 1) {
      nextArrow.setAttribute('disabled', 'true')
      nextArrow.classList.add('btn_disabled')
    }

    return customNextArrow
  }
}

export function createPrevButton (storiesContainer: HTMLDivElement, domEl: string) {
  if(window.croakApp.buttonsParam) {

    const customPrevArrow = document.querySelector(domEl).querySelector('.stories-prev').cloneNode()
    const prevArrow = customPrevArrow as HTMLElement

    storiesContainer.appendChild(customPrevArrow)
    prevArrow.classList.add('custom-left')

    if(window.croakApp.activeSlide == 0) {
      prevArrow.setAttribute('disabled', 'true')
      prevArrow.classList.add('btn_disabled')
    }

    return customPrevArrow
  }
}