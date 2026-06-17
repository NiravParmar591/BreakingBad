import gsap from "gsap";

export function initSeasons() {
    const seasonsTL = gsap.timeline({
        scrollTrigger: {
            trigger: "#season-page",
            start: "top 20%",
            end: "bottom top"
        }
    });

    seasonsTL.from('#season-page .page-title', {
        y: 50,
        opacity: 0,
        scale: 1.2,
        duration: 0.5
    });

    seasonsTL.from("#season-page .season-box .season", {
        x: -200,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15
    });
}