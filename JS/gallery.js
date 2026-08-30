// swiper : coverflow 

const swiper = new Swiper('.spidey-carousel', {

    /* 3D Effect */
    effect: 'coverflow',

    /* Mouse cursor */
    grabCursor: true,

    /* Active slide center */
    centeredSlides: true,

    /* Slides width comes from CSS */
    slidesPerView: 'auto',

    /* Infinite loop */
    loop: true,

    /* Transition speed */
    speed: 500,


    /* Coverflow settings */
    coverflowEffect: {

        /* Side slide angle */
        rotate: 35,

        /* Space between slides */
        stretch: 0,

        /* 3D depth */
        depth: 180,

        /* Effect strength */
        modifier: 1,

        /* Side slide size */
        scale: 0.85,

        /* Shadow */
        slideShadows: true
    },


    /* Automatic sliding */
    autoplay: {

        /* 2 seconds */
        delay: 2000,

        /* Pause when mouse enters */
        pauseOnMouseEnter: true
    },


    /* Arrow buttons */
    navigation: {

        nextEl: '.swiper-button-next',

        prevEl: '.swiper-button-prev'
    },


    /* Dots */
    pagination: {

        el: '.swiper-pagination',

        clickable: true
    }

});



// /* HOVER COLOR EFFECT JS (C-G) */

const canvas = document.getElementById("timelineCanvas");
const ctx = canvas.getContext("2d");

const text = "WEB ARCHIVES";

let mouseX = -1000;
let mouseY = -1000;

let smoothX = -1000;
let smoothY = -1000;

function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousemove", function (e) {

    const rect = canvas.getBoundingClientRect();

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

});

canvas.addEventListener("mouseleave", function () {

    mouseX = -1000;
    mouseY = -1000;

});

function getFontSize(width) {

    let size = 400;

    const availableWidth = width * 0.97;

    while (size > 20) {

        ctx.font = `900 ${size}px Arial`;

        const textWidth =
            ctx.measureText(text).width;

        if (textWidth <= availableWidth) {
            break;
        }

        size -= 2;
    }

    return size;
}

function draw() {

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    const fontSize =
        getFontSize(width);

    ctx.font =
        `900 ${fontSize}px Arial`;

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    const centerX =
        width / 2;

    const centerY =
        height / 2;

    if (window.innerWidth <= 992) {

        ctx.fillStyle =
            "#e50914";

        ctx.fillText(
            text,
            centerX,
            centerY
        );

        requestAnimationFrame(draw);

        return;
    }

    const isMouseInside =
        mouseX > -500;

    const smoothSpeed =
        isMouseInside
            ? 0.08
            : 0.025;

    smoothX +=
        (mouseX - smoothX) *
        smoothSpeed;

    smoothY +=
        (mouseY - smoothY) *
        smoothSpeed;

    const radius = 250;

    ctx.fillStyle =
        "#ffffff";

    ctx.fillText(
        text,
        centerX,
        centerY
    );

    const image =
        ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

    const pixels =
        image.data;

    const dpr =
        window.devicePixelRatio || 1;

    const mx =
        smoothX * dpr;

    const my =
        smoothY * dpr;

    const r =
        radius * dpr;

    for (
        let y = 0;
        y < canvas.height;
        y++
    ) {

        for (
            let x = 0;
            x < canvas.width;
            x++
        ) {

            const index =
                (y * canvas.width + x) * 4;

            const alpha =
                pixels[index + 3];

            if (alpha === 0) {
                continue;
            }

            const dx =
                x - mx;

            const dy =
                y - my;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance >= r) {
                continue;
            }

            let progress =
                1 - distance / r;

            progress =
                progress *
                progress *
                progress *
                (
                    progress *
                    (progress * 6 - 15) +
                    10
                );

            pixels[index] =
                255;

            pixels[index + 1] =
                Math.round(
                    255 * (1 - progress)
                );

            pixels[index + 2] =
                Math.round(
                    255 * (1 - progress)
                );
        }
    }

    ctx.putImageData(
        image,
        0,
        0
    );

    if (isMouseInside) {

        const textMetrics =
            ctx.measureText(text);

        const textWidth =
            textMetrics.width;

        const textLeft =
            centerX - textWidth / 2;

        const textRight =
            centerX + textWidth / 2;

        const textTop =
            centerY - fontSize / 2;

        const textBottom =
            centerY + fontSize / 2;

        const closestX =
            Math.max(
                textLeft,
                Math.min(
                    smoothX,
                    textRight
                )
            );

        const closestY =
            Math.max(
                textTop,
                Math.min(
                    smoothY,
                    textBottom
                )
            );

        const dx =
            smoothX - closestX;

        const dy =
            smoothY - closestY;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        let glowProgress =
            1 - distance / radius;

        glowProgress =
            Math.max(
                0,
                Math.min(
                    1,
                    glowProgress
                )
            );

        glowProgress =
            glowProgress *
            glowProgress *
            glowProgress *
            (
                glowProgress *
                (glowProgress * 6 - 15) +
                10
            );

        if (glowProgress > 0) {

            ctx.save();

            ctx.font =
                `900 ${fontSize}px Arial`;

            ctx.textAlign =
                "center";

            ctx.textBaseline =
                "middle";

            ctx.lineWidth =
                1.2;

            ctx.strokeStyle =
                `rgba(255, 0, 0, ${0.45 * glowProgress})`;

            ctx.shadowColor =
                `rgba(255, 0, 0, ${0.45 * glowProgress})`;

            ctx.shadowBlur =
                5 * glowProgress;

            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            ctx.strokeText(
                text,
                centerX,
                centerY
            );

            ctx.restore();
        }
    }

    requestAnimationFrame(draw);
}

draw();





// splide js////////////////////////////

//  <script>
//     const splide = new Splide('.splide', {
//         type: 'loop',
//         // perPage → kitni slides ek time par visible hain.
//         perPage: 3,
//         autoplay : 'true',
//         interval : '1500',
//         // Smooth transition
//         speed: '1000',
//         // pauseOnHover : false,
//     });

//     splide.mount();
// </script> 

const splide = new Splide('.splide', {

    type: 'loop',

    // Center slide + side slides partially visible
    // Maan lo tumhara Splide box 1000px wide hai.
    // to har slide ki width = Splide box ki 50% width, by doing fixedWidth: '50%',
    // i.e Slide 1 = 500px | Slide 2 = 500px | Slide 3 = 500px | Slide 4 = 500px
    fixedWidth: '300px',
    focus: 'center',
    // Slides ke beech gap
    gap: '30px',
    direction: "rtl",

    // Ek baar me 1 slide move
    // perMove decides how many slides will move/shift in one movement instance.
    // perMove → move karne par kitni slides shift hongi.
    perMove: 1,

    // Automatic movement
    autoplay: true,
    interval: 1500,

    // Smooth transition
    speed: 1000,
    pagination: false,

    breakpoints: {
        600: {
            gap: 90
        }
    }

});

splide.mount();

