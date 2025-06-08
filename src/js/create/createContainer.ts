
export function createContainer (btnParam: boolean) {

  if(btnParam) {
    window.croakApp.buttonsParam = true
  }

  const storiesContainerElement = document.createElement("div")
  document.body.append(storiesContainerElement)
  storiesContainerElement.classList.add('stories-container')
  setTimeout(() => {
    storiesContainerElement.classList.add('stories-container_active')
  }, 100)

  return storiesContainerElement

}