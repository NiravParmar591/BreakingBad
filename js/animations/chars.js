import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function breakTag(tag) {
    const tagString = tag.innerText.split(' ');

    tag.innerHTML = "";
    tagString.forEach(str => {
        tag.innerHTML += `<span>${str}</span>`;
    });
}

export function initChars() {
    const charBoxes = document.querySelectorAll('.charBox');

    charBoxes.forEach(charBox => {
        const charTagLine = charBox.querySelector('.char-tag-line');
        const charName = charBox.querySelector('.char-name');
        const charImage = charBox.querySelector('.char-image');
        const charBioText = charBox.querySelector('.char-bio-text');

        breakTag(charName);
        breakTag(charTagLine);

        const nameSpans = charName.querySelectorAll('span');
        const tagLineSpans = charTagLine.querySelectorAll('span');

        let charTL = gsap.timeline({
            scrollTrigger: {
                trigger: charBox,
                start: "top top",
                end: "bottom -30%",
                pin: true,
                onEnter: () => charImage.classList.remove("grayscale"),
                onEnterBack: () => charImage.classList.remove("grayscale"),
                onLeave: () => charImage.classList.add("grayscale"),
                onLeaveBack: () => charImage.classList.add("grayscale"),
            }
        });

        charTL.from(charImage, {
            y: "150%",
            scale: 2,
            duration: 1.2
        });

        charTL.from([...nameSpans, ...tagLineSpans], {
            y: 20,
            opacity: 0,
            duration: 0.15,
            stagger: 0.1
        });

        charTL.to(charBioText, {
            y: 0,
            duration: 1.2
        });
    });
}

export function initLines() {
    const charLines = document.querySelectorAll('.char-line');
    const linesPageTL = gsap.timeline({
        scrollTrigger: {
            trigger: ".charactersLineBox",
            // markers: true,
            start: "top 20%",
            end: "bottom top",
        }
    });

    linesPageTL.from('.charactersLineBox h1', {
        y: 50,
        opacity: 0,
        duration: 1
    });

    linesPageTL.from('.char-line', {
        x: -100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.15
    })

    charLines.forEach(line => {
        // Support both hover (desktop) and tap (mobile)
        const lineTag = line.querySelector('.char-line-tag');
        let isTagVisible = false;

        line.addEventListener('mouseenter', () => {
            gsap.to(lineTag, { y: 0, duration: 0.4 });
            isTagVisible = true;
        });

        line.addEventListener('mouseleave', () => {
            gsap.to(lineTag, { y: 150, duration: 0.4 });
            isTagVisible = false;
        });

        line.addEventListener('click', () => {
            if (isTagVisible) {
                gsap.to(lineTag, { y: 150, duration: 0.4 });
                isTagVisible = false;
            } else {
                gsap.to(lineTag, { y: 0, duration: 0.4 });
                isTagVisible = true;
            }
        });

        document.addEventListener('click', (e) => {
            if (!line.contains(e.target) && isTagVisible) {
                gsap.to(lineTag, { y: 150, duration: 0.4 });
                isTagVisible = false;
            }
        });
    });
}

export function initWaltTransformation() {
    const waltTransBoxes = document.querySelectorAll('.waltTransBox');
    // const headingTexts = document.querySelectorAll('.heading-text');
    // const contentTexts = document.querySelectorAll('.content-text');
    // const tags = document.querySelectorAll('.keyBox span');
    const isMobile = window.innerWidth < 768;
    
    const thresholds = [0, 0.10, 0.26, 0.48, 0.7];  
    const animated = new Array(waltTransBoxes.length).fill(false);

    gsap.to('.walt-transformaion-row', {
        x: "-400%",
        scrollTrigger: {
            trigger: ".waltsTransformationPage",
            // markers: true,
            start: "top top",
            end: "bottom -400%",
            scrub: true,
            pin: true
        }
    });

    gsap.to('.progress-bar', {
        width: "100%",
        scrollTrigger: {
            trigger: ".waltsTransformationPage",
            // markers: true,
            start: "top top",
            end: "bottom -400%",
            scrub: true
        }
    });

    gsap.set(document.querySelectorAll('.waltTransBox .heading-text'), {
        y: -50,
        opacity: 0
    });

    gsap.set(document.querySelectorAll('.waltTransBox .content-text, .waltTransBox .keyBox span'), {
        y: 50,
        opacity: 0
    });

    ScrollTrigger.create({
        trigger: ".waltsTransformationPage",
        // markers: true,
        start: "top top",
        end: "bottom -400%",
        onUpdate: (self) => {
            waltTransBoxes.forEach((box, i) => {
                if (self.progress >= thresholds[i] && !animated[i]) {
                    animated[i] = true;
                    gsap.to(box.querySelector('.heading-text'), { y: 0, opacity: 1, duration: 0.6 });
                    gsap.to(box.querySelector('.content-text'), { y: 0, opacity: 1, duration: 0.6, delay: 0.3 });
                    gsap.to(box.querySelectorAll('.keyBox span'), { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, delay: 0.3 });
                }
                
                // if (self.progress <= thresholds[i] && animated[i]) {
                //     animated[i] = false;
                //     gsap.to(box.querySelector('.heading-text'), { y: -50, opacity: 0, duration: 0.6 });
                //     gsap.to(box.querySelector('.content-text'), { y: 50, opacity: 0, duration: 0.6 });
                //     gsap.to(box.querySelectorAll('.keyBox span'), { y: 50, opacity: 0, duration: 0.6 });
                // }
            });
        }
    });
}