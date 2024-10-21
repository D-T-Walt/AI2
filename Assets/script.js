// Global Arrays
const productNames = [];
const productPrices = [];
const productQuantities = [];
const TAX_RATE = 0.16;
const DISCOUNT_THRESHOLD = 5;
const DISCOUNT_RATE = 0.1;

function openNav(){
    document.getElementById("mySidebar").style.width = "250px";
}

function closeNav(){
    document.getElementById("mySidebar").style.width = "0"; 
}

function allow(event){
    event.preventDefault();
    alert("NOT ALLOWED TO DO THIS ACTION WITHOUT LOG IN");
}

function goHome(event){
    event.preventDefault();
    var ans = confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART");

    if (ans === true){
        window.location.href = "../HTML/index.html";
    }
}

function goHomeLog(event){
    event.preventDefault();
    var ans = confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART");

    if (ans === true){
        window.location.href = "../HTML/index.html#log";
    }
}

function goHomeMiss(event){
    event.preventDefault();
    var ans = confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART");

    if (ans === true){
        window.location.href = "../HTML/index.html#miss";
    }
}

function goHomeVis(event){
    event.preventDefault();
    var ans = confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART");

    if (ans === true){
        window.location.href = "../HTML/index.html#vis";
    }
}

function goAbout(event){
    event.preventDefault();
    var ans = confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART");

    if (ans === true){
        window.location.href = "../HTML/about.html";
    }
}

// Doesn't need the entire page to load to do what it needs to do
document.addEventListener('DOMContentLoaded', function (){
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Function to update cart UI
    function updateCart(){
        cartItemsList.innerHTML = ''; // Clear existing cart items
        let total = 0;

        for (let i = 0; i < productNames.length; i++){
            const li = document.createElement('li');
            const itemTotal = productPrices[i] * productQuantities[i];
            li.textContent = `${productQuantities[i]} x ${productNames[i]} - $${itemTotal.toFixed(2)}`;
            cartItemsList.appendChild(li);

            total += itemTotal;
        }

        totalPriceElement.textContent = total.toFixed(2); // Update total price
    }

    // Event listeners for add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button =>{
        button.addEventListener('click', function (){
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const quantityInput = this.previousElementSibling; // Get quantity input
            const quantity = parseInt(quantityInput.value);

            const index = productNames.indexOf(name);
            if (index !== -1){
                productQuantities[index] += quantity; // Update quantity
            } else{
                productNames.push(name);
                productPrices.push(price);
                productQuantities.push(quantity);
            }

            updateCart(); // Update cart display
        });
    });

    // Checkout button functionality
    const checkoutButton = document.getElementById('checkout');
    checkoutButton.addEventListener('click', function (){
        if (productNames.length === 0){
            alert("Your cart is empty!");
        } else{
            // Save cart data to localStorage
            localStorage.setItem('productNames', JSON.stringify(productNames));
            localStorage.setItem('productPrices', JSON.stringify(productPrices));
            localStorage.setItem('productQuantities', JSON.stringify(productQuantities));

            // Redirect to cart.html
            window.location.href = '../HTML/cart.html';
        }
    });

    // Cancel button functionality
    const cancelButton = document.getElementById('cancel');
    cancelButton.addEventListener('click', function (){
        if (confirm("Are you sure you want to clear your cart?")){
            productNames.length = 0;
            productPrices.length = 0;
            productQuantities.length = 0;
            updateCart(); // Update cart display
        }
    });

    // Exit button functionality
    const exitButton = document.getElementById('exit');
    exitButton.addEventListener('click', function (){
        if (productNames.length === 0){
            window.location.href = '../HTML/index.html'; // Redirect to home page
        }
        else
            if (confirm("Are you sure you want to exit? YOU WILL HAVE TO RELOGIN AND SELECT YOUR ITEMS AGAIN")){
                window.location.href = '../HTML/index.html'; // Redirect to home page
            } 
    });
});

// Function to display the invoice
function displayInvoice(){
    const productNames = JSON.parse(localStorage.getItem('productNames')) || [];
    const productPrices = JSON.parse(localStorage.getItem('productPrices')) || [];
    const productQuantities = JSON.parse(localStorage.getItem('productQuantities')) || [];

    let subtotal = 0;
    let discount = 0;
    let discountApplied = false;

    // Calculate subtotal and discount
    for (let i = 0; i < productNames.length; i++){
        const itemTotal = productPrices[i] * productQuantities[i];
        subtotal += itemTotal;

        if (productQuantities[i] > DISCOUNT_THRESHOLD){
            discountApplied = true;
            discount += itemTotal * DISCOUNT_RATE;
        }
    }

    const tax = subtotal * TAX_RATE;
    const total = subtotal - discount + tax;

    // Insert invoice items into the HTML
    const invoiceItemsContainer = document.getElementById('invoice-items');
    invoiceItemsContainer.innerHTML = ''; // Clear existing items

    productNames.forEach((name, index) =>{
        const itemTotal = productPrices[index] * productQuantities[index];
        const discountValue = productQuantities[index] > DISCOUNT_THRESHOLD ? (itemTotal * DISCOUNT_RATE).toFixed(2) : "0.00";
        const totalAfterDiscount = itemTotal - (productQuantities[index] > DISCOUNT_THRESHOLD ? (itemTotal * DISCOUNT_RATE) : 0).toFixed(2);

        const rowHTML = `
            <tr>
                <td>${name}</td>
                <td>${productQuantities[index]}</td>
                <td>$${productPrices[index].toFixed(2)}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td>$${discountValue}</td>
                <td>$${totalAfterDiscount.toFixed(2)}</td>
            </tr>
        `;
        invoiceItemsContainer.innerHTML += rowHTML; // Append each item row
    });

    // Update subtotal, tax, and total in the HTML
    document.getElementById('invoice-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('invoice-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('invoice-total').textContent = `$${total.toFixed(2)}`;

    document.getElementById('cancel').addEventListener('click', cancelInvoice);
    document.getElementById('exit').addEventListener('click', exitInvoice);
}

// Function to cancel invoice
function cancelInvoice(){
    if (confirm("Are you sure you want to cancel this invoice?")){
        localStorage.removeItem('productNames');
        localStorage.removeItem('productPrices');
        localStorage.removeItem('productQuantities');

        window.location.href = '../HTML/cart.html'; 
    }
}

// Function to exit invoice
function exitInvoice(){
    if (confirm("Are you sure you want to exit? YOU WILL HAVE TO RELOGIN AND SELECT ITEMS AGAIN IF THE INVOICE IS POPULATED")){
        localStorage.removeItem('productNames');
        localStorage.removeItem('productPrices');
        localStorage.removeItem('productQuantities');

        window.location.href = '../HTML/index.html'; 
    }
}

// Load the invoice when the page is loaded
document.addEventListener('DOMContentLoaded', function (){
    if (window.location.pathname.includes('cart.html')){
        displayInvoice();
    }
});
