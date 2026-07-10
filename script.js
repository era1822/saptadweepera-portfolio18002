/* ==========================================================
   SAPTADWEEP BARMAN ERA — PROFESSIONAL PORTFOLIO
   COMPLETE SCRIPT.JS

   Features:
   1. Page loader
   2. Fixed navigation effect
   3. Mobile hamburger menu
   4. Smooth navigation
   5. Active navigation highlighting
   6. Typing animation
   7. Animated background particles
   8. Glowing cursor
   9. Scroll-reveal animation
   10. Animated skill bars
   11. Statistics counters
   12. Certificate modal
   13. Contact-form validation
   14. Back-to-top button
========================================================== */


/* ==========================================================
   1. SELECT IMPORTANT HTML ELEMENTS
========================================================== */

const pageLoader = document.getElementById("pageLoader");

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("main section[id]");

const typingText = document.getElementById("typingText");

const particleCanvas = document.getElementById("particleCanvas");

const cursorGlow = document.getElementById("cursorGlow");

const backToTop = document.getElementById("backToTop");

const certificateModal =
    document.getElementById("certificateModal");

const modalCertificateImage =
    document.getElementById("modalCertificateImage");

const modalClose =
    document.getElementById("modalClose");

const certificateButtons =
    document.querySelectorAll(".view-certificate");

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


/* ==========================================================
   2. PAGE LOADER
========================================================== */

/*
The loader disappears after all website resources,
including the profile and certificate images, finish loading.
*/

window.addEventListener("load", () => {

    setTimeout(() => {

        if (pageLoader) {

            pageLoader.classList.add("hidden");

        }

    }, 700);

});


/*
Safety fallback:

If an image is missing or loads very slowly,
the loader will still disappear after three seconds.
*/

setTimeout(() => {

    if (pageLoader) {

        pageLoader.classList.add("hidden");

    }

}, 3000);


/* ==========================================================
   3. NAVIGATION BAR SCROLL EFFECT
========================================================== */

function updateHeader() {

    if (!header) {

        return;

    }


    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader
);


updateHeader();


/* ==========================================================
   4. MOBILE HAMBURGER MENU
========================================================== */

function openMobileMenu() {

    if (!menuToggle || !navMenu) {

        return;

    }


    menuToggle.classList.add("active");

    navMenu.classList.add("active");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

}


function closeMobileMenu() {

    if (!menuToggle || !navMenu) {

        return;

    }


    menuToggle.classList.remove("active");

    navMenu.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


function toggleMobileMenu() {

    if (!navMenu) {

        return;

    }


    const menuIsOpen =
        navMenu.classList.contains("active");


    if (menuIsOpen) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/*
Close the mobile menu after clicking
one of the navigation links.
*/

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});


/*
Close the mobile menu when the user
clicks outside the navigation area.
*/

document.addEventListener("click", (event) => {

    if (!navMenu || !menuToggle) {

        return;

    }


    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);


    if (
        navMenu.classList.contains("active") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        closeMobileMenu();

    }

});


/*
Close the mobile menu when Escape is pressed.
*/

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMobileMenu();

    }

});


/*
Reset the mobile menu if the browser
changes from mobile to desktop width.
*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {

        closeMobileMenu();

    }

});


/* ==========================================================
   5. SMOOTH INTERNAL LINK SCROLLING
========================================================== */

const internalLinks =
    document.querySelectorAll('a[href^="#"]');


internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetID =
            link.getAttribute("href");


        /*
        Ignore placeholder links that only contain "#".
        */

        if (!targetID ||
            targetID === "#"
        ) {

            event.preventDefault();

            return;

        }


        const targetSection =
            document.querySelector(targetID);


        if (!targetSection) {

            return;

        }


        event.preventDefault();


        const headerHeight =
            header ?
            header.offsetHeight :
            0;


        const targetPosition =

            targetSection.getBoundingClientRect().top

            +

            window.scrollY

            -

            headerHeight;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* ==========================================================
   6. ACTIVE NAVIGATION LINK
========================================================== */

