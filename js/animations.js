const tl = gsap.timeline({
    defaults: { duration: .5, ease: "Power3.easeOut" },
});

const tl2 = gsap.timeline({
    defaults: { duration: 4, ease: "Power3.easeOut" },
});

const launch = document.querySelector(".launch-button");

// launch sequence 
launch.addEventListener("click", () => {
    tl.to('.start', {opacity: 0});
    tl.set(".start", { display: "none" });
    tl.fromTo('.launch-pad', {opacity: 0}, {opacity: 1}, "<");
    tl.to('.countdown', {opacity: 0, delay: .5});
    tl.set('.countdown', {innerText: "2", opacity: 1});
    tl.to('#flame2', {opacity: 1}, "<");
    tl.set('#flame1', {opacity: 1}, "<");
    tl2.fromTo('#smoke', {opacity:0 }, {opacity: 1, delay: 2.2});
    tl.to('.countdown', {opacity: 0, delay: .5});
    tl.set('.countdown', {innerText: "1", opacity: 1, duration: 1});
    tl.to('.countdown', {opacity: 0, delay: 1});
    tl.set('.countdown', {innerText: "Huston we have a problem", opacity: 1});
    tl.to('#flame1', {opacity: 0});
    tl.to('#flame2', {opacity: 0});
    tl2.to('#smoke', {opacity: 0});
  });