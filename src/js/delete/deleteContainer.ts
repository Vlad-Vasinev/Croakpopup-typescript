function remClassContainer (storiesContainer: HTMLDivElement): Promise<void> {
  return new Promise((resolve) => {
    storiesContainer.classList.remove('stories-container_active')
    resolve()
  })
}
function remFromBody(storiesContainer: HTMLDivElement) {
  document.body.removeChild(storiesContainer)
}
export async function delContainer (storiesContainer: HTMLDivElement) {
  await remClassContainer(storiesContainer)
  setTimeout(() => {
    remFromBody(storiesContainer)
  }, 300)
}