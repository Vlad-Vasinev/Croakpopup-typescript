export const heightControl = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

let scrollPosition = 0;
const bodyEl = document.querySelector('body');
export function disableScroll() {
    scrollPosition = window.pageYOffset;
    bodyEl.style.overflow = 'hidden';
    bodyEl.style.position = 'fixed';
    bodyEl.style.top = `-${scrollPosition}px`;
    bodyEl.style.width = '100%';
}
export function enableScroll() {
    bodyEl.style.removeProperty('overflow');
    bodyEl.style.removeProperty('position');
    bodyEl.style.removeProperty('top');
    bodyEl.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}

export function createNextButton(storiesContainer, storiesGallery, domEl) {
    if (window.croakApp.buttonsParam) {
        const customNextArrow = document.querySelector(domEl).querySelector('.stories-next').cloneNode();
        const nextArrow = customNextArrow;
        storiesContainer.appendChild(customNextArrow);
        nextArrow.classList.add('custom-right');
        if (window.croakApp.activeSlide == storiesGallery.getElementsByClassName('gallery__el').length - 1) {
            nextArrow.setAttribute('disabled', 'true');
            nextArrow.classList.add('btn_disabled');
        }
        return customNextArrow;
    }
}
export function createPrevButton(storiesContainer, domEl) {
    if (window.croakApp.buttonsParam) {
        const customPrevArrow = document.querySelector(domEl).querySelector('.stories-prev').cloneNode();
        const prevArrow = customPrevArrow;
        storiesContainer.appendChild(customPrevArrow);
        prevArrow.classList.add('custom-left');
        if (window.croakApp.activeSlide == 0) {
            prevArrow.setAttribute('disabled', 'true');
            prevArrow.classList.add('btn_disabled');
        }
        return customPrevArrow;
    }
}

export function createContainer(btnParam) {
    if (btnParam) {
        window.croakApp.buttonsParam = true;
    }
    const storiesContainerElement = document.createElement("div");
    document.body.append(storiesContainerElement);
    storiesContainerElement.classList.add('stories-container');
    setTimeout(() => {
        storiesContainerElement.classList.add('stories-container_active');
    }, 100);
    return storiesContainerElement;
}

export function createElements(array, storiesGallery, scale, mobVideo, deskStories) {
    array.forEach((item) => {
        const htmlElement = item;
        let storiesEl = document.createElement('div');
        if (deskStories && window.innerWidth >= 768) {
            storiesEl.classList.add('gallery__el');
            storiesEl.classList.add('gallery__el_stories');
            storiesEl.style.setProperty('--img-scale', `${scale}`);
        }
        else {
            storiesEl.classList.add('gallery__el');
            storiesEl.style.setProperty('--img-scale', `${scale}`);
        }
        if (htmlElement.hasAttribute('data-video-el')) {
            let storiesElVideo = document.createElement('video');
            let sourceElement1 = document.createElement('source');
            let sourceElement2 = document.createElement('source');
            if (mobVideo) {
                if (window.innerWidth <= 768) {
                    sourceElement1.setAttribute('src', htmlElement.getAttribute('data-src-mob-mp4'));
                    sourceElement2.setAttribute('src', htmlElement.getAttribute('data-src-mob-webm'));
                    storiesElVideo.muted = true;
                    //storiesElVideo.muted = "muted"
                    storiesElVideo.style.width = "100%";
                    storiesElVideo.controls = true;
                }
                else {
                    sourceElement1.setAttribute('src', htmlElement.getAttribute('data-src-mp4'));
                    sourceElement1.setAttribute('type', 'video/mp4');
                    sourceElement2.setAttribute('src', htmlElement.getAttribute('data-src-webm'));
                    sourceElement2.setAttribute('type', 'video/webm');
                }
            }
            if (deskStories) {
                sourceElement1.setAttribute('src', htmlElement.getAttribute('data-src-mob-mp4'));
                sourceElement1.setAttribute('type', 'video/mp4');
                sourceElement2.setAttribute('src', htmlElement.getAttribute('data-src-mob-webm'));
                sourceElement2.setAttribute('type', 'video/webm');
            }
            if (!deskStories && !mobVideo) {
                sourceElement1.setAttribute('src', htmlElement.getAttribute('data-src-mp4'));
                sourceElement1.setAttribute('type', 'video/mp4');
                sourceElement2.setAttribute('src', htmlElement.getAttribute('data-src-webm'));
                sourceElement2.setAttribute('type', 'video/webm');
            }
            storiesElVideo.setAttribute('loop', 'true');
            storiesElVideo.setAttribute('playsinline', 'true');
            storiesElVideo.appendChild(sourceElement1);
            storiesElVideo.appendChild(sourceElement2);
            storiesElVideo.setAttribute('preload', 'true');
            storiesEl.append(storiesElVideo);
            storiesGallery.append(storiesEl);
        }
        else {
            let storiesElImg = document.createElement('img');
            storiesElImg.setAttribute('src', htmlElement.getAttribute('src'));
            storiesEl.append(storiesElImg);
            storiesGallery.append(storiesEl);
        }
    });
}

