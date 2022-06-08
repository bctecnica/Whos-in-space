const tl = gsap.timeline({
    defaults: { duration: 1, ease: "Power3.easeOut" },
});

const launch = document.querySelector(".launch-button");

launch.addEventListener("click", () => {
    tl.fromTo('.start', {opacity: 0 }, {opacity: 1});
    gsap.set(".start", { display: "none" });
    tl.fromTo('.launch-pad', {opacity: 0}, {opacity: 1 });
  });