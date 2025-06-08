
// import { deleteGallery } from "../delete/deleteGallery"

export function clickExit (storiesOut: HTMLButtonElement, startXSwipe: number, startYSwipe: number, storiesContainer: HTMLDivElement, storiesGallery: HTMLDivElement, keyEvent: (event: KeyboardEvent) => void, mobTouchStart: (event: TouchEvent) => void, mobTouchEnd: (event: TouchEvent) => void) {
  storiesOut.addEventListener('click', () => {
    deleteGallery(startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd)
  })
}