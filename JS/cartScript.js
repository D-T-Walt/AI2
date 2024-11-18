/*
Javone - Anthony Gordon – 2206126
Kemone Laws – 2109446
Olivia McFarlane – 2301555
Diwani Walters – 2303848  
*/

document.addEventListener('DOMContentLoaded', function (){
    const registrationData= JSON.parse(localStorage.getItem('RegistrationData')) || [];
    const loggedUser= JSON.parse(localStorage.getItem('CurrentUser'));
    const userIndex= registrationData.findIndex(user=> user.trn=== loggedUser.trn);
    const userCart= registrationData[userIndex]?.cart ||{}; // Use key-value pairs for cart
    const cartItemsDiv= document.getElementById('cart-items'); // Div to display cart items

    // Display Cart
    //3.a. Create a shopping cart page that lists the items in the cart 
    function displayCart(){
        cartItemsDiv.innerHTML= ''; // Clear the cart display
        let subtotal= 0;
        let discount= 0;

        if (Object.keys(userCart).length=== 0){
            cartItemsDiv.innerHTML= '<p>Your cart is empty.</p>';
            updateTotals(0, 0, 0, 0);
            return;
        }

        Object.values(userCart).forEach((item, index)=>{
            const itemTotal= item.price * item.quantity;
            subtotal += itemTotal;

            if (item.quantity > 5){
                discount += itemTotal * 0.1; // Apply 10% discount if quantity > 5
            }

            const tax= itemTotal * 0.16; // Tax rate: 16%
            const total= itemTotal + tax - (item.quantity > 5 ? itemTotal * 0.1 : 0);

            // Generate HTML for each item
            const HTML= `
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

        //3.c. Calculate and display the total price of the items in the cart.
        const tax= subtotal * 0.16;
        const total= subtotal - discount + tax;
        updateTotals(subtotal, tax, discount, total);
    }

    // Update Totals
    //3.c. Calculate and display the total price of the items in the cart.
    function updateTotals(subtotal, tax, discount, total){
        document.getElementById('subtotal').textContent= subtotal.toFixed(2);
        document.getElementById('tax').textContent= tax.toFixed(2);
        document.getElementById('discount').textContent= discount.toFixed(2);
        document.getElementById('total').textContent= total.toFixed(2);

        // Save to localStorage
        localStorage.setItem('Subtotal', subtotal);
        localStorage.setItem('Tax', tax);
        localStorage.setItem('Discount', discount);
        localStorage.setItem('Total', total);
    }

    // Update Quantity
    window.updateQuantity= function (index, quantity){
        if (quantity < 1) return; // Prevent invalid quantity
        const productKeys= Object.keys(userCart);
        const productKey= productKeys[index];
        userCart[productKey].quantity= parseInt(quantity, 10);

        // Update RegistrationData
        registrationData[userIndex].cart= userCart;
        localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
        displayCart(); // Re-display cart
    };

    //3.b. Allow users to remove items from the cart and update quantities.
    window.removeItem= function (index){
        const productKeys= Object.keys(userCart);
        delete userCart[productKeys[index]]; // Remove item by key

        // Update RegistrationData
        registrationData[userIndex].cart= userCart;
        localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
        displayCart(); // Re-display cart
    };

    //3.d. Clear All button (remove all items from shopping cart)
    document.getElementById('clear')?.addEventListener('click', function (){
        if (confirm('Clear all items from the cart?')){
            Object.keys(userCart).forEach(key=> delete userCart[key]);
            registrationData[userIndex].cart= userCart;
            localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
            displayCart();
        }
    });

    //3.f. Close button (close the shopping cart view) 
    document.getElementById('close')?.addEventListener('click', ()=> window.location.href= '../HTML/products.html');

    // 3.e. Check Out button (redirects to Checkout Page)
    document.getElementById('check')?.addEventListener('click', ()=> window.location.href= '../HTML/checkout.html');

    // Initial display
    displayCart();
});