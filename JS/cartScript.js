/*const registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
const loggedUser = JSON.parse(localStorage.getItem('CurrentUser'));

const userCart = registrationData.find(user => user.email === loggedUser.email)?.cart || [];

document.addEventListener('DOMContentLoaded', function (){
    const cartItemsDiv= document.getElementById('cart-items'); // Div to display cart items
    let cart= JSON.parse(localStorage.getItem('Cart')) || []; // Retrieve cart from localStorage

    function displayCart(){
        cartItemsDiv.innerHTML= ''; // Clear the cart display
        let subtotal= 0;
        let discount= 0;

        if (cart.length=== 0){
            cartItemsDiv.innerHTML= `<p>Your cart is empty.</p>`;

            localStorage.setItem('Subtotal', 0);
            localStorage.setItem('Tax', 0);
            localStorage.setItem('Discount', 0);
            localStorage.setItem('Total', 0);

            document.getElementById('subtotal').textContent= '0.00';
            document.getElementById('tax').textContent= '0.00';
            document.getElementById('discount').textContent= '0.00';
            document.getElementById('total').textContent= '0.00';
            return; // Exit if cart is empty
        }

        // Loop through cart items and display them
        cart.forEach((item, index)=>{
            const itemTotal= item.price * item.quantity;
            subtotal += itemTotal;

            if (item.quantity > 5){
                discount += itemTotal * 0.1; // Apply 10% discount if quantity > 5
            }

            // Generate HTML for each item with editable quantity and remove button
            const HTML= `
                <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; left: 0;">
                    <div class="cart-image">
                        <img src="${item.image}" alt="${item.name}" style="width: 28%; height: auto;">
                    </div>
                    <div class="item-detail">
                        <h3 style="color: #FF4500;">${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <label style="color: white;">Quantity: 
                            <input type="number" value="${item.quantity}" min="1" style="width: 50px;" onchange="updateQuantity(${index}, this.value)">
                        </label>
                        <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                        <p>Tax (16%): $${((item.price * item.quantity) * 0.16).toFixed(2)}</p>
                        <p>Discount (10%): $${item.quantity > 5 ? ((item.price * item.quantity) * 0.1).toFixed(2) : "0.00"}</p>
                        <p>Total: $${((item.price * item.quantity) + ((item.price * item.quantity) * 0.16) - (item.quantity > 5 ? (item.price * item.quantity) * 0.1 : 0)).toFixed(2)}</p>
                    </div>
                    <div class="delete-button">
                        <button class="delete" onclick="removeItem(${index})"> Delete &#x1F5D1;</button>
                    </div>
                </div>
                <hr>
            `;
            cartItemsDiv.innerHTML += HTML;
        });

        const tax= subtotal * 0.16; // Tax rate: 16%
        const total= subtotal - discount + tax;

        // Update totals in the UI
        document.getElementById('subtotal').textContent= subtotal.toFixed(2);
        document.getElementById('tax').textContent= tax.toFixed(2);
        document.getElementById('discount').textContent= discount.toFixed(2);
        document.getElementById('total').textContent= total.toFixed(2);
        
        //Save Subtotal, Tax, Discount and Total values to localStorage
        localStorage.setItem('Subtotal', subtotal);
        localStorage.setItem('Tax', tax);
        localStorage.setItem('Discount', discount);
        localStorage.setItem('Total', total);

    }

    // Function to update quantity
    window.updateQuantity= function (index, quantity){
        if (quantity < 1) return; // Prevent invalid quantity
        cart[index].quantity= parseInt(quantity, 10);
        localStorage.setItem('Cart', JSON.stringify(cart)); // Save updated cart
        displayCart(); // Re-render cart
    };

    // Function to remove item
    window.removeItem= function (index){
        cart.splice(index, 1); // Remove item from cart
        localStorage.setItem('Cart', JSON.stringify(cart)); // Save updated cart
        displayCart(); // Re-render cart
    };

    document.getElementById('check').addEventListener('click', checkoutCart);
    document.getElementById('clear').addEventListener('click', clearCart);
    document.getElementById('close').addEventListener('click', closeCart);

    displayCart(); // Initial render of the cart
});

//Buttons
function clearCart(){
    if (confirm("Are you sure you want to clear all of your cart?")){
        localStorage.removeItem('Cart');

        window.location.href= '../HTML/cart.html'; 
    }
}

function closeCart(){
        window.location.href= '../HTML/products.html';  
}

function checkoutCart(){
    window.location.href= '../HTML/checkout.html';  
}*/

