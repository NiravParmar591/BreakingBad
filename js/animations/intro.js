import gsap from "gsap";

function initLogo() {
    gsap.to(".hero-sec .logo-box", {
        scale: 8,
        opacity: 0,
        y: "-200%",
        scrollTrigger: {
            trigger: ".hero-sec",
            start: "top top",
            end: "bottom 80%",
            scrub: 2
        }
    });
}

export function initIntro(){
    const introTimeline = gsap.timeline();
    const logoBox = document.querySelector('.logo-box');
    const intoMessage = document.querySelector('.intro-message');

    introTimeline.eventCallback('onStart', () => {
        document.body.classList.add('overflow-hidden');
    });

    introTimeline.from(logoBox, {
        opacity: 0,
        scale: 10,
        duration: 1,
        y: -200
    });
    
    introTimeline.from(intoMessage, {
        opacity: 0,
        y: 100,
        duration: 1
    });

    introTimeline.eventCallback('onComplete', () => {
        document.body.classList.remove('overflow-hidden');
        intoMessage.classList.add('animate-pulse');
        initLogo();
    });
}

export function initText() {
    const isSmallScreen = (window.visualViewport.width || window.innerWidth) <= 768;
    const xValue = isSmallScreen ? "-90%" : "-60%";

    gsap.to(".dialog-text", {
        x: xValue,
        scrollTrigger: {
            trigger: ".dialogBox",
            scroller: "body",
            start: "top top",
            end: "bottom -150%",
            scrub: 2,
            pin: true
        }
    });
}