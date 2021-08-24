// jQuery $ selector
let $ = (el) => document.querySelector(el);
let $all = (items) => document.querySelectorAll(items);

let testimonials = $all(".testimonial .boxes-container .box");

let colors_list = [
  "#3497db",
  "#f70fdd",
  "#ff4343",
  "#b148dc",
  "#B5F02E",
  "#8c8cd8",
  "#e3008c",
  "#607d88",
  "#2c3e50",
  "#795548",
];

(function LazyImagesLoading(){
  $all('img').forEach(image=>image.setAttribute('loading','lazy'))
})();
/* 
  toggler
  toggle between 2 class for an element
*/
function toggler(el, classes) {
  if (el.classList.contains(classes[0])) {
    el.classList.remove(classes[0]);
    el.classList.add(classes[1]);
  } else {
    el.classList.remove(classes[1]);
    el.classList.add(classes[0]);
  }
}

$(".nav-menu-toggler").addEventListener("click", (e) => {
  $(".nav-links").classList.toggle("d-block");
  toggler($(".nav-menu-toggler").children[0], ["lni-menu", "lni-close"]);
});
//! the 2 are the same
document.querySelectorAll(".nav-links ul li").forEach((el) => {
  el.addEventListener("click", () => {
    $(".nav-links").classList.toggle("d-block");
    toggler($(".nav-menu-toggler").children[0], ["lni-menu", "lni-close"]);
  });
});
/*
  changeBackgroundColor(el): change element's background color
  el: the element that it's background will changed
  1. Generate random number that's less that Colors Array items length
  2. Choice Color depends on the random number
  3. Change the element background color
*/
//? using API will be better, then no need for many elements
function changeBackgroundColor(el) {
  let random_number = Math.round(Math.random() * colors_list.length);
  let color = colors_list[random_number];
  el.style.backgroundColor = color;
}
//! this function is very complex
function testimonialNavigate(direction) {
  let current_testimonial = $(".testimonial .boxes-container .box.d-block");
  if (testimonials.length > 1) {
    current_testimonial.classList.remove("d-block");
    if (direction === "previous") {
      if (testimonials[0] !== current_testimonial) {
        current_testimonial.previousElementSibling.classList.add("d-block");
        changeBackgroundColor(current_testimonial.previousElementSibling); //! Very Bad way
      } else {
        testimonials[testimonials.length - 1].classList.add("d-block");
        changeBackgroundColor(testimonials[testimonials.length - 1]); //! Very Bad way
      }
    } else {
      if (testimonials[testimonials.length - 1] != current_testimonial) {
        current_testimonial.nextElementSibling.classList.add("d-block");
        changeBackgroundColor(current_testimonial.nextElementSibling); //! Very Bad way
      } else {
        testimonials[0].classList.add("d-block");
        changeBackgroundColor(testimonials[0]); //! Very Bad way
      }
    }
  }
}

// Auto update footer right's year
function updateFooterRightYear() {
  let current_year = new Date().getFullYear();
  $("footer span .year").textContent = current_year;
}
// Theme Toggler
(function themeToggler() {
  let theme_toggler = $(".nav-theme-switcher");
  theme_toggler.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    toggler(theme_toggler.children[0], ["lni-night", "lni-sun"]);
  });
})();
window.onload = () => {
  // Change footer background
  changeBackgroundColor($("footer"));
  // Change current testimonial background
  changeBackgroundColor(testimonials[0]);
  // Initialize Animate On Scroll Plugin (AOS)
  AOS.init();
  // Auto update footer right's year
  updateFooterRightYear();
};