export function createExitBtn() {
    const storiesOutBtn = document.createElement('button');
    storiesOutBtn.classList.add('close-gallery');
    const svgString = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.63599 18.364L18.3639 5.63603M5.63599 5.63604L18.3639 18.364" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>';
    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');
    storiesOutBtn.append(svgElement);
    return storiesOutBtn;
}

export function createGallery(gap) {
    let stories = document.createElement('div');
    stories.classList.add('gallery');
    stories.style.setProperty('--gallery-gap', gap);
    stories.classList.add('gallery-opened');
    return stories;
}

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function remClassContainer(storiesContainer) {
    return new Promise((resolve) => {
        storiesContainer.classList.remove('stories-container_active');
        resolve();
    });
}
function remFromBody(storiesContainer) {
    document.body.removeChild(storiesContainer);
}
export function delContainer(storiesContainer) {
    return __awaiter(this, void 0, void 0, function* () {
        yield remClassContainer(storiesContainer);
        setTimeout(() => {
            remFromBody(storiesContainer);
        }, 300);
    });
}

// import { delContainer } from "./deleteContainer.js"
// import { enableScroll } from "../appControl/scrollControl.js"
export function deleteGallery(startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd) {
    document.removeEventListener('keydown', keyEvent);
    startXSwipe = 0;
    startYSwipe = 0;
    document.removeEventListener('touchstart', mobTouchStart);
    document.removeEventListener('touchend', mobTouchEnd);
    window.croakApp.activeSlide = undefined;
    delContainer(storiesContainer);
    enableScroll();
    storiesGallery.classList.remove('gallery_transform');
    if (window.croakApp.buttonsParam) {
        let storiesContainer = storiesGallery.parentElement.parentElement;
        let prevBtn = storiesContainer.querySelector('.stories-prev');
        let storiesNext = storiesContainer.querySelector('.stories-next');
        setTimeout(() => {
            prevBtn.removeAttribute('disabled');
            prevBtn.classList.remove('btn_disabled');
            storiesNext.removeAttribute('disabled');
            storiesNext.classList.remove('btn_disabled');
            window.croakApp.buttonsParam = false;
        }, 300);
    }
}

// import { deleteGallery } from "../delete/deleteGallery"
export function clickExit(storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd) {
    storiesOut.addEventListener('click', () => {
        deleteGallery(startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd);
    });
}

// import { gallerySwipe } from "./gallerySwipe"
export function clickGallery(storiesGallery) {
    let storiesGalleryItems = storiesGallery.querySelectorAll('.gallery .gallery__el');
    document.querySelectorAll('.gallery .gallery__el').forEach((element, indexEl) => {
        element.addEventListener('click', (e) => {
            storiesGalleryItems[window.croakApp.activeSlide].classList.remove('stories-el_active');
            window.croakApp.activeSlide = indexEl;
            const elActive = e.currentTarget;
            elActive.classList.add('stories-el_active');
            gallerySwipe(elActive, storiesGallery, false);
            if (window.croakApp.buttonsParam) {
                let storiesContainer = storiesGallery.parentElement.parentElement;
                let prevBtn = storiesContainer.querySelector('.stories-prev');
                let storiesNext = storiesContainer.querySelector('.stories-next');
                if (window.croakApp.activeSlide == 0) {
                    prevBtn.setAttribute('disabled', 'true');
                    prevBtn.classList.add('btn_disabled');
                }
                else {
                    prevBtn.removeAttribute('disabled');
                    prevBtn.classList.remove('btn_disabled');
                }
                if (window.croakApp.activeSlide == storiesGallery.getElementsByClassName('gallery__el').length - 1) {
                    storiesNext.setAttribute('disabled', 'true');
                    storiesNext.classList.add('btn_disabled');
                }
                else {
                    storiesNext.removeAttribute('disabled');
                    storiesNext.classList.remove('btn_disabled');
                }
            }
        });
    });
}