function updateActiveNavigation() {

    let currentSection = "home";


    sections.forEach((section) => {

        const sectionTop =

            section.offsetTop

            -

            160;


        const sectionBottom =

            sectionTop

            +

            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");


        const linkTarget =
            link.getAttribute("href");


        if (
            linkTarget ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();


/* ==========================================================
   7. CONTINUOUS TYPING ANIMATION
========================================================== */

/*
These professional titles will appear
one after another in the hero section.
*/

const typingWords = [

    "Public Health Student",

    "Aspiring Public Health Researcher",

    "Python Data Analyst",

    "Machine Learning Enthusiast",

    "Biostatistics Learner",

    "Health Data Researcher"

];


let typingWordIndex = 0;

let typingLetterIndex = 0;

let isDeleting = false;


const typingSpeed = 80;

const deletingSpeed = 45;

const completedWordPause = 1600;

const emptyTextPause = 400;


function runTypingAnimation() {

    if (!typingText) {

        return;

    }


    const currentWord =

        typingWords[typingWordIndex];


    if (!isDeleting) {

        /*
        Add one letter.
        */

        typingLetterIndex++;


        typingText.textContent =

            currentWord.substring(

                0,

                typingLetterIndex

            );


        /*
        When the complete title has appeared,
        wait before deleting it.
        */

        if (
            typingLetterIndex ===
            currentWord.length
        ) {

            isDeleting = true;


            setTimeout(

                runTypingAnimation,

                completedWordPause

            );


            return;

        }


        setTimeout(

            runTypingAnimation,

            typingSpeed

        );

    } else {

        /*
        Delete one letter.
        */

        typingLetterIndex--;


        typingText.textContent =

            currentWord.substring(

                0,

                typingLetterIndex

            );


        /*
        Move to the next professional title.
        */

        if (
            typingLetterIndex === 0
        ) {

            isDeleting = false;


            typingWordIndex =

                (
                    typingWordIndex + 1
                )

            %

            typingWords.length;


            setTimeout(

                runTypingAnimation,

                emptyTextPause

            );


            return;

        }


        setTimeout(

            runTypingAnimation,

            deletingSpeed

        );

    }

}


runTypingAnimation();


/* ==========================================================
   8. ANIMATED PARTICLE BACKGROUND
========================================================== */

if (particleCanvas) {

    const particleContext =

        particleCanvas.getContext("2d");


    let canvasWidth = 0;

    let canvasHeight = 0;

    let particles = [];


    /*
    Reduce particle quantity on smaller devices
    to maintain good website performance.
    */

    function getParticleAmount() {

        if (
            window.innerWidth < 500
        ) {

            return 32;

        }


        if (
            window.innerWidth < 900
        ) {

            return 48;

        }


        return 72;

    }


    /*
    Match the canvas size with the browser window.
    */

    function resizeParticleCanvas() {

        const devicePixelRatioValue =

            Math.min(

                window.devicePixelRatio || 1,

                2

            );


        canvasWidth =
            window.innerWidth;


        canvasHeight =
            window.innerHeight;


        particleCanvas.width =

            canvasWidth

            *

            devicePixelRatioValue;


        particleCanvas.height =

            canvasHeight

            *

            devicePixelRatioValue;


        particleCanvas.style.width =

            `${canvasWidth}px`;


        particleCanvas.style.height =

            `${canvasHeight}px`;


        particleContext.setTransform(

            devicePixelRatioValue,

            0,

            0,

            devicePixelRatioValue,

            0,

            0

        );


        createParticles();

    }


    /*
    Create a single particle object.
    */

    function createParticle() {

        return {

            x: Math.random() *
                canvasWidth,

            y: Math.random() *
                canvasHeight,

            radius: Math.random() *
                1.6 +
                0.5,

            speedX:
                (
                    Math.random() -
                    0.5
                ) *
                0.28,

            speedY:
                (
                    Math.random() -
                    0.5
                ) *
                0.28,

            opacity: Math.random() *
                0.55 +
                0.15

        };

    }


    /*
    Create the complete particle collection.
    */

    function createParticles() {

        particles = [];


        const particleAmount =

            getParticleAmount();


        for (

            let index = 0;

            index < particleAmount;

            index++

        ) {

            particles.push(

                createParticle()

            );

        }

    }


    /*
    Draw one glowing particle.
    */

    function drawParticle(particle) {

        particleContext.beginPath();


        particleContext.arc(

            particle.x,

            particle.y,

            particle.radius,

            0,

            Math.PI * 2

        );


        particleContext.fillStyle =

            `rgba(
                0,
                229,
                255,
                ${particle.opacity}
            )`;


        particleContext.shadowBlur = 8;


        particleContext.shadowColor =

            "rgba(0, 229, 255, 0.65)";


        particleContext.fill();


        particleContext.shadowBlur = 0;

    }


    /*
    Draw subtle lines between nearby particles.
    */

    function connectParticles() {

        for (

            let firstIndex = 0;

            firstIndex < particles.length;

            firstIndex++

        ) {

            for (

                let secondIndex =
                    firstIndex + 1;

                secondIndex <
                particles.length;

                secondIndex++

            ) {

                const firstParticle =

                    particles[firstIndex];


                const secondParticle =

                    particles[secondIndex];


                const distanceX =

                    firstParticle.x

                    -

                    secondParticle.x;


                const distanceY =

                    firstParticle.y

                    -

                    secondParticle.y;


                const distance =

                    Math.sqrt(

                        distanceX *
                        distanceX

                        +

                        distanceY *
                        distanceY

                    );


                const connectionDistance = 120;


                if (
                    distance <
                    connectionDistance
                ) {

                    const lineOpacity =

                        (
                            1

                            -

                            distance

                            /

                            connectionDistance
                        )

                    *

                    0.09;


                    particleContext.beginPath();


                    particleContext.moveTo(

                        firstParticle.x,

                        firstParticle.y

                    );


                    particleContext.lineTo(

                        secondParticle.x,

                        secondParticle.y

                    );


                    particleContext.strokeStyle =

                        `rgba(
                            0,
                            174,
                            255,
                            ${lineOpacity}
                        )`;


                    particleContext.lineWidth =
                        0.7;


                    particleContext.stroke();

                }

            }

        }

    }


    /*
    Move every particle.
    */

    function updateParticles() {

        particles.forEach(

            (particle) => {

                particle.x +=
                    particle.speedX;


                particle.y +=
                    particle.speedY;


                /*
                Move particles to the opposite side
                after they leave the visible screen.
                */

                if (
                    particle.x < -10
                ) {

                    particle.x =

                        canvasWidth + 10;

                }


                if (
                    particle.x >
                    canvasWidth + 10
                ) {

                    particle.x = -10;

                }


                if (
                    particle.y < -10
                ) {

                    particle.y =

                        canvasHeight + 10;

                }


                if (
                    particle.y >
                    canvasHeight + 10
                ) {

                    particle.y = -10;

                }

            }

        );

    }


    /*
    Main particle animation loop.
    */

    function animateParticles() {

        particleContext.clearRect(

            0,

            0,

            canvasWidth,

            canvasHeight

        );


        updateParticles();


        particles.forEach(

            drawParticle

        );


        connectParticles();


        requestAnimationFrame(

            animateParticles

        );

    }


    resizeParticleCanvas();


    animateParticles();


    window.addEventListener(

        "resize",

        resizeParticleCanvas

    );

}


/* ==========================================================
   9. SOFT GLOWING CURSOR
========================================================== */

if (cursorGlow) {

    let cursorX =

        window.innerWidth / 2;


    let cursorY =

        window.innerHeight / 2;


    let glowX =
        cursorX;


    let glowY =
        cursorY;


    /*
    Update the target cursor position.
    */

    document.addEventListener(

        "mousemove",

        (event) => {

            cursorX =
                event.clientX;


            cursorY =
                event.clientY;

        }

    );


    /*
    Smoothly move the glow toward
    the actual cursor position.
    */

    function animateCursorGlow() {

        glowX +=

            (
                cursorX -
                glowX
            )

        *

        0.12;


        glowY +=

            (
                cursorY -
                glowY
            )

        *

        0.12;


        cursorGlow.style.left =

            `${glowX}px`;


        cursorGlow.style.top =

            `${glowY}px`;


        requestAnimationFrame(

            animateCursorGlow

        );

    }


    animateCursorGlow();

}


/* ==========================================================
   10. SCROLL-REVEAL ANIMATION
========================================================== */

const revealElements =

    document.querySelectorAll(

        ".reveal, .reveal-left, .reveal-right"

    );


const revealObserverOptions = {

    threshold: 0.12,

    rootMargin: "0px 0px -50px 0px"

};


const revealObserver =

    new IntersectionObserver(

        (
            entries,
            observer
        ) => {

            entries.forEach(

                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("active");


                        observer.unobserve(

                            entry.target

                        );

                    }

                }

            );

        },

        revealObserverOptions

    );


revealElements.forEach(

    (element) => {

        revealObserver.observe(

            element

        );

    }

);


/*
Immediately reveal elements already visible
when the website first opens.
*/

setTimeout(() => {

    revealElements.forEach(

        (element) => {

            const elementPosition =

                element
                .getBoundingClientRect();


            if (

                elementPosition.top

                <

                window.innerHeight

                *

                0.95

            ) {

                element.classList.add(

                    "active"

                );

            }

        }

    );

}, 250);


/* ==========================================================
   11. ANIMATED SKILL PROGRESS BARS
========================================================== */

const skillSection =

    document.getElementById("skills");


let skillAnimationCompleted = false;


function animateSkillBars() {

    if (
        skillAnimationCompleted
    ) {

        return;

    }


    const skillItems =

        document.querySelectorAll(

            ".skill-item"

        );


    skillItems.forEach(

        (
            skillItem,
            index
        ) => {

            const progressValue =

                skillItem.dataset.progress;


            const progressBar =

                skillItem.querySelector(

                    ".skill-progress span"

                );


            if (!progressBar) {

                return;

            }


            setTimeout(() => {

                    progressBar.style.width =

                        `${progressValue}%`;

                },

                index * 120

            );

        }

    );


    skillAnimationCompleted = true;

}


if (skillSection) {

    const skillObserver =

        new IntersectionObserver(

            (entries) => {

                entries.forEach(

                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateSkillBars();

                        }

                    }

                );

            },

            {

                threshold: 0.18

            }

        );


    skillObserver.observe(

        skillSection

    );

}


