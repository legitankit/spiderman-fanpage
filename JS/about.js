gsap.registerPlugin(ScrollTrigger);

// text blocks animation
gsap.to(".block", {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".about-spidey",
        start: "top 70%"
    }
});

// image zoom-out
gsap.to(".about-right img", {
    scale: 1,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".about-spidey",
        start: "top 80%"
    }
});