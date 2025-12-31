// ------------------ Locomotive + GSAP Setup ------------------
gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  multiplier: 1, // speed control
  lerp: 0.1      // smoothness control
});

// Sync ScrollTrigger with Locomotive
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  }
});

// Refresh ScrollTrigger after Locomotive init
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();


// ------------------ GSAP Animations ------------------

// Big text
gsap.fromTo(".bigtext",
  { y: 150, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: "#front",
      scroller: "#main",   // 🚨 IMPORTANT
      start: "top 75%",
      once: true
    }
  }
);

// Logo
gsap.fromTo(".logo",
  { y: -150, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: "#front",
      scroller: "#main",
      start: "top 75%",
      once: true
    }
  }
);

// Left section
gsap.fromTo("#left",
  { y: -150, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: "#front",
      scroller: "#main",
      start: "top 75%",
      once: true
    }
  }
);


// ------------------ Video Cursor Effect ------------------
(function videoCursorEffect() {
  const playbtn = document.getElementById("playbtn");
  const videoContainer = document.getElementById("video-container");
  if (!playbtn || !videoContainer) return;

  // Show on enter
  videoContainer.addEventListener("mouseenter", () => {
    gsap.to(playbtn, { scale: 1, opacity: 1, duration: 0.1, ease: "power3.out" });
  });

  // Hide on leave
  videoContainer.addEventListener("mouseleave", () => {
    gsap.to(playbtn, { scale: 0, opacity: 0, duration: 0.25, ease: "power3.in" });
  });

  // Smooth follow
  videoContainer.addEventListener("mousemove", (e) => {
    const rect = videoContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(playbtn, {
      x, y,
      duration: 1.3,
      ease: "power2.out"
    });
  });
})();