/* ==========================================================
   12. ANIMATED STATISTICS COUNTERS
========================================================== */

const statisticsSection =

    document.getElementById("statistics");


const counterElements =

    document.querySelectorAll(".counter");


let counterAnimationCompleted = false;


function animateCounter(counter) {

    const targetValue =

        Number(

            counter.dataset.target

        );


    const animationDuration =

        1700;


    const animationStartTime =

        performance.now();


    function updateCounter(

        currentTime

    ) {

        const elapsedTime =

            currentTime

            -

            animationStartTime;


        const animationProgress =

            Math.min(

                elapsedTime

                /

                animationDuration,

                1

            );


        /*
        Ease-out animation:
        fast at the beginning,
        slower near the final number.
        */

        const easedProgress =

            1

            -

            Math.pow(

                1

                -

                animationProgress,

                3

            );


        const currentValue =

            Math.floor(

                easedProgress

                *

                targetValue

            );


        counter.textContent =

            currentValue;


        if (
            animationProgress < 1
        ) {

            requestAnimationFrame(

                updateCounter

            );

        } else {

            counter.textContent =

                targetValue;

        }

    }


    requestAnimationFrame(

        updateCounter

    );

}


function startCounterAnimation() {

    if (
        counterAnimationCompleted
    ) {

        return;

    }


    counterElements.forEach(

        (
            counter,
            index
        ) => {

            setTimeout(() => {

                    animateCounter(

                        counter

                    );

                },

                index * 170

            );

        }

    );


    counterAnimationCompleted = true;

}