/*

document.addEventListener('DOMContentLoaded', function (){
    const cartItemsDiv= document.getElementById('cart-items'); // Div to display cart items
    const registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
     const loggedUser = JSON.parse(localStorage.getItem('CurrentUser'));
     const userIndex = registrationData.findIndex(user => user.trn === loggedUser.trn);
     const userCart = registrationData[userIndex]?.cart || [];

    function displayCart(){
        cartItemsDiv.innerHTML= ''; // Clear the cart display 
        let subtotal= 0;
        let discount= 0;

        if (userCart.length=== 0){
            cartItemsDiv.innerHTML= `<p>Your cart is empty.</p>`;

            localStorage.setItem('Subtotal', 0);
            localStorage.setItem('Tax', 0);
            localStorage.setItem('Discount', 0);
            localStorage.setItem('Total', 0);

            document.getElementById('subtotal').textContent= '0.00';
            document.getElementById('tax').textContent= '0.00';
            document.getElementById('discount').textContent= '0.00';
            document.getElementById('total').textContent= '0.00';
            return; // Exit if cart is empty
        }

        // Loop through cart items and display them
        userCart.forEach((item, index)=>{
            const itemTotal= item.price * item.quantity;
            subtotal += itemTotal;

            if (item.quantity > 5){
                discount += itemTotal * 0.1; // Apply 10% discount if quantity > 5
            }

            // Generate HTML for each item with editable quantity and remove button
            const HTML= `
                <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; left: 0;">
                    <div class="cart-image">
                        <img src="${item.image}" alt="${item.name}" style="width: 28%; height: auto;">
                    </div>
                    <div class="item-detail">
                        <h3 style="color: #FF4500;">${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <label style="color: white;">Quantity: 
                            <input type="number" value="${item.quantity}" min="1" style="width: 50px;" onchange="updateQuantity(${index}, this.value)">
                        </label>
                        <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                        <p>Tax (16%): $${((item.price * item.quantity) * 0.16).toFixed(2)}</p>
                        <p>Discount (10%): $${item.quantity > 5 ? ((item.price * item.quantity) * 0.1).toFixed(2) : "0.00"}</p>
                        <p>Total: $${((item.price * item.quantity) + ((item.price * item.quantity) * 0.16) - (item.quantity > 5 ? (item.price * item.quantity) * 0.1 : 0)).toFixed(2)}</p>
                    </div>
                    <div class="delete-button">
                        <button class="delete" onclick="removeItem(${index})"> Delete &#x1F5D1;</button>
                    </div>
                </div>
                <hr>
            `;
            cartItemsDiv.innerHTML += HTML;
        });

        const tax= subtotal * 0.16; // Tax rate: 16%
        const total= subtotal - discount + tax;

        // Update totals in the UI
        document.getElementById('subtotal').textContent= subtotal.toFixed(2);
        document.getElementById('tax').textContent= tax.toFixed(2);
        document.getElementById('discount').textContent= discount.toFixed(2);
        document.getElementById('total').textContent= total.toFixed(2);
        
        //Save Subtotal, Tax, Discount and Total values to localStorage
        localStorage.setItem('Subtotal', subtotal);
        localStorage.setItem('Tax', tax);
        localStorage.setItem('Discount', discount);
        localStorage.setItem('Total', total);

    }

    // Function to update quantity
    window.updateQuantity= function (index, quantity){
        if (quantity < 1) return; // Prevent invalid quantity
        userCart[index].quantity= parseInt(quantity, 10);

        registrationData[userIndex].cart = userCart;

        localStorage.setItem('RegistrationData', JSON.stringify(registrationData)); // Save updated cart
        displayCart(); // Re-render cart
    };

    // Function to remove item
    window.removeItem= function (index){
        userCart.splice(index, 1); // Remove item from cart

        registrationData[userIndex].cart = userCart;

        localStorage.setItem('RegistrationData', JSON.stringify(registrationData)); // Save updated cart
        displayCart(); // Re-render cart
    };

    document.getElementById('check').addEventListener('click', checkoutCart);
    document.getElementById('clear').addEventListener('click', clearCart);
    document.getElementById('close').addEventListener('click', closeCart);

    displayCart(); // Initial render of the cart
});


//Buttons
function clearCart(){
    if (confirm("Are you sure you want to clear all of your cart?")){
        const userIndex = registrationData.findIndex(user => user.trn === loggedUser.trn);
        registrationData[userIndex].cart = [];
        
        localStorage.setItem('RegistrationData', JSON.stringify(registrationData));

        window.location.href= '../HTML/cart.html'; 
    }
}

function closeCart(){
        window.location.href= '../HTML/products.html';  
}

function checkoutCart(){
    window.location.href= '../HTML/checkout.html';  
}

*/

