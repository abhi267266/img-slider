const buttons = document.querySelectorAll("[data-carousel-button]");
const slides = document.querySelector("[data-slides]");
const radioButtonsContainer = document.createElement("div");
radioButtonsContainer.classList.add("radio-buttons");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    activateSlide(newIndex);
  });
});

function activateSlide(index) {
  const activeSlide = slides.querySelector("[data-active]");
  if (activeSlide) {
    delete activeSlide.dataset.active;
  }

  slides.children[index].dataset.active = true;

  const radioButtons = radioButtonsContainer.querySelectorAll("input[type='radio']");
  radioButtons.forEach((radioButton, i) => {
    if (i === index) {
      radioButton.checked = true;
    } else {
      radioButton.checked = false;
    }
  });
}

function startSlider() {
  let currentIndex = 0;

  setInterval(() => {
    currentIndex++;
    if (currentIndex >= slides.children.length) {
      currentIndex = 0;
    }

    activateSlide(currentIndex);
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  startSlider();

  for (let i = 0; i < slides.children.length; i++) {
    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "slider-radio";
    radioButton.value = i;
    radioButton.id = `radio-${i}`;

    if (i === 0) {
      radioButton.checked = true;
    }

    radioButton.addEventListener("change", () => {
      activateSlide(i);
    });

    const radioButtonLabel = document.createElement("label");
    radioButtonLabel.htmlFor = `radio-${i}`;

    radioButtonsContainer.appendChild(radioButton);
    radioButtonsContainer.appendChild(radioButtonLabel);
  }

  document.body.appendChild(radioButtonsContainer);
});
