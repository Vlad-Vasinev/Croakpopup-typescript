
export function createElements (array: NodeList, storiesGallery: HTMLDivElement, scale: number, mobVideo: boolean, deskStories: boolean) {
  
  array.forEach((item) => {

    const htmlElement = item as HTMLElement

    let storiesEl = document.createElement('div')
    if(deskStories && window.innerWidth >= 768) {
      storiesEl.classList.add('gallery__el')
      storiesEl.classList.add('gallery__el_stories')
      storiesEl.style.setProperty('--img-scale', `${scale}`)
    }
    else {
      storiesEl.classList.add('gallery__el')
      storiesEl.style.setProperty('--img-scale', `${scale}`)
    }

    if(htmlElement.hasAttribute('data-video-el')) {
      let storiesElVideo = document.createElement('video')

      let sourceElement1 = document.createElement('source')
      let sourceElement2 = document.createElement('source')

      if(mobVideo) {

        if(window.innerWidth <= 768) {
          sourceElement1.setAttribute('src', htmlElement.getAttribute('data-src-mob-mp4'))
          sourceElement2.setAttribute('src', htmlElement.getAttribute('data-src-mob-webm'))
  
          storiesElVideo.muted = true
          //storiesElVideo.muted = "muted"
          storiesElVideo.style.width = "100%"
          storiesElVideo.controls = true
        }
        else {
          sourceElement1.setAttribute('src', htmlElement.getAttribute('data-src-mp4'))
          sourceElement1.setAttribute('type', 'video/mp4')
    
          sourceElement2.setAttribute('src', htmlElement.getAttribute('data-src-webm'))
          sourceElement2.setAttribute('type', 'video/webm')
        }

      }

      if(deskStories) { 
        sourceElement1.setAttribute('src', htmlElement.getAttribute('data-src-mob-mp4'))
        sourceElement1.setAttribute('type', 'video/mp4')
        sourceElement2.setAttribute('src', htmlElement.getAttribute('data-src-mob-webm'))
        sourceElement2.setAttribute('type', 'video/webm')
      }

      if(!deskStories && !mobVideo) {
        sourceElement1.setAttribute('src', htmlElement.getAttribute('data-src-mp4'))
        sourceElement1.setAttribute('type', 'video/mp4')
  
        sourceElement2.setAttribute('src', htmlElement.getAttribute('data-src-webm'))
        sourceElement2.setAttribute('type', 'video/webm')
      }

      storiesElVideo.setAttribute('loop', 'true')
      storiesElVideo.setAttribute('playsinline', 'true')

      storiesElVideo.appendChild(sourceElement1)
      storiesElVideo.appendChild(sourceElement2)
      storiesElVideo.setAttribute('preload', 'true')
      storiesEl.append(storiesElVideo)
      storiesGallery.append(storiesEl)
    }
    else {
      let storiesElImg = document.createElement('img')
      storiesElImg.setAttribute('src', htmlElement.getAttribute('src'))
      storiesEl.append(storiesElImg)
      storiesGallery.append(storiesEl)

    }
  })
}