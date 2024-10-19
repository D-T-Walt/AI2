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
    var ans=confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART")

    if (ans=== true){
        window.location.href= "../HTML/index.html";
    }
}

function goHomeLog(event){
    event.preventDefault();
    var ans=confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART")

    if (ans=== true){
        window.location.href= "../HTML/index.html#log";
    }
}

function goAbout(event){
    event.preventDefault();
    var ans=confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART")

    if (ans=== true){
        window.location.href= "../HTML/about.html";
    }
}

//Doesn't need the entire page to load to do what it needs to do
document.addEventListener('DOMContentLoaded', function (){
    const cartItems = [];
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Function to update cart UI
    function updateCart(){
        cartItemsList.innerHTML = ''; // Clear existing cart items
        let total = 0;

        cartItems.forEach(item =>{
            const li = document.createElement('li');
            li.textContent = `${item.quantity} x ${item.name}- $${(item.price * item.quantity).toFixed(2)}`;
            cartItemsList.appendChild(li);

            total += item.price * item.quantity;
        });

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

            // Check if item already exists in cart
            const existingItem = cartItems.find(item => item.name === name);
            if (existingItem){
                existingItem.quantity += quantity; // Update quantity
            } else{
                cartItems.push({ name, price, quantity });
            }

            updateCart(); // Update cart display
        });
    });

    // Checkout button functionality
    const checkoutButton = document.getElementById('checkout');
    checkoutButton.addEventListener('click', function (){
        if (cartItems.length === 0){
            alert("Your cart is empty!");
        } else{
            alert("Checkout successful! Thank you for your purchase.");
            cartItems.length = 0; // Clear cart
            updateCart(); // Update cart display
        }
    });

    // Cancel button functionality
    const cancelButton = document.getElementById('cancel');
    cancelButton.addEventListener('click', function (){
        if (confirm("Are you sure you want to clear your cart?")){
            cartItems.length = 0; // Clear cart
            updateCart(); // Update cart display
        }
    });

    // Exit button functionality
    const exitButton = document.getElementById('exit');
    exitButton.addEventListener('click', function (){
        if (confirm("Are you sure you want to exit?")){
            window.location.href = '../HTML/index.html'; // Redirect to home page
        }
    });
});
