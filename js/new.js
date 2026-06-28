/* TrajectoryX landing page — vanilla JS interactions */
(function () {
    "use strict";

    var nav = document.getElementById("nav");
    var burger = document.getElementById("burger");
    var mobileMenu = document.getElementById("mobileMenu");
    var toTop = document.getElementById("toTop");

    /* ---- Navbar background + back-to-top on scroll ---- */
    function onScroll() {
        var y = window.scrollY || window.pageYOffset;
        if (nav && !nav.classList.contains("legal-fixed")) nav.classList.toggle("scrolled", y > 24);
        if (toTop) toTop.classList.toggle("show", y > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---- Mobile menu ---- */
    function setMenu(open) {
        if (!mobileMenu || !burger) return;
        mobileMenu.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
    }
    if (burger && mobileMenu) {
        burger.addEventListener("click", function () {
            setMenu(!mobileMenu.classList.contains("open"));
        });
        mobileMenu.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function () { setMenu(false); });
        });
        window.addEventListener("keydown", function (e) {
            if (e.key === "Escape") setMenu(false);
        });
    }

    /* ---- Back to top ---- */
    if (toTop) {
        toTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---- Scroll reveal ---- */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---- Active nav link highlighting ---- */
    var sections = ["features", "devices", "swing", "ai", "drills"]
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
    var linkMap = {};
    document.querySelectorAll(".nav-links a").forEach(function (a) {
        var id = a.getAttribute("href").slice(1);
        linkMap[id] = a;
    });

    if ("IntersectionObserver" in window && sections.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var link = linkMap[entry.target.id];
                if (!link) return;
                if (entry.isIntersecting) {
                    Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove("active"); });
                    link.classList.add("active");
                }
            });
        }, { threshold: 0.5 });
        sections.forEach(function (s) { spy.observe(s); });
    }

    /* ---- Footer year ---- */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
