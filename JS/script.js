function goHome() {
  // Top pe scroll
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // Video restart + unmute
  let video = document.getElementById("bg-video");
  video.currentTime = 0;
  video.muted = false;
  video.play();
}


// web on click - using gsap

document.addEventListener("click", (e) => {

  const cx = e.clientX;
  const cy = e.clientY + window.scrollY; // 👈 ye add kar

  const total = 12;
  const radiusLevels = [60, 110, 160];

  let points = [];

  // 🔥 SPOKES
  for (let i = 0; i < total; i++) {

    const angle = (i / total) * Math.PI * 2;
    points[i] = [];

    for (let r = 0; r < radiusLevels.length; r++) {

      const radius = radiusLevels[r];

      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      points[i].push({ x, y });

      const line = document.createElement("div");
      line.classList.add("web-line"); // 👈 IMPORTANT

      line.style.position = "absolute";
      line.style.width = "2px";
      line.style.height = "0px";
      line.style.background = "white";
      line.style.left = cx + "px";
      line.style.top = cy + "px";
      line.style.transformOrigin = "top";

      document.body.appendChild(line);

      line.style.transform = `rotate(${angle}rad)`;

      gsap.to(line, {
        height: radius,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  }

  // 🔥 CIRCULAR CONNECTIONS
  for (let r = 0; r < radiusLevels.length; r++) {

    for (let i = 0; i < total; i++) {

      const next = (i + 1) % total;

      const p1 = points[i][r];
      const p2 = points[next][r];

      const segment = document.createElement("div");
      segment.classList.add("web-line"); // 👈 IMPORTANT

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const angle = Math.atan2(dy, dx);

      segment.style.position = "absolute";
      segment.style.width = "0px";
      segment.style.height = "2px";
      segment.style.background = "white";
      segment.style.left = p1.x + "px";
      segment.style.top = p1.y + "px";
      segment.style.transformOrigin = "left";

      document.body.appendChild(segment);

      segment.style.transform = `rotate(${angle}rad)`;

      gsap.to(segment, {
        width: dist,
        duration: 0.1,
        delay: 0.01 + r * 0.01,
        ease: "power1.out"
      });
    }
  }

  // 🔥 REMOVE ONLY WEB (FIXED)
  setTimeout(() => {
    document.querySelectorAll(".web-line").forEach(el => {
      gsap.to(el, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => el.remove()
      });
    });
  }, 300);

},true);

// left to right move - SPIDERMAN

gsap.to("#page4 h1", {
  x: "-100%",           // 👈 -200% se -150% (kam movement = slow feel)
  ease: "none",
  scrollTrigger: {
    trigger: "#page4",
    start: "top top",
    end: "+=5000",    // 👈 15000 ya 20000 (scroll distance badhao)
    scrub: 5,         // 👈 20 ya 25 (smoothness badhao)
    pin: true
  }
});

// web single linestring 
var path = "M 10 200 Q 800 0 1490 200"
var finalPath = "M 10 200 Q 800 200 1490 200"

var string = document.querySelector("#string")

string.addEventListener("mousemove", function (dets) {
  path = `M 10 200 Q ${dets.x} ${dets.y} 1490 200`

  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.2,
    ease: "power3.out"
  })
});

string.addEventListener("mouseleave", function () {
  gsap.to("svg path", {
    attr: { d: finalPath },
    duration: 0.5,
    ease: "elastic.out(1,0.2)"
  })
});

// image manginifier
let active = null;

function toggleImage(el) {

  if (active === el) {
    gsap.to(el, {
      duration: 0.7,
      top: el.dataset.top,
      left: el.dataset.left,
      width: 320,
      height: 190,
      ease: "power3.inOut",
      onComplete: () => {
        el.style.position = "static";
        el.style.zIndex = 1;
      }
    });
    active = null;
    return;
  }

  if (active) toggleImage(active);

  let rect = el.getBoundingClientRect();
  el.dataset.top = rect.top + "px";
  el.dataset.left = rect.left + "px";

  el.style.position = "fixed";
  el.style.top = rect.top + "px";
  el.style.left = rect.left + "px";
  el.style.zIndex = 999;

  gsap.to(el, {
    duration: 0.7,
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    ease: "power3.inOut"
  });

  active = el;
}

// section 6
gsap.registerPlugin(ScrollTrigger);

// text reveal
gsap.to(".spidey-title span", {
  opacity: 1,
  y: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".spidey-showcase",
    start: "top 70%",
  }
});

// paragraph
gsap.to(".spidey-desc", {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.5,
  scrollTrigger: {
    trigger: ".spidey-showcase",
    start: "top 70%",
  }
});

// image zoom out (parallax feel)
gsap.to(".spidey-right img", {
  scale: 1,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".spidey-showcase",
    start: "top 80%",
  }
});