if (statisticsSection) {

    const statisticsObserver =

        new IntersectionObserver(

            (entries) => {

                entries.forEach(

                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            startCounterAnimation();

                        }

                    }

                );

            },

            {

                threshold: 0.25

            }

        );


    statisticsObserver.observe(

        statisticsSection

    );

}


/* ==========================================================
   13. CERTIFICATE FULL-SCREEN MODAL
========================================================== */

function openCertificateModal(

    certificateImagePath

) {

    if (

        !certificateModal

        ||

        !modalCertificateImage

    ) {

        return;

    }


    modalCertificateImage.src =

        certificateImagePath;


    certificateModal
        .classList
        .add("active");


    document.body.style.overflow =

        "hidden";

}


function closeCertificateModal() {

    if (

        !certificateModal

        ||

        !modalCertificateImage

    ) {

        return;

    }


    certificateModal
        .classList
        .remove("active");


    document.body.style.overflow =

        "";


    /*
    Clear the image after the
    closing animation is complete.
    */

    setTimeout(() => {

        if (

            !certificateModal
            .classList
            .contains("active")

        ) {

            modalCertificateImage.src = "";

        }

    }, 350);

}


/*
Open the selected certificate.
*/

certificateButtons.forEach(

    (button) => {

        button.addEventListener(

            "click",

            () => {

                const certificateImagePath =

                    button.dataset.image;


                openCertificateModal(

                    certificateImagePath

                );

            }

        );

    }

);


