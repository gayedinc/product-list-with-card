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

// tatlı kartlarının oluşturulması
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
        <h3>${dessert.category}</h3>
        <h4>${dessert.name}</h4>
        <p>${dessert.price}</p>
      </div>
    </li>`
}

// sepete ürün eklemek için
const addBtns = document.querySelectorAll('.add-btn');
for (const btn of addBtns) {
  btn.addEventListener('click', handleAddButtons);
}

const orderList = document.querySelector('.orderList');
const orders = []; // kullanıcının sepete eklediği ürünleri tutar

const emptyOrderCart = document.querySelector('.order-cart-empty');
const fullOrderCart = document.querySelector('.order-cart-full');
const productCounter = document.querySelector('.product-counter');
const totalOrderPrice = document.querySelector('.totalOrderPrice');

// en başta dolu sepet gösterilmesin
fullOrderCart.classList.add('d-none');

function handleAddButtons(e) {
  e.stopPropagation();

  // tıklanan butondaki data-isim ile tatlının ismini almak için
  // eğer butonun içindeki img'a tıklanırsa data-isim img olacağından undefined döner
  // bunun olmaması için veya => img dönersen de parentElementini al yani yine butonun data-isim özelliğini al
  const dessertName = e.target.dataset.isim || e.target.parentElement.dataset.isim;

  // boş sepet gizlendi, dolu sepet gösterildi
  emptyOrderCart.classList.add('d-none');
  fullOrderCart.classList.add('d-block');

  // order.name sipariş nesnesindeki ürün adı, dessertName siparişe eklenmek istenen tatlının adı
  let searchedOrder = orders.find(order => order.name === dessertName);

  if (searchedOrder) { // eğer tatlı daha önceden sepete eklendiyse sadece miktar arttır
    searchedOrder.quantity++;
  } else {
    orders.push({ // eğer tatlı sepete ilk defa ekleniyorsa yeni tatlı olarak ekle ve miktarını 1'den başlat
      name: dessertName,
      quantity: 1,
    });
  }

  renderOrders();
}

let totalQuantity = 0; // toplam tatlı miktarı
let totalPrice = 0; // toplam fiyat

function renderOrders() {
  orderList.innerHTML = ''; // siparişleri listelemek için içeriği sıfırlanıyor
  totalQuantity = 0;
  totalPrice = 0;
  productCounter.innerText = ''; // toplam tatlı miktarının gösterildiği alan
  totalOrderPrice.innerText = ''; // toplam fiyatın gösterildiği alan

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
  if (productCounter.innerText == 0) { // eğer toplam tatlı miktarı 0 ise
    fullOrderCart.classList.remove('d-block'); // dolu sepeti gizle
    emptyOrderCart.classList.remove('d-none');
    emptyOrderCart.classList.add('d-block'); // boş sepeti göster
  } else {
    fullOrderCart.classList.add('d-block'); // dolu sepeti göster
    emptyOrderCart.classList.remove('d-block');
    emptyOrderCart.classList.add('d-none'); // boş sepeti gizle
  }
}

function deleteProducts() {
  let productIndex = -1; //eğer index numarası yoksa -1 döner çünkü

  for (let i = 0; i < orders.length; i++) { // silmek istenilen ürünün index'i için orders içerisinde dönüyoruz
    if (orders[i].name == this.dataset.name) { // dataset ile silinecek olan ürünü bulundu
      // sepetteki ürünün adı ile tıklanan ürünün adı eşit mi?
      productIndex = i; // eşitse index productIndex değişkenine atanır, silinecek doğru ürünün hangi sırada olduğu bulunur
    }
  }

  orders.splice(productIndex, 1); // ürün hem diziden hem de DOM'dan kaldırılır
  this.parentElement.remove(); //this deleteBtn'dir ve parent elementi listedeki her bir ürünün (li) tamamıdır
  renderOrders(); // renderOrders yeniden çağrılarak sepet güncellenir, toplam fiyat ve miktar yeniden oluşturulur
}