window.addEventListener("click", function (event) {
  if (event.target.dataset.action === "plus") {
    const qtySelector = event.target.closest(".counter-wrapper");

    const counter = qtySelector.querySelector("[data-counter]");

    console.log(counter);
    console.log((counter.innerText = +counter.innerText));

    counter.innerText++;
  }

  if (event.target.dataset.action === "minus") {
    const qtySelector = event.target.closest(".counter-wrapper");

    const counter = qtySelector.querySelector("[data-counter]");

    if (parseInt(counter.innerText) >= 1) {
      counter.innerText = --counter.innerText;
    }
  }
});

let cartItems = [];

document.addEventListener("click", addProductToCart);

function addProductToCart(event) {
  if (event.target.hasAttribute("data-cart")) {
    const productCard = event.target.closest(".card");
    // Обєкт на основі данних з продукт карти
    let productInfo = {
      id: productCard.dataset.id,
      title: productCard.querySelector(".item-title").innerText,
      qtyInProduct: productCard.querySelector("[data-items-in-box]").innerText,
      price: productCard.querySelector(".price__currency").innerText,
      weight: productCard.querySelector(".price__weight").innerText,
      qtySelected: productCard.querySelector("[data-counter]").innerText,
      img: productCard.querySelector(".product-img").getAttribute("src"),
    };
    console.log(productInfo);

    cartItems.push(productInfo);
    renderCartSummaryItems();
  }
}

function renderCartSummaryItems() {
  cartItems.forEach((element) => {
    innerHTML = `<div class="cart-item" data-id="${element.id}">
								<div class="cart-item__top">
									<div class="cart-item__img">
										<img src="${element.img}" alt="${element.title}">
									</div>
									<div class="cart-item__desc">
										<div class="cart-item__title">${element.title}</div>
										<div class="cart-item__weight">${element.qtyInProduct} / ${element.weight}.</div>

										<!-- cart-item__details -->
										<div class="cart-item__details">

											<div class="items items--small counter-wrapper">
												<div class="items__control" data-action="minus">-</div>
												<div class="items__current" data-counter="">${element.qtySelected}</div>
												<div class="items__control" data-action="plus">+</div>
											</div>

											<div class="price">
												<div class="price__currency">${element.price}</div>
											</div>

										</div>
										

									</div>
								</div>
							</div>
        `;
  });
  const cartWrapper = document.querySelector(".cart-item");
  cartWrapper.insertAdjacentHTML("beforeend", innerHTML);
}
