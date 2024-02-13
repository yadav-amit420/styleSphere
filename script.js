function toggleMenu(){
    const bar = document.querySelector("#close");
    const nav = document.querySelector("#navbar");
    // const cartIcon = document.querySelectorAll("cart");
    // cartIcon.classList.toggle("aCart");
    bar.classList.toggle("active");
    nav.classList.toggle("active");

}

//Fetured Product
let fProHTML = document.querySelector('.featured-product');
let fPro = JSON.parse(localStorage.getItem('fPro')) || [];

let newArHTML = document.querySelector('.new-arrival');
let newAr = JSON.parse(localStorage.getItem('newAr')) || [];

let shopHTML = document.querySelector('.shop');
let products = JSON.parse(localStorage.getItem('products')) || [];

let carts = JSON.parse(localStorage.getItem('carts')) || [];



const addFeaturedProductHTML = () => {
    fProHTML.innerHTML = '';
    if(fPro.length > 0){
        fPro.forEach(pd => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product');
            newProduct.dataset.id = pd.id;
            newProduct.innerHTML =  `
            <div class="pro-info">
                <a href="/productDetails.html?id=${pd.id}">
                    <img src="${pd.mainImage}">
                </a>
                <span>Zara</span>
                <h5>${pd.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4 class="price">$${pd.price}</h4>
            </div>
            <i class="fa-solid fa-cart-plus cart addCart"></i>
            `;
            fProHTML.appendChild(newProduct);
        });
    }
}

//new Arrival


const addNewArrivalHTML = () => {
    newArHTML.innerHTML = '';
    if(newAr.length > 0){
        newAr.forEach(pd => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product');
            newProduct.dataset.id = pd.id;
            newProduct.innerHTML =  `
            <div class="pro-info">
                <a href="/productDetails.html?id=${pd.id}">
                    <img src="${pd.mainImage}">
                </a>
                <span>Zara</span>
                <h5>${pd.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4 class="price">$${pd.price}</h4>
            </div>
            <i class="fa-solid fa-cart-plus cart addCart"></i>
            `;
            newArHTML.appendChild(newProduct);
        });
    }
}

//SHOP HTML 


const addShopHTML = () => {
    shopHTML.innerHTML = ''
    if(products.length){
        products.forEach(pd => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product');
            newProduct.dataset.id = pd.id;
            newProduct.innerHTML =  `
            <div class="pro-info">
                <a href="/productDetails.html?id=${pd.id}">
                    <img src="${pd.mainImage}">
                </a>
                <span>Zara</span>
                <h5>${pd.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4 class="price">$${pd.price}</h4>
            </div>
            <i class="fa-solid fa-cart-plus cart addCart"></i>
            `;
            shopHTML.appendChild(newProduct);
        });
    }
}

//CART button Event Listner
let productContainer = document.querySelectorAll('.product-container');
productContainer.forEach(button => {
    button.addEventListener('click', (event) => {
    let positionClicked = event.target;

    if (positionClicked.classList.contains('cart')) {
        let product_id = positionClicked.parentElement.dataset.id;
        addToCart(product_id);
        }
    });
});


const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id)
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]  
    }else if(positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1; 
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    console.log(carts);
}

//PRODUCT DETAILS, have called this function in productDetails.html internal script

const showDetail = () => {
    let detail = document.querySelector('#prodetails');
    let subImg = document.querySelector('.small-img-group');
    let productId = new URLSearchParams(window.location.search).get('id');
    console.log(productId);
    let thisProduct = products.find(product => product.id == productId);

    if (!thisProduct) {
        window.location.href = "/";
    }

    detail.querySelector('.single-pro-image img').src = thisProduct.mainImage;
    detail.querySelector('.name').innerHTML = thisProduct.name;
    detail.querySelector('.price').innerHTML = '$' + thisProduct.price;
    detail.querySelector('.description').innerHTML = thisProduct.description;

    subImg.querySelector('.small-img-col-0 img').src = thisProduct.subImages[0];
    subImg.querySelector('.small-img-col-1 img').src = thisProduct.subImages[1];
    subImg.querySelector('.small-img-col-2 img').src = thisProduct.subImages[2];
    subImg.querySelector('.small-img-col-3 img').src = thisProduct.subImages[3];
}

if (window.location.pathname === '/productDetails.html') {
    showDetail();
}
//to swap sub images with main image
let bigImage = document.getElementById("bigImg");
let smallImage = document.getElementsByClassName("small-img");
function changeMainImage(event) {
    let clickedImg = event.target;
    bigImage.src = clickedImg.src;
}

for (let i = 0; i < smallImage.length; i++) {
    smallImage[i].addEventListener('click', changeMainImage);
}

//CART UPDATE AND REMOVE



const initApp = () =>{

    // Fetch and insert header
    fetch('header.html')
        .then(response => response.text())
        .then(html => document.getElementById('header-placeholder').innerHTML = html);

    // Fetch and insert footer
    fetch('footer.html')
        .then(response => response.text())
        .then(html => document.getElementById('footer-placeholder').innerHTML = html);

     // Fetch and insert Featured Products
    fetch('featuredProduct.json')
    .then(response => response.json())
    .then(data => {
        fPro = data;
        localStorage.setItem('fPro', JSON.stringify(fPro));
        addFeaturedProductHTML();
        console.log(fPro)
    });
    
    // Fetch and insert New Arrival Products
    fetch('newArrival.json')
    .then(response => response.json())
    .then(data => {
        newAr = data;
        localStorage.setItem('newAr', JSON.stringify(newAr));
        addNewArrivalHTML();
        console.log(newAr)
    });

    // script.js (Frontend)

    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => {
        products = data;
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });


}

initApp();