/*
Close the certificate using
the close button.
*/

if (modalClose) {

    modalClose.addEventListener(

        "click",

        closeCertificateModal

    );

}


/*
Close the modal after clicking
the dark background area.
*/

if (certificateModal) {

    certificateModal.addEventListener(

        "click",

        (event) => {

            if (

                event.target

                ===

                certificateModal

            ) {

                closeCertificateModal();

            }

        }

    );

}


/*
Close the modal by pressing Escape.
*/

document.addEventListener(

    "keydown",

    (event) => {

        if (

            event.key === "Escape"

            &&

            certificateModal

            &&

            certificateModal
            .classList
            .contains("active")

        ) {

            closeCertificateModal();

        }

    }

);


/* ==========================================================
   14. CONTACT-FORM VALIDATION
========================================================== */

function showFormError(

    inputElement,

    message

) {

    const formGroup =

        inputElement.closest(

            ".form-group"

        );


    if (!formGroup) {

        return;

    }


    formGroup
        .classList
        .add("error");


    const errorMessage =

        formGroup.querySelector(

            ".error-message"

        );


    if (
        errorMessage
    ) {

        errorMessage.textContent =

            message;

    }

}


function clearFormError(

    inputElement

) {

    const formGroup =

        inputElement.closest(

            ".form-group"

        );


    if (!formGroup) {

        return;

    }


    formGroup
        .classList
        .remove("error");


    const errorMessage =

        formGroup.querySelector(

            ".error-message"

        );


    if (
        errorMessage
    ) {

        errorMessage.textContent = "";

    }

}


/*
Check whether the entered email
has a standard email format.
*/

function isValidEmail(

    emailAddress

) {

    const emailPattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(

        emailAddress

    );

}


if (contactForm) {

    const fullNameInput =

        document.getElementById(

            "fullName"

        );


    const emailInput =

        document.getElementById(

            "emailAddress"

        );


    const subjectInput =

        document.getElementById(

            "subject"

        );


    const messageInput =

        document.getElementById(

            "message"

        );


    const formInputs = [

        fullNameInput,

        emailInput,

        subjectInput,

        messageInput

    ];


    /*
    Remove error messages while
    the user corrects an input.
    */

    formInputs.forEach(

        (input) => {

            if (!input) {

                return;

            }


            input.addEventListener(

                "input",

                () => {

                    clearFormError(

                        input

                    );


                    if (
                        formStatus
                    ) {

                        formStatus
                            .classList
                            .remove("success");


                        formStatus.textContent = "";

                    }

                }

            );

        }

    );


    contactForm.addEventListener(

        "submit",

        (event) => {

            event.preventDefault();


            let formIsValid = true;


            /*
            Validate the full name.
            */

            if (

                !fullNameInput.value.trim()

            ) {

                showFormError(

                    fullNameInput,

                    "Please enter your full name."

                );


                formIsValid = false;

            } else if (

                fullNameInput
                .value
                .trim()
                .length

                <

                3

            ) {

                showFormError(

                    fullNameInput,

                    "Your name must contain at least three characters."

                );


                formIsValid = false;

            }


            /*
            Validate the email address.
            */

            if (

                !emailInput.value.trim()

            ) {

                showFormError(

                    emailInput,

                    "Please enter your email address."

                );


                formIsValid = false;

            } else if (

                !isValidEmail(

                    emailInput
                    .value
                    .trim()

                )

            ) {

                showFormError(

                    emailInput,

                    "Please enter a valid email address."

                );


                formIsValid = false;

            }


            /*
            Validate the subject.
            */

            if (

                !subjectInput.value.trim()

            ) {

                showFormError(

                    subjectInput,

                    "Please enter a message subject."

                );


                formIsValid = false;

            } else if (

                subjectInput
                .value
                .trim()
                .length

                <

                4

            ) {

                showFormError(

                    subjectInput,

                    "The subject must contain at least four characters."

                );


                formIsValid = false;

            }


            /*
            Validate the message.
            */

            if (

                !messageInput.value.trim()

            ) {

                showFormError(

                    messageInput,

                    "Please write your message."

                );


                formIsValid = false;

            } else if (

                messageInput
                .value
                .trim()
                .length

                <

                15

            ) {

                showFormError(

                    messageInput,

                    "Your message must contain at least fifteen characters."

                );


                formIsValid = false;

            }


            /*
            Display a success message
            after successful validation.
            */

            if (
                formIsValid
            ) {

                if (
                    formStatus
                ) {

                    formStatus.textContent =

                        "Thank you! Your message has been validated successfully. Please connect this form to Formspree, EmailJS, or another email service to receive messages directly.";


                    formStatus
                        .classList
                        .add("success");

                }


                contactForm.reset();


                formInputs.forEach(

                    (input) => {

                        clearFormError(

                            input

                        );

                    }

                );

            }

        }

    );

}


