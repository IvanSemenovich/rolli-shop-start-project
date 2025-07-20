window.addEventListener("click", function (event) {
  const action = event.target.dataset.action;
  const isInCard = event.target.closest(".card");

  if ((action === "plus" || action === "minus") && isInCard) {
    const qtySelector = event.target.closest(".counter-wrapper");
    if (!qtySelector) return;

    const counter = qtySelector.querySelector("[data-counter]");

    if (action === "plus") {
      counter.innerText = parseInt(counter.innerText) + 1;
    }

    if (action === "minus" && parseInt(counter.innerText) > 1) {
      counter.innerText = parseInt(counter.innerText) - 1;
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
    const cartWrapper = document.querySelector(".cart-wrapper");
    const itemInCart = cartWrapper.querySelector(
      `[data-id="${productInfo.id}"]`
    );

    if (itemInCart) {
      const counterElement = itemInCart.querySelector("[data-counter]");
      counterElement.innerText =
        parseInt(counterElement.innerText) + parseInt(productInfo.qtySelected);
    } else {
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
                    <div class="items__control" data-action="remove">✖</div>
										</div>
										

									</div>
								</div>
							</div>
        `;
    });

    const cartWrapper = document.querySelector(".cart-wrapper");
    cartWrapper.insertAdjacentHTML("beforeend", innerHTML);
  }
}

// function removeItemFromCart(event) {
//   const removeButton = event.target.dataset.action;
//   console.log(removeButton);
// }
// removeItemFromCart();
