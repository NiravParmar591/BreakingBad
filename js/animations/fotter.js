import gsap from "gsap";

export function initFooter() {
    const footerTL = gsap.timeline({
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            end: "bottom top"
        }
    });

    footerTL.from(".footer .logo-box", {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out"
    });

    footerTL.from(".footer .footer-heading", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out"
    });

    footerTL.from(".footer .footer-links a", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,  
        ease: "power3.out",
        clearProps: "y,opacity"
    });

    footerTL.from(".footer .end-footer", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
    });
}

export function initFootNav(){
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            const targetEl = document.querySelector(target);

            if (targetEl && targetEl.id === "walt-journey"){
                targetEl.style.transform = "translate(0px, 0px)";
            }
       
            if (targetEl) {
                gsap.to(window, {
                    scrollTo: targetEl,
                    duration: 1.2,
                    ease: "power2.inOut"
                });
            }
        });
    });
}