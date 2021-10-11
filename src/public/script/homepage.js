// ----------------------------- Text typing animation -------------

// List of sentences
const sentences = ["Hello", "Xin chào", "Bonjour", "Hola", "Nǐ hǎo", "Olá"];

// Current sentence being processed
let sentence = 0;

// Character number of the current sentence being processed
let sentenceIndex = 0;

let _INTERVAL_VAL;

const mainHeaderTitleEl = document.querySelector("#main-header-title");

// CursorEl element
const cursorEl = document.querySelector("#cursor");

// Implements typing effect
function Type() {
  // Get substring with 1 characater added
  var text = sentences[sentence].substring(0, sentenceIndex + 1);
  mainHeaderTitleEl.innerHTML = text;
  sentenceIndex++;

  // If full sentence has been displayed then start to delete the sentence after some time
  if (text === sentences[sentence]) {
    // Hide the cursorEl
    cursorEl.style.display = "none";

    clearInterval(_INTERVAL_VAL);
    setTimeout(function () {
      _INTERVAL_VAL = setInterval(Delete, 100);
    }, 1000);
  }
}

// Implements deleting effect
function Delete() {
  // Get substring with 1 characater deleted
  var text = sentences[sentence].substring(0, sentenceIndex - 1);
  mainHeaderTitleEl.innerHTML = text;
  sentenceIndex--;

  // If sentence has been deleted then start to display the next sentence
  if (text === "") {
    clearInterval(_INTERVAL_VAL);

    // If current sentence was last then display the first one, else move to the next
    if (sentence == sentences.length - 1) sentence = 0;
    else sentence++;

    sentenceIndex = 0;

    // Start to display the next sentence after some time
    setTimeout(function () {
      cursorEl.style.display = "inline-block";
      _INTERVAL_VAL = setInterval(Type, 100);
    }, 200);
  }
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);

// -------------------- slides -----------
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-slide", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active-slide";
}
