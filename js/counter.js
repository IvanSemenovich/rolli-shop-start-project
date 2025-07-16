const increasedButton = document.querySelector('[data-action="plus"]');
const decreasedButton = document.querySelector('[data-action="minus"]');
const qtyCounter = document.querySelector('[data-counter=""]');

increasedButton.addEventListener("click", function () {
  qtyCounter.innerText = ++qtyCounter.innerText;
});

decreasedButton.addEventListener("click", function () {
  if (parseInt(qtyCounter.innerText > 1)) {
    qtyCounter.innerText = --qtyCounter.innerText;
  }
});
