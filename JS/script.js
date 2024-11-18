/*
Javone - Anthony Gordon – 2206126
Kemone Laws – 2109446
Olivia McFarlane – 2301555
Diwani Walters – 2303848  
*/
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

//5.a - Generate Invoice
//Function to display the invoice
function displayInvoice(){
    
    //Retrieve registration data from localStorage
    const registrationData= JSON.parse(localStorage.getItem("RegistrationData")) || [];
    const loggedUser= JSON.parse(localStorage.getItem("CurrentUser")); //Get the currently logged-in user's data from localStorage
    const userIndex= registrationData.findIndex(user=> user.trn=== loggedUser.trn);

    // Retrieve user and cart data
    const user= registrationData[userIndex];
    const cart= Object.values(user.cart ||{});
    
    // Retrieve individual shipping data fields from localStorage
    const name= JSON.parse(localStorage.getItem('name')) || "N/A";
    const address= JSON.parse(localStorage.getItem('address')) || "N/A";
    const amountPaid= JSON.parse(localStorage.getItem('amount-paid')) || 0;

    //Generate unique invoice number and invoice date
    const invoiceDate= new Date().toLocaleDateString();
    const invoiceNumber= 'INV-' + Math.floor(Math.random() * 1000000);

    //Checking to ensure invoice number is unique 
    function isUniqueInvNum(invoiceNumber){
        // Retrieve existing invoices from localStorage
        let existingInvoices= JSON.parse(localStorage.getItem('AllInvoices')) || [];
        
        // Check if the invoice number already exists
        for (let i= 0; i < existingInvoices.length; i++){
            if (existingInvoices[i].invoiceNumber=== invoiceNumber){
                return false; // Invoice number is not unique
            }
        }
        // If no match was found, the invoice number is unique
        return true;
    }

    while (!isUniqueInvNum(invoiceNumber)){
        invoiceNumber= 'INV-' + Math.floor(Math.random() * 1000000);
    }

    
    //update invoice header
    document.getElementById('invoice-date').textContent= invoiceDate;
    document.getElementById('invoice-number').textContent= invoiceNumber;
    document.getElementById("trn").textContent= loggedUser.trn;
    document.getElementById('shipping-info').innerHTML= `
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Amount Paid:</strong> $${amountPaid.toFixed(2)}</p>
    `;
    
    // Retrieve the subtotal, tax, discount, and total from localStorage
    const subtotal= parseFloat(localStorage.getItem('Subtotal'));
    const tax= parseFloat(localStorage.getItem('Tax'));
    const discount= parseFloat(localStorage.getItem('Discount'));
    const total= parseFloat(localStorage.getItem('Total')); 

    //Insert invoice items into the HTML
    const invoiceItemsContainer= document.getElementById('invoice-items');
    invoiceItemsContainer.innerHTML= ''; //Clear existing items 

    cart.forEach(item=>{

        let dis= 0.0;

        if(item.quantity> 5){
            dis= (item.price * item.quantity)* 0.1;
        }

        const rowHTML= `
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
    document.getElementById('exit3').addEventListener('click', exitInvoice);

    //5.b - APPEND INVOICE TO THE USER'S ARRAY OF INVOICES(ARRAY OF ABJECTS)
    //Retrieve the existing invoices array from the logged-in user's data
    let userInvoices= JSON.parse(localStorage.getItem('AllInvoices')) || [];  
    const current= registrationData[userIndex];
    const userInvoice= Object.values(current.invoice || []);

    // Create the new invoice object with all relevant details
    const newInvoice={
        invoiceNumber: invoiceNumber,  
        invoiceDate: invoiceDate,  
        shippingInfo:{
            name: name,  
            address: address,  
            contact: amountPaid  
        },
        
        trn: loggedUser.trn,  
        items: cart.map(item=> ({
            name: item.name,   
            quantity: item.quantity,   
            price: item.price,   
            discount: item.discount || 0   
        })),
        taxes: tax,  
        subtotal: subtotal,  
        totalAmount: total,  
    };

    // Append the new invoice to the existing invoices
    userInvoices.push(newInvoice);
    userInvoice.push(newInvoice); //Appends the new invoice into the current users invoices

     //Store the invoice in the current users local storage invoice
    registrationData[userIndex].invoice= userInvoice;
    localStorage.setItem('RegistrationData', JSON.stringify(registrationData));

    //STORE THE INVOICE TO LOCAL STORAGE WITH THE KEY CALLED ALL INVOICES (as an array of objects) to access later
    localStorage.setItem('AllInvoices', JSON.stringify(userInvoices));

}

//Function to exit invoice
function exitInvoice(){
    const registrationData= JSON.parse(localStorage.getItem('RegistrationData')) || [];
    const loggedUser= JSON.parse(localStorage.getItem('CurrentUser'));
    const userIndex= registrationData.findIndex(user=> user.trn=== loggedUser.trn);
    const userCart= registrationData[userIndex]?.cart ||{}; // Use key-value pairs for cart

    //5.c -  display a message indicating that the invoice has been “sent” to the user’s email
    if (confirm('This invoice has been sent to your email and your current cart will be cleared')){
        Object.keys(userCart).forEach(key=> delete userCart[key]);
        registrationData[userIndex].cart= userCart;
        localStorage.setItem('RegistrationData', JSON.stringify(registrationData));

        window.location.href= '../HTML/index.html';
    }
}


//Load the invoice after the page is loaded 
document.addEventListener('DOMContentLoaded', function (){
    if (window.location.pathname.includes('invoice.html')){
        displayInvoice(); 
    }
});

