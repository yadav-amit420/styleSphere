let cartHTML = document.querySelector('.listCart');
const addCartToHTML = () => {
    cartHTML.innerHTML = '';
    let totalCartAmount = 0;
    if(carts.length > 0){
         console.log(carts)
        carts.forEach(cart => {
            let newCart = document.createElement('tr');
            newCart.classList.add('item');
            let positionProduct = products.findIndex((value) => value.id == cart.product_id);
            let info = products[positionProduct]
            let totalAmount = cart.quantity*info.price;
            totalCartAmount += totalAmount;
            newCart.dataset.id = cart.product_id;
            newCart.innerHTML= `
                <i class="fa-solid fa-circle-xmark remove"></i>
                <td class="image"><img src="${info.mainImage}" alt=""></td>
                <td class="name">${info.name}</td>
                <td class="price">$${info.price}</td>
                <td class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                </td>
                <td class="totalPrice">$${totalAmount}</td> 
            `;
        cartHTML.appendChild(newCart);
        })
    }
    //CART VALUE AND SHIPPPING CHARGES
    const subTotal = document.querySelector('.subtotal');
    const shippingCostElement = document.querySelector('.shipping-cost');
    const total = document.querySelector('.totalAmount');

    if (carts.length === 0) {
        subTotal.textContent = ''; 
        shippingCostElement.textContent = '';
        total.textContent = '';  
    } else {
        subTotal.textContent = `$${totalCartAmount.toFixed(2)}`;

        const shippingCost = totalCartAmount > 500 ? 0 : 49; 
        if (shippingCost === 0) {
            shippingCostElement.textContent = 'Free';
        } else {
            shippingCostElement.textContent = `$${shippingCost}`; 
        }

        const totalWithShipping = totalCartAmount + shippingCost; 
        total.innerHTML = `<strong>$${totalWithShipping.toFixed(2)}</strong>`;
    } 
 
}

if (window.location.pathname === '/styleSphere/cart.html') {
    addCartToHTML();
}

//REMOVE from CART by REMOVE ICON
cartHTML.addEventListener('click', (event) => {
let positionClicked = event.target;
if((positionClicked.classList.contains('remove') || positionClicked.classList.contains('minus') || positionClicked.classList.contains('plus'))) {
    let product_id = positionClicked.parentElement.dataset.id;
    let p_id = positionClicked.parentElement.parentElement.dataset.id;
    let type = '';
    if(positionClicked.classList.contains('plus')){
        type = 'plus';
    } else if (positionClicked.classList.contains('minus')) {
        type = 'minus'
    } else{
        removeFromCart(product_id);
    }
    changeQuantityCart(p_id, type);
}

});

//To Plus Minus the quntity
const changeQuantityCart = (p_id, type) => {
let positionItemInCart = carts.findIndex((value) => value.product_id == p_id);
if(positionItemInCart >= 0){
    let info = carts[positionItemInCart];
    switch (type) {
        case 'plus':
            carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
            break;
    
        default:
            let changeQuantity = carts[positionItemInCart].quantity - 1;
            if (changeQuantity > 0) {
                carts[positionItemInCart].quantity = changeQuantity;
            }else{
                carts.splice(positionItemInCart, 1);
            }
            break;
        }
        addCartToHTML();
        localStorage.setItem('carts', JSON.stringify(carts));
        
    }
};


//TO completely remove the product
const removeFromCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionThisProductInCart !== -1) {
        carts.splice(positionThisProductInCart, 1); 
    }
    addCartToHTML();
    localStorage.setItem('carts', JSON.stringify(carts));
};
            
