let desserts = [
  {
    "name": "Waffle with Berries",
    "category": "Waffle",
    "price": "$6.50",
    "image": "./assets/img/waffle-image.png",
    "stock": "6",
  },
  {
    "name": "Vanilla Bean Crème Brûlée",
    "category": "Crème Brûlée",
    "price": "$7.00",
    "image": "./assets/img/creme-burle-image.png",
    "stock": "5",
  },

  {
    "name": "Macaron Mix of Five",
    "category": "Macaron",
    "price": "$8.00",
    "image": "./assets/img/macaron-image.png",
    "stock": "2",
  },

  {
    "name": "Classic Tiramisu",
    "category": "Tiramisu",
    "price": "$5.50",
    "image": "./assets/img/tiramisu-image.png",
    "stock": "4",
  },

  {
    "name": "Pistachio Baklava",
    "category": "Baklava",
    "price": "$4.00",
    "image": "./assets/img/baklava-image.png",
    "stock": "8",
  },

  {
    "name": "Lemon Meringue Pie",
    "category": "Pie",
    "price": "$5.00",
    "image": "./assets/img/lemon-pie-image.png",
    "stock": "1",
  },

  {
    "name": "Red Velvet Cake",
    "category": "Cake",
    "price": "$4.50",
    "image": "./assets/img/red-velvet-cake-image.png",
    "stock": "3",
  },


  {
    "name": "Salted Caramel Brownie",
    "category": "Brownie",
    "price": "$5.50",
    "image": "./assets/img/caramel-browni-image.png",
    "stock": "9",
  },

  {
    "name": "Vanilla Panna Cotta",
    "category": "Panna Cotta",
    "price": "$6.50",
    "image": "./assets/img/panna-cotta-image.png",
    "stock": "7",
  },

];

const dessertList = document.querySelector('.dessertList');
const orderCart = document.querySelector('.order-cart');

for (const dessert of desserts) {
  dessertList.innerHTML +=
    `<li class="dessert-card">
      <div class="card-inner">
        <img class="dessert-image" src=${dessert.image} alt="desert image">
        <button class="add-btn" data-isim= "${dessert.name}">
        <img src="./assets/img/shopping-cart-plus.svg" alt="">Add to cart 
        </button>
      </div>
      <div class="card-text">
        <h3">${dessert.category}</h3>
        <h4>${dessert.name}</h4>
        <p>${dessert.price}</p>
      </div>
    </li>`
}

const addBtns = document.querySelectorAll('.add-btn');
const orderList = document.querySelector('.orderList');
const orders = [];

const emptyOrderCart = document.querySelector('.order-cart-empty');
const fullOrderCart = document.querySelector('.order-cart-full');
const productCounter = document.querySelector('.product-counter');
const totalOrderPrice = document.querySelector('.totalOrderPrice');

fullOrderCart.classList.add('d-none');

for (const btn of addBtns) {
  btn.addEventListener('click', handleAddButtons);
}

function handleAddButtons(e) {
  e.stopPropagation();

  const dessertName = e.target.dataset.isim || e.target.parentElement.dataset.isim;

  emptyOrderCart.classList.add('d-none');
  fullOrderCart.classList.add('d-block');

  let searchedOrder = orders.find(order => order.name === dessertName);

  if (searchedOrder) {
    searchedOrder.quantity++;
  } else {
    orders.push({
      name: dessertName,
      quantity: 1,
    });
  }

  const stocks = [];

  for (let i = 0; i < desserts.length; i++) {

    for (const dessert of desserts) {
      stocks[i] = dessert.stock;
    }
  }
  for (const dessert of desserts) {
    if (searchedOrder === dessert.name) {
      if (searchedOrder.quantity > searchedOrder.stock) {

      }
    }
  }

  renderOrders();
}

let totalQuantity = 0;
let totalPrice = 0;

function renderOrders() {
  orderList.innerHTML = '';
  totalQuantity = 0;
  totalPrice = 0;
  productCounter.innerText = '';
  totalOrderPrice.innerText = '';

  for (const order of orders) {
    totalQuantity += Number(order.quantity);
    const dessert = desserts.find(d => d.name === order.name);
    const onlyPrice = Number(dessert.price.slice(1)); // var olan dolar işareti için => slice
    const totalPerPrice = Number((onlyPrice * order.quantity.toFixed(2)));
    totalPrice += totalPerPrice;

    orderList.innerHTML += `
      <li class="order-cart">
        <div class="order-info">
          <h4>${order.name}</h4>
          <div class="sub-info">
            <span class="quantity-span">${order.quantity}x</span>
            <div class="price">
              <span class="orjPrice">@${dessert.price}</span>
              <span class="lastPrice">$${totalPerPrice}</span>
            </div>
          </div>
        </div>
        <div class="deleteBtn" data-name="${order.name}">
          <img src="assets/img/remove-button.svg" alt="Remove Button Icon">
        </div>
      </li>
    `;
  }
  productCounter.innerText = totalQuantity;
  totalOrderPrice.innerText = `$${totalPrice}`;

  const deleteBtns = document.querySelectorAll('.deleteBtn');
  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', deleteProducts);
  }
  if (productCounter.innerText == 0) {
    fullOrderCart.classList.remove('d-block');
    emptyOrderCart.classList.remove('d-none');
    emptyOrderCart.classList.add('d-block');
  } else {
    fullOrderCart.classList.add('d-block');
    emptyOrderCart.classList.remove('d-block');
    emptyOrderCart.classList.add('d-none');
  }
}

function deleteProducts() {
  let productIndex = -1; //eğer index numarası yoksa -1 döner çünkü

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].name == this.dataset.name) {
      productIndex = i;
    }
  }

  orders.splice(productIndex, 1);
  this.parentElement.remove();
  renderOrders();
}