document.addEventListener('DOMContentLoaded', function () {
    const registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    const loggedUser = JSON.parse(localStorage.getItem('CurrentUser'));
    const userIndex = registrationData.findIndex(user => user.trn === loggedUser.trn);
    const userCart = registrationData[userIndex]?.cart || {}; // Use key-value pairs for cart
    const cartItemsDiv = document.getElementById('cart-items'); // Div to display cart items

    // Display Cart
    function displayCart() {
        cartItemsDiv.innerHTML = ''; // Clear the cart display
        let subtotal = 0;
        let discount = 0;

        if (Object.keys(userCart).length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            updateTotals(0, 0, 0, 0);
            return;
        }

        Object.values(userCart).forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            if (item.quantity > 5) {
                discount += itemTotal * 0.1; // Apply 10% discount if quantity > 5
            }

            const tax = itemTotal * 0.16; // Tax rate: 16%
            const total = itemTotal + tax - (item.quantity > 5 ? itemTotal * 0.1 : 0);

            // Generate HTML for each item
            const HTML = `
                <div class="cart-item" style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;">
                    <img src="${item.image}" alt="${item.name}" style="width: 25%; height: auto;">
                    <div class="item-detail">
                        <h3 style="color: #FF4500;">${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <label style="color: white;">Quantity: 
                            <input type="number" value="${item.quantity}" min="1" style="width: 50px;" onchange="updateQuantity('${index}', this.value)">
                        </label>
                        <p>Subtotal: $${itemTotal.toFixed(2)}</p>
                        <p>Tax: $${tax.toFixed(2)}</p>
                        <p>Discount: $${(item.quantity > 5 ? itemTotal * 0.1 : 0).toFixed(2)}</p>
                        <p>Total: $${total.toFixed(2)}</p>
                    </div class="delete-button">
                    <button class="delete" onclick="removeItem('${index}')"> Delete &#x1F5D1;</button>
                </div>
                <hr>
            `;
            cartItemsDiv.innerHTML += HTML;
        });

        const tax = subtotal * 0.16;
        const total = subtotal - discount + tax;
        updateTotals(subtotal, tax, discount, total);
    }

    // Update Totals
    function updateTotals(subtotal, tax, discount, total) {
        document.getElementById('subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('tax').textContent = tax.toFixed(2);
        document.getElementById('discount').textContent = discount.toFixed(2);
        document.getElementById('total').textContent = total.toFixed(2);

        // Save to localStorage
        localStorage.setItem('Subtotal', subtotal);
        localStorage.setItem('Tax', tax);
        localStorage.setItem('Discount', discount);
        localStorage.setItem('Total', total);
    }

    // Update Quantity
    window.updateQuantity = function (index, quantity) {
        if (quantity < 1) return; // Prevent invalid quantity
        const productKeys = Object.keys(userCart);
        const productKey = productKeys[index];
        userCart[productKey].quantity = parseInt(quantity, 10);

        // Update RegistrationData
        registrationData[userIndex].cart = userCart;
        localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
        displayCart(); // Re-render cart
    };

    // Remove Item
    window.removeItem = function (index) {
        const productKeys = Object.keys(userCart);
        delete userCart[productKeys[index]]; // Remove item by key

        // Update RegistrationData
        registrationData[userIndex].cart = userCart;
        localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
        displayCart(); // Re-render cart
    };

    // Clear Cart
    document.getElementById('clear')?.addEventListener('click', function () {
        if (confirm('Clear all items from the cart?')) {
            Object.keys(userCart).forEach(key => delete userCart[key]);
            registrationData[userIndex].cart = userCart;
            localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
            displayCart();
        }
    });

    // Close Cart
    document.getElementById('close')?.addEventListener('click', () => window.location.href = '../HTML/products.html');

    // Checkout
    document.getElementById('check')?.addEventListener('click', () => window.location.href = '../HTML/checkout.html');

    // Initial Render
    displayCart();
});


