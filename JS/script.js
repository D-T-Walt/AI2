//Open Sidebar
function openNav(){
    document.getElementById("mySidebar").style.width= "250px";
}
 
//Close Sidebar
function closeNav(){
    document.getElementById("mySidebar").style.width= "0"; 
}


//Stop users from going to the products page without login
function allow(event){
    event.preventDefault();
    alert("NOT ALLOWED TO DO THIS ACTION WITHOUT LOG IN");
}

//Warn users about leaving the current page to go to the home page
function goHome(event){
    event.preventDefault();
    var ans= confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART");

    if (ans=== true){
        window.location.href= "../HTML/index.html";
    }
}

//Warn users about leaving the current page to go to the login on the  home page
function goHomeLog(event){
    event.preventDefault();
    var ans= confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART");

    if (ans=== true){
        window.location.href= "../HTML/index.html#log";
    }
}

//Warn users about leaving the current page to go to the mission statement on the  home page
function goHomeMiss(event){
    event.preventDefault();
    var ans= confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART");

    if (ans=== true){
        window.location.href= "../HTML/index.html#miss";
    }
}

//Warn users about leaving the current page to go to the vision statement on the  home page
function goHomeVis(event){
    event.preventDefault();
    var ans= confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART");

    if (ans=== true){
        window.location.href= "../HTML/index.html#vis";
    }
}

//Warn users about leaving the current page to go to the about us page
function goAbout(event){
    event.preventDefault();
    var ans= confirm("You are leaving this page?\nONCE YOU LEAVE THIS PAGE YOU HAVE TO LOGIN AGAIN AND REPOPULATE YOUR CART");

    if (ans=== true){
        window.location.href= "../HTML/about.html";
    }
}

//


//Function to display the invoice
function displayInvoice(){

    // Retrieve the trn from localStorage


    // Retrieve the shipping address from localStorage

    //update the invoice header with dynamic data like company name, date, etc.
    const invoiceDate = new Date().toLocaleDateString();
    const invoiceNumber = 'INV-' + Math.floor(Math.random() * 1000000);
    
    document.getElementById('invoice-date').textContent = invoiceDate;
    document.getElementById('invoice-number').textContent = invoiceNumber;
    document.getElementById('trn').textContent = "123-456-789"; //Get from Javy's Registration local storage
    document.getElementById('shipping-info').textContent = "John Doe, 123 Street Name, City"; //Get from olivia's checkout local storage

    // Retrieve the cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('Cart')) || [];

    // Retrieve the subtotal, tax, discount, and total from localStorage
    const subtotal = parseFloat(localStorage.getItem('Subtotal')) || 0;
    const tax = parseFloat(localStorage.getItem('Tax')) || 0;
    const discount = parseFloat(localStorage.getItem('Discount')) || 0;
    const total = parseFloat(localStorage.getItem('Total')) || 0;

    //Insert invoice items into the HTML
    const invoiceItemsContainer= document.getElementById('invoice-items');
    invoiceItemsContainer.innerHTML= ''; //Clear existing items 

    cart.forEach(item => {

        let dis= 0.0;

        if(item.quantity> 5){
            dis= (item.price * item.quantity)* 0.1;
        }

        const rowHTML = `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>$${dis.toFixed(2)}</td>
                <td>$${((item.price * item.quantity)* 0.16).toFixed(2)}</td>
                <td>$${(((item.price * item.quantity)- dis)+ ((item.price * item.quantity)* 0.16)).toFixed(2)}</td>
            </tr>
        `;
        document.getElementById('invoice-items').innerHTML += rowHTML; // Append each item row
    });

    //Update subtotal, tax, and total in the HTML
    document.getElementById('invoice-subtotal').textContent= `$${subtotal.toFixed(2)}`;
    document.getElementById('invoice-tax').textContent= `$${tax.toFixed(2)}`;
    document.getElementById('invoice-total').textContent= `$${total.toFixed(2)}`;

    // Add event listeners for cancel and exit buttons
    document.getElementById('cancel').addEventListener('click', cancelInvoice);
    document.getElementById('exit3').addEventListener('click', exitInvoice);

    // Create an invoice object to be added to the user's invoices array
        //waitn on javy an livi's local storage functionality first
    
    // Retrieve existing invoices from localStorage or initialize an empty array

    // Add the new invoice to the array

    // Store the updated invoices array back to localStorage
}

//Function to cancel invoice
function cancelInvoice(){
    if (confirm("Are you sure you want to cancel this invoice?")){
        localStorage.removeItem('productNames');
        localStorage.removeItem('productPrices');
        localStorage.removeItem('productQuantities');

        window.location.href= '../HTML/cart.html'; 
    }
}

//Function to exit invoice
function exitInvoice(){
    if (confirm("Are you sure you want to exit?")){
        localStorage.removeItem('productNames');
        localStorage.removeItem('productPrices');
        localStorage.removeItem('productQuantities');

        window.location.href= '../HTML/index.html'; 
    }
}

//Load the invoice when the page is loaded
document.addEventListener('DOMContentLoaded', function (){
    if (window.location.pathname.includes('invoice.html')){
        displayInvoice();
    }
});





