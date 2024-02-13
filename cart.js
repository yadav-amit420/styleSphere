let cartHTML = document.querySelector('.listCart');
const addCartToHTML = () => {
    cartHTML.innerHTML = '';
    if(carts.length > 0){
         console.log(carts)
        carts.forEach(cart => {
            let newCart = document.createElement('tr');
            newCart.classList.add('item');
            let positionProduct = products.findIndex((value) => value.id == cart.product_id);
            let info = products[positionProduct]

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
                <td class="totalPrice">$${cart.quantity*info.price}</td> 
            `;
        cartHTML.appendChild(newCart);
        })
    }
}

addCartToHTML();

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
            
