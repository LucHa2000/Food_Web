const productQuantites = document.querySelectorAll('.p-quantity');
const productPrices = document.querySelectorAll('.card-price');
const cartDiscounts = document.querySelectorAll('.card-discount');
let totalPrice = 0,
  quantity,
  prices,
  price,
  discount;
for (let i = 0; i < productQuantites.length; i++) {
  quantity = Number(productQuantites[i].value);
  prices = productPrices[i].textContent.match(/\d+/g);
  price = Number(prices[0]) + Number(`0.${prices[1]}`);
  discounts = cartDiscounts[i].textContent.match(/\d+/g);
  discount = Number(discounts[0]);
  totalPrice += quantity * price * (1 - discount / 100);
  //   console.log(quantiy);
  //   console.log(price);
  console.log(quantity, price, discount);
}

console.log(totalPrice);
document.querySelector('.total-price').innerHTML = `$${totalPrice}`;