export function gallerySwipe(el, galleryEssence, deskSwipe) {
    let elRight = el.getBoundingClientRect().right;
    el.parentElement.querySelectorAll('video').forEach((el) => {
        el.pause();
    });
    if (deskSwipe === undefined) {
        deskSwipe = false;
    }
    let videoEl = el.querySelector('video');
    if (videoEl && el.classList.contains('stories-el_active')) {
        videoEl.setAttribute('autoplay', 'true');
        // videoEl.setAttribute('autoplay', true)
        videoEl.play();
    }
    function checkCenter(el) {
        let elCenter = el.getBoundingClientRect().left + (el.getBoundingClientRect().width / 2);
        return elCenter <= ((window.innerWidth / 2) + (el.getBoundingClientRect().width / window.croakApp.elementScale / 2)) && elCenter >= ((window.innerWidth / 2) - (el.getBoundingClientRect().width / window.croakApp.elementScale / 2));
    }
    let distanceCheck = (galleryEssence.getBoundingClientRect().width / 2) - elRight;
    const galleryEssenceRect = galleryEssence.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    let translateX = -(distanceCheck + galleryEssenceRect.left + (elRect.width / 2));
    galleryEssence.style.transform = `translate3d(${-Math.round(translateX)}px, ${-50}%, 0)`;
    let galleryScrW = galleryEssence.scrollWidth;
    let galleryWrapper = galleryEssence.parentElement;
    let galleryWrapperClW = galleryWrapper.clientWidth;
    let startX = 0;
    let isActive = false;
    let prevDiff = -translateX;
    let diff = 0;
    let counter = 0;
    let rightBoundary = (galleryWrapperClW - galleryScrW - elRect.width - elRect.width / 2);
    let leftBoundary = -(galleryScrW - galleryWrapperClW + elRect.width + elRect.width / 2);
    function startSwipe(e) {
        e.preventDefault();
        galleryEssence.querySelectorAll('.gallery__el').forEach((el, index, array) => {
            if (el.querySelector('video')) {
                el.querySelector('video').pause();
            }
        });
        galleryEssence.style.cursor = "grabbing";
        isActive = true;
        galleryEssence.classList.remove('gallery_transform');
        startX = e.clientX;
    }
    function moveSwipe(e) {
        e.preventDefault();
        if (!isActive) {
            return;
        }
        if (counter === 0) {
            prevDiff = -translateX;
            galleryEssence.querySelectorAll('.gallery__el')[window.croakApp.activeSlide].classList.remove('stories-el_active');
            counter++;
        }
        diff = (startX - e.clientX - prevDiff);
        let currDiff = -diff;
        if (diff < leftBoundary) {
            diff += currDiff + (leftBoundary + 20);
        }
        if (currDiff < rightBoundary) {
            diff += currDiff - (rightBoundary - 20);
        }
        galleryEssence.style.transform = `translate3d(${-diff}px, ${-50}%, 0)`;
    }
    function endSwipe() {
        if (window.croakApp.deskSwipeFocus) {
            galleryEssence.querySelectorAll('.gallery__el').forEach((item, index, array) => {
                if (checkCenter(item)) {
                    let distanceCheck = (galleryEssence.getBoundingClientRect().width / 2) - item.getBoundingClientRect().right;
                    const galleryEssenceRect = galleryEssence.getBoundingClientRect();
                    const elRect = item.getBoundingClientRect();
                    translateX = -(distanceCheck + galleryEssenceRect.left + (elRect.width / 2));
                    window.croakApp.activeSlide = index;
                }
            });
        }
        setTimeout(() => {
            galleryEssence.classList.add('gallery_transform');
            galleryEssence.style.transform = `translate3d(${-Math.round(translateX)}px, ${-50}%, 0)`;
            let newActive = galleryEssence.getElementsByClassName('gallery__el')[window.croakApp.activeSlide];
            newActive.classList.add('stories-el_active');
            if (newActive.querySelector('video')) {
                newActive.querySelector('video').play();
            }
        }, 200);
        isActive = false;
        galleryEssence.style.cursor = "grab";
        prevDiff = -diff;
        counter = 0;
    }
    if (window.innerWidth >= 768 && window.croakApp.deskSwipe) {
        galleryWrapper.addEventListener('mousedown', startSwipe);
        galleryWrapper.addEventListener('mousemove', moveSwipe);
        galleryWrapper.addEventListener('mouseup', endSwipe);
        galleryWrapper.addEventListener('mouseleave', endSwipe);
    }
    if (window.innerWidth <= 768 && window.croakApp.deskSwipe) {
        galleryEssence.classList.add('gallery_transform');
    }
}

