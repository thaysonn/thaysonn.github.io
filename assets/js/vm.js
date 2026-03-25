document.addEventListener("DOMContentLoaded", function () {
    var ul = document.getElementById("ul");
    var menuMobile = document.querySelector(".menuMobile");
    var header = document.querySelector("header");
    var MOBILE_BREAKPOINT = 750;

    // Mobile menu toggle
    menuMobile.addEventListener("click", function () {
        var isVisible = ul.style.display === "flex";
        ul.style.display = isVisible ? "none" : "flex";
    });

    // Close mobile menu on link click
    document.querySelectorAll("nav ul li a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                ul.style.display = "none";
            }
        });
    });

    // Reset menu on resize
    window.addEventListener("resize", function () {
        if (window.innerWidth > MOBILE_BREAKPOINT) {
            ul.style.display = "";
        } else if (ul.style.display === "") {
            ul.style.display = "none";
        }
    });

    // Header background on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
        } else {
            header.style.boxShadow = "none";
        }
    });

    // Matrix decode animation for name
    var matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var nameEl = document.getElementById("matrix-name");
    if (nameEl) {
        var finalText = nameEl.getAttribute("data-text");
        var letters = finalText.split("");
        var resolved = new Array(letters.length).fill(false);
        var spans = [];

        // Create spans for each letter
        letters.forEach(function (letter, i) {
            var span = document.createElement("span");
            if (letter === " ") {
                span.className = "matrix-letter space";
                span.innerHTML = "&nbsp;";
                resolved[i] = true;
            } else {
                span.className = "matrix-letter matrix-scramble";
                span.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            }
            span.style.animationDelay = (i * 0.04) + "s";
            nameEl.appendChild(span);
            spans.push(span);
        });

        // Scramble phase: rapidly change characters
        var scrambleInterval = setInterval(function () {
            spans.forEach(function (span, i) {
                if (!resolved[i] && letters[i] !== " ") {
                    span.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                }
            });
        }, 50);

        // Decode phase: resolve one letter at a time
        var startDelay = 800;
        letters.forEach(function (letter, i) {
            if (letter === " ") return;
            setTimeout(function () {
                resolved[i] = true;
                spans[i].textContent = letter;
                spans[i].classList.remove("matrix-scramble");
                spans[i].classList.add("decoded");
            }, startDelay + (i * 120));
        });

        // Stop scrambling after all letters are decoded
        setTimeout(function () {
            clearInterval(scrambleInterval);
        }, startDelay + (letters.length * 120) + 200);
    }

    // Animate elements on scroll
    var observerOptions = { threshold: 0.1 };
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".timeline-item, .skill-category, .education-card, .contact-card").forEach(function (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
});