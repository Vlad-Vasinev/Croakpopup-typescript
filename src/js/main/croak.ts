import { disableScroll } from "../appControl/scrollControl"

interface croakInterface {
  keyboard: boolean,
  buttons?: boolean, 
  gap: string, 
  scale: number,
  opacity: number,
  DOMElement: string,
  mobileVideo?: boolean,  
  deskStories?: boolean, 
  deskSwipeFocus?: boolean, 
  deskSwipe?: boolean, 
  clickGallery?: boolean,
}
declare global {
  interface Window {
    croakApp: {
      activeSlide: number, 
      buttonsParam: boolean,
      elementScale: number,
      deskSwipe: boolean,
      deskSwipeFocus: boolean,
    }
  }
}

export class croakSlider implements croakInterface{

  keyboard = false
  buttons = false
  gap = `${10}px`
  scale = 0.75
  opacity = 0.95
  DOMElement = "div[data-croak-container]"
  mobileVideo = false
  deskStories = false
  deskSwipeFocus = false
  deskSwipe = false
  clickGallery = false
  
  constructor(params: croakInterface) {

    window.croakApp = {
      activeSlide: undefined,
      buttonsParam: false,
      elementScale: undefined,
      deskSwipe: false, 
      deskSwipeFocus: false,
    }

    this.keyboard = params.keyboard
    this.buttons = params.buttons
    this.gap = params.gap
    this.scale = params.scale
    this.opacity = params.opacity
    this.DOMElement = params.DOMElement
    this.mobileVideo = params.mobileVideo
    this.deskStories = params.deskStories
    this.deskSwipeFocus = params.deskSwipeFocus
    this.deskSwipe = params.deskSwipe
    this.clickGallery = params.clickGallery

    if(params.DOMElement) {
      this.DOMElement = params.DOMElement
    }
    if(params.buttons) {
      window.croakApp.buttonsParam = true
      this.buttons = true
    }
    if(params.keyboard) {
      this.keyboard = params.keyboard
    }
    if(params.gap) {
      this.gap = `${params.gap}px`
    }
    if(params.scale) {
      this.scale = params.scale
      window.croakApp.elementScale = this.scale
    }
    if(params.opacity) {
      this.opacity = params.opacity
    }
    if(params.mobileVideo === true) {
      this.mobileVideo = true
    }
    if(params.deskStories === true) {
      this.deskStories = true
    }
    if(params.deskSwipe === true) {
      window.croakApp.deskSwipe = true
    }
    if(params.deskSwipeFocus === true) {
      window.croakApp.deskSwipeFocus = true
    }
    if(params.clickGallery === true) {
      this.clickGallery = true
    }

    if(this.DOMElement) {

      document.querySelectorAll(this.DOMElement).forEach((elContainer) => {
        elContainer.querySelectorAll('[data-el], [data-video-el]').forEach((elSlider, index, array) => {
          elSlider.addEventListener('click', () => {

            window.croakApp.activeSlide = index
            setTimeout(() => {
              disableScroll()
            }, 350)

            let storiesGallery = createGallery(this.gap)
            createElements(array, storiesGallery, this.scale, this.mobileVideo, this.deskStories)

            let storiesOut = createExitBtn()
            let storiesContainer = createContainer(this.buttons)

            let storiesWrapper = document.createElement("div")
            storiesWrapper.classList.add('stories-wrapper')

            if(!this.deskStories) {
              storiesWrapper.classList.add('gallery-fullsize')
            }

            storiesContainer.appendChild(storiesWrapper)
            storiesWrapper.appendChild(storiesGallery)
            storiesContainer.appendChild(storiesOut)
            storiesContainer.style.setProperty('--gallery-opacity', `${this.opacity}`)
            // storiesContainer.style.setProperty('--gallery-opacity', this.opacity)

            if(storiesGallery) {

              const activeEl = storiesGallery.querySelectorAll('.gallery .gallery__el')[window.croakApp.activeSlide] as HTMLElement

              storiesGallery.querySelectorAll('.gallery .gallery__el')[window.croakApp.activeSlide].classList.add('stories-el_active')
              gallerySwipe(activeEl, storiesGallery, this.deskSwipe)
              setTimeout(() => {
                storiesGallery.classList.add('gallery_transform')
              }, 200)
            }

            let dist = 50
            let startXSwipe = 0
            let startYSwipe = 0 
            function mobTouchStart (e: TouchEvent) {
              
              startXSwipe = e.touches[0].clientX
              startYSwipe = e.touches[0].clientY
            }
            function mobTouchEnd (e: TouchEvent) {

              let xEnd = e.changedTouches[0].clientX
              let yEnd = e.changedTouches[0].clientY
              let diffX = startXSwipe - xEnd
              let diffY = startYSwipe - yEnd
          
              if(Math.abs(diffX - diffY) > 0 && Math.abs(diffX) > dist) {
                if(diffX > 0) {
                  if(window.croakApp.activeSlide === storiesGallery.querySelectorAll('.gallery__el').length - 1) { 
                    return
                  }
                  nextClick(storiesGallery)
                }
                else if(diffX < 0){
                  if(window.croakApp.activeSlide === 0) { 
                    return
                  }
                  prevClick(storiesGallery)
                }
              }
            }

            function keyEvent (event: KeyboardEvent) {
              if(event.key === 'ArrowRight') {
                nextClick(storiesGallery)
              }
              if(event.key === 'ArrowLeft') {
                prevClick(storiesGallery)
              }
              if(event.key === 'd') {
                nextClick(storiesGallery)
              }
              if(event.key === 'a') {
                prevClick(storiesGallery)
              }
              if(event.key === 'Escape') {
                deleteGallery(startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd)
              }
            }

            clickExit(storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd)

            if(this.buttons) {
              let nextBtn = createNextButton(storiesContainer, storiesGallery, this.DOMElement)
              let prevBtn = createPrevButton(storiesContainer, this.DOMElement)
  
              nextBtn.addEventListener('click', () => {
                nextClick(storiesGallery)
              })
              prevBtn.addEventListener('click', () => {
                prevClick(storiesGallery)
              })
            }

            if(this.keyboard) {
              document.addEventListener('keydown', keyEvent)
            
              if(window.innerWidth <= 768) {
                document.removeEventListener('keydown', keyEvent)
              }
            }

            document.addEventListener('touchstart', mobTouchStart)
            document.addEventListener('touchend', mobTouchEnd)

            if(this.clickGallery) {
              clickGallery(storiesGallery)
            }
          })
        })
      })
    }
  }
}

heightControl()
window.addEventListener('resize', heightControl)

let frog = new croakSlider({
  DOMElement: "div[data-croak-container]",
  gap: "10",
  scale: .75,
  opacity: 0.95,
  //mobileVideo: true,
  deskStories: true,
  deskSwipe: true,   // works only when "clickGallery" is turned of
  deskSwipeFocus: true,
  //clickGallery: true,
  keyboard: true,
  //buttons: true,
});