// import { gallerySwipe } from "./gallerySwipe"
export function nextClick(storiesGallery) {
    let storiesGalleryItems = storiesGallery.querySelectorAll('.gallery .gallery__el');
    let lengthEl = storiesGallery.querySelectorAll('.gallery .gallery__el').length;
    storiesGalleryItems[window.croakApp.activeSlide].classList.remove('stories-el_active');
    if (window.croakApp.buttonsParam) {
        let storiesContainer = storiesGallery.parentElement.parentElement;
        if (window.croakApp.activeSlide <= 1) {
            let prevBtn = storiesContainer.querySelector('.stories-prev');
            prevBtn.removeAttribute('disabled');
            prevBtn.classList.remove('btn_disabled');
            prevBtn.classList.add('stories-el_active');
        }
        if (window.croakApp.activeSlide === lengthEl - 2) {
            let nextBtn = storiesContainer.querySelector('.stories-next');
            nextBtn.setAttribute('disabled', 'true');
            nextBtn.classList.add('btn_disabled');
        }
    }
    if (window.croakApp.activeSlide < (lengthEl - 1)) {
        window.croakApp.activeSlide += 1;
        let elActive = storiesGalleryItems[window.croakApp.activeSlide];
        elActive.classList.add('stories-el_active');
        gallerySwipe(elActive, storiesGallery);
    }
}

// import { gallerySwipe } from "./gallerySwipe"
export function prevClick(storiesGallery) {
    let storiesGalleryItems = storiesGallery.querySelectorAll('.gallery .gallery__el');
    if (window.croakApp.buttonsParam) {
        let lengthEl = storiesGallery.querySelectorAll('.gallery .gallery__el').length;
        let storiesContainer = storiesGallery.parentElement.parentElement;
        let storiesNext = storiesContainer.querySelector('.stories-next');
        let storiesprev = storiesContainer.querySelector('.stories-prev');
        if (window.croakApp.activeSlide === lengthEl - 1) {
            storiesNext.removeAttribute('disabled');
            storiesNext.classList.remove('btn_disabled');
        }
        if (window.croakApp.activeSlide === 1) {
            storiesprev.setAttribute('disabled', 'true');
            // storiesprev.setAttribute('disabled', true)
            storiesprev.classList.add('btn_disabled');
        }
    }
    storiesGalleryItems[window.croakApp.activeSlide].classList.remove('stories-el_active');
    if (window.croakApp.activeSlide != 0) {
        window.croakApp.activeSlide -= 1;
        let elActive = storiesGalleryItems[window.croakApp.activeSlide];
        elActive.classList.add('stories-el_active');
        gallerySwipe(elActive, storiesGallery, false);
    }
}