/* ==========================================================
   15. BACK-TO-TOP BUTTON
========================================================== */

function updateBackToTopButton() {

    if (!backToTop) {

        return;

    }


    if (
        window.scrollY > 550
    ) {

        backToTop
            .classList
            .add("visible");

    } else {

        backToTop
            .classList
            .remove("visible");

    }

}


window.addEventListener(

    "scroll",

    updateBackToTopButton

);


updateBackToTopButton();


if (backToTop) {

    backToTop.addEventListener(

        "click",

        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    );

}


/* ==========================================================
   16. PROJECT DETAILS BUTTONS
========================================================== */

/*
These buttons currently display an information
message. Later, you can connect them to separate
project pages, PDF reports, GitHub repositories,
or project modal windows.
*/

const projectDetailsButtons =

    document.querySelectorAll(

        ".project-details-button"

    );


projectDetailsButtons.forEach(

    (button) => {

        button.addEventListener(

            "click",

            () => {

                const projectCard =

                    button.closest(

                        ".project-card"

                    );


                const projectTitle =

                    projectCard

                    ?

                    projectCard
                    .querySelector("h3")
                    .textContent
                    .trim()

                :

                "This project";


                alert(

                    `${projectTitle}\n\nA detailed project page or research report can be connected to this button later.`

                );

            }

        );

    }

);


/* ==========================================================
   17. IMAGE-LOADING FALLBACK
========================================================== */

/*
If the profile photograph is missing,
display a simple placeholder instead
of a broken image icon.
*/

const profileImage =

    document.querySelector(

        ".profile-image"

    );


if (profileImage) {

    profileImage.addEventListener(

        "error",

        () => {

            profileImage.style.display =

                "none";


            const imageContainer =

                profileImage.parentElement;


            if (
                imageContainer
            ) {

                imageContainer.innerHTML =

                    `

                    <div
                        style="
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-direction: column;
                            gap: 12px;
                            color: #00e5ff;
                            background:
                            linear-gradient(
                                135deg,
                                #071b35,
                                #020914
                            );
                        "
                    >

                        <i
                            class="fa-solid fa-user"
                            style="
                                font-size: 4rem;
                            "
                        ></i>

                        <span
                            style="
                                font-family:
                                Poppins,
                                sans-serif;

                                font-size:
                                0.75rem;
                            "
                        >

                            Add images/profile.jpg

                        </span>

                    </div>

                    `;

            }

        }

    );

}


/* ==========================================================
   18. CURRENT YEAR
========================================================== */

/*
The footer currently contains 2026 in the HTML.
This section can automatically update a footer
year if an element with the ID "currentYear"
is added later.
*/

const currentYear =

    document.getElementById(

        "currentYear"

    );


if (
    currentYear
) {

    currentYear.textContent =

        new Date().getFullYear();

}


/* ==========================================================
   19. WEBSITE READY MESSAGE
========================================================== */

/*
This message is only visible in the browser's
developer console. It does not appear on the page.
*/

console.log(

    "%cEra Portfolio is ready!",

    `

    color: #00e5ff;

    background: #03101f;

    padding: 10px 16px;

    border-radius: 8px;

    font-size: 14px;

    font-weight: bold;

    `

);
