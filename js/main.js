import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { initChars, initLines, initWaltTransformation } from "./animations/chars.js";
import { initFooter, initFootNav } from "./animations/fotter.js";
import { initIntro, initText } from "./animations/intro.js";
import { initSeasons } from "./animations/seasons.js";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

initIntro();
initText();
initChars();
initWaltTransformation();
initSeasons();
initLines();
initFooter();
initFootNav();