import { disableScroll } from "../appControl/scrollControl";
export class croakSlider {
    constructor(params) {
        this.keyboard = false;
        this.buttons = false;
        this.gap = `${10}px`;
        this.scale = 0.75;
        this.opacity = 0.95;
        this.DOMElement = "div[data-croak-container]";
        this.mobileVideo = false;
        this.deskStories = false;
        this.deskSwipeFocus = false;
        this.deskSwipe = false;
        this.clickGallery = false;
        window.croakApp = {
            activeSlide: undefined,
            buttonsParam: false,
            elementScale: undefined,
            deskSwipe: false,
            deskSwipeFocus: false,
        };
        this.keyboard = params.keyboard;
        this.buttons = params.buttons;
        this.gap = params.gap;
        this.scale = params.scale;
        this.opacity = params.opacity;
        this.DOMElement = params.DOMElement;
        this.mobileVideo = params.mobileVideo;
        this.deskStories = params.deskStories;
        this.deskSwipeFocus = params.deskSwipeFocus;
        this.deskSwipe = params.deskSwipe;
        this.clickGallery = params.clickGallery;
        if (params.DOMElement) {
            this.DOMElement = params.DOMElement;
        }
        if (params.buttons) {
            window.croakApp.buttonsParam = true;
            this.buttons = true;
        }
        if (params.keyboard) {
            this.keyboard = params.keyboard;
        }
        if (params.gap) {
            this.gap = `${params.gap}px`;
        }
        if (params.scale) {
            this.scale = params.scale;
            window.croakApp.elementScale = this.scale;
        }
        if (params.opacity) {
            this.opacity = params.opacity;
        }
        if (params.mobileVideo === true) {
            this.mobileVideo = true;
        }
        if (params.deskStories === true) {
            this.deskStories = true;
        }
        if (params.deskSwipe === true) {
            window.croakApp.deskSwipe = true;
        }
        if (params.deskSwipeFocus === true) {
            window.croakApp.deskSwipeFocus = true;
        }
        if (params.clickGallery === true) {
            this.clickGallery = true;
        }
        if (this.DOMElement) {
            document.querySelectorAll(this.DOMElement).forEach((elContainer) => {
                elContainer.querySelectorAll('[data-el], [data-video-el]').forEach((elSlider, index, array) => {
                    elSlider.addEventListener('click', () => {
                        window.croakApp.activeSlide = index;
                        setTimeout(() => {
                            disableScroll();
                        }, 350);
                        let storiesGallery = createGallery(this.gap);
                        createElements(array, storiesGallery, this.scale, this.mobileVideo, this.deskStories);
                        let storiesOut = createExitBtn();
                        let storiesContainer = createContainer(this.buttons);
                        let storiesWrapper = document.createElement("div");
                        storiesWrapper.classList.add('stories-wrapper');
                        if (!this.deskStories) {
                            storiesWrapper.classList.add('gallery-fullsize');
                        }
                        storiesContainer.appendChild(storiesWrapper);
                        storiesWrapper.appendChild(storiesGallery);
                        storiesContainer.appendChild(storiesOut);
                        storiesContainer.style.setProperty('--gallery-opacity', `${this.opacity}`);
                        // storiesContainer.style.setProperty('--gallery-opacity', this.opacity)
                        if (storiesGallery) {
                            const activeEl = storiesGallery.querySelectorAll('.gallery .gallery__el')[window.croakApp.activeSlide];
                            storiesGallery.querySelectorAll('.gallery .gallery__el')[window.croakApp.activeSlide].classList.add('stories-el_active');
                            gallerySwipe(activeEl, storiesGallery, this.deskSwipe);
                            setTimeout(() => {
                                storiesGallery.classList.add('gallery_transform');
                            }, 200);
                        }
                        let dist = 50;
                        let startXSwipe = 0;
                        let startYSwipe = 0;
                        function mobTouchStart(e) {
                            startXSwipe = e.touches[0].clientX;
                            startYSwipe = e.touches[0].clientY;
                        }
                        function mobTouchEnd(e) {
                            let xEnd = e.changedTouches[0].clientX;
                            let yEnd = e.changedTouches[0].clientY;
                            let diffX = startXSwipe - xEnd;
                            let diffY = startYSwipe - yEnd;
                            if (Math.abs(diffX - diffY) > 0 && Math.abs(diffX) > dist) {
                                if (diffX > 0) {
                                    if (window.croakApp.activeSlide === storiesGallery.querySelectorAll('.gallery__el').length - 1) {
                                        return;
                                    }
                                    nextClick(storiesGallery);
                                }
                                else if (diffX < 0) {
                                    if (window.croakApp.activeSlide === 0) {
                                        return;
                                    }
                                    prevClick(storiesGallery);
                                }
                            }
                        }
                        function keyEvent(event) {
                            if (event.key === 'ArrowRight') {
                                nextClick(storiesGallery);
                            }
                            if (event.key === 'ArrowLeft') {
                                prevClick(storiesGallery);
                            }
                            if (event.key === 'd') {
                                nextClick(storiesGallery);
                            }
                            if (event.key === 'a') {
                                prevClick(storiesGallery);
                            }
                            if (event.key === 'Escape') {
                                deleteGallery(startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd);
                            }
                        }
                        clickExit(storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd);
                        if (this.buttons) {
                            let nextBtn = createNextButton(storiesContainer, storiesGallery, this.DOMElement);
                            let prevBtn = createPrevButton(storiesContainer, this.DOMElement);
                            nextBtn.addEventListener('click', () => {
                                nextClick(storiesGallery);
                            });
                            prevBtn.addEventListener('click', () => {
                                prevClick(storiesGallery);
                            });
                        }
                        if (this.keyboard) {
                            document.addEventListener('keydown', keyEvent);
                            if (window.innerWidth <= 768) {
                                document.removeEventListener('keydown', keyEvent);
                            }
                        }
                        document.addEventListener('touchstart', mobTouchStart);
                        document.addEventListener('touchend', mobTouchEnd);
                        if (this.clickGallery) {
                            clickGallery(storiesGallery);
                        }
                    });
                });
            });
        }
    }
}
heightControl();
window.addEventListener('resize', heightControl);
let frog = new croakSlider({
    DOMElement: "div[data-croak-container]",
    gap: "10",
    scale: .75,
    opacity: 0.95,
    //mobileVideo: true,
    deskStories: true,
    deskSwipe: true, // works only when "clickGallery" is turned of
    deskSwipeFocus: true,
    //clickGallery: true,
    keyboard: true,
    //buttons: true,
});
