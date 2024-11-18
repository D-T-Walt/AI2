document.addEventListener('DOMContentLoaded', function (){

    ShowUserFrequency();
    GetUserInvoices();
    ShowInvoices();
});

//6.a. ShowUserFrequency() – Show’s user requency based on Gender and Age 
function ShowUserFrequency(){
    const regData= JSON.parse(localStorage.getItem("RegistrationData")) || [];

    var Male= 0;
    var Female= 0;


    // Calculate gender frequencies
    regData.forEach((user)=>{
        const gender= user.gender;

        if (gender=== 'M'){
            Male++;
        } else{
            Female++;
        }
    });

    //6.a.i. show how many registered users fall under specific gender categories  
    // Display the gender data
    document.getElementById("genderFreq").innerHTML= `
        <div class="chart-item">
            <div class="chart-label">Male:</div>
            <div class="chart-bar male-bar" style="width: ${Male * 10}%">
                <span>${Male}</span>
            </div>
        </div>
        <div class="chart-item">
            <div class="chart-label">Female:</div>
            <div class="chart-bar female-bar" style="width: ${Female * 10}%">
                <span>${Female}</span>
            </div>
        </div>
    `;
    
    let range1= 0;
    let range2= 0;
    let range3= 0;
    let range4= 0;

    const today= new Date();

    // Calculate age group frequencies
    regData.forEach((user)=>{
        const dob= new Date(user.dob);
        let age= today.getFullYear() - dob.getFullYear();

        if (
            today.getMonth() < dob.getMonth() || 
            (today.getMonth()=== dob.getMonth() && today.getDate() < dob.getDate())
        ){
            age--;
        }

        if (age >= 18 && age <= 25){
            range1++;
        } else if (age >= 26 && age <= 35){
            range2++;
        } else if (age >= 36 && age <= 50){
            range3++;
        } else if (age > 50){
            range4++;
        }
    });

    //6.a.ii. show how many registered users fall under different age groups (
    // Update the age group data in the HTML
    document.getElementById("ageFreq").innerHTML= `
        <div class="chart-item">
            <div class="chart-label">18-25:</div>
            <div class="chart-bar range1-bar" style="width: ${range1 * 10}%">
                <span>${range1}</span>
            </div>
        </div>
        <div class="chart-item">
            <div class="chart-label">26-35:</div>
            <div class="chart-bar range2-bar" style="width: ${range2 * 10}%">
                <span>${range2}</span>
            </div>
        </div>
        <div class="chart-item">
            <div class="chart-label">36-50:</div>
            <div class="chart-bar range3-bar" style="width: ${range3 * 10}%">
                <span>${range3}</span>
            </div>
        </div>
        <div class="chart-item">
            <div class="chart-label">50+:</div>
            <div class="chart-bar range4-bar" style="width: ${range4 * 10}%">
                <span>${range4}</span>
            </div>
        </div>
    `;
}

//6.c. GetUserInvoices() – displays all the invoices for a user based on trn 
function GetUserInvoices(){
    // Retrieve the registration data and current user from localStorage
    const registrationData= JSON.parse(localStorage.getItem("RegistrationData")) || [];
    const loggedUser= JSON.parse(localStorage.getItem("CurrentUser")); // Get the currently logged-in user
    const userIndex= registrationData.findIndex(user=> user.trn=== loggedUser.trn);

    // If user not found, show an error message and return
    if (userIndex=== -1){
        document.getElementById('currentInvoice').innerHTML= `<p>No user found for the given TRN.</p>`;
        return;
    }

    // Retrieve the user's invoices
    const userInvoices= registrationData[userIndex]?.invoice || [];

    // Get the currentInvoice div and clear its contents
    const invoiceContainer= document.getElementById('currentInvoice');
    invoiceContainer.innerHTML= '';

    // If no invoices are found, display a message
    if (userInvoices.length=== 0){
        invoiceContainer.innerHTML= `<p>No invoices found for this user.</p>`;
        return;
    }

    // Generate HTML for each invoice and append to the container
    userInvoices.forEach(invoice=>{
        const invoiceHTML= `
            <div class="invoice">
                <h3>Invoice Number: ${invoice.invoiceNumber}</h3>
                <p><b>Date:</b> ${invoice.invoiceDate}</p>
                <p><b>TRN:</b> ${invoice.trn}</p>
                <p><b>Customer Name:</b> ${invoice.shippingInfo.name}</p>
                <p><b>Address:</b> ${invoice.shippingInfo.address}</p>
                <p><b>Contact:</b> ${invoice.shippingInfo.contact}</p>
                <h4>Items:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                                <th>Discount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoice.items.map(item=> `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.price.toFixed(2)}</td>
                                <td>$${item.discount.toFixed(2)}</td>
                                <td>$${(item.price * item.quantity - item.discount).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <p><b>Subtotal:</b> $${invoice.subtotal.toFixed(2)}</p>
                <p><b>Taxes:</b> $${invoice.taxes.toFixed(2)}</p>
                <p><b>Total Amount:</b> $${invoice.totalAmount.toFixed(2)}</p>
            </div>
            <hr>
        `;
        invoiceContainer.innerHTML += invoiceHTML; // Append each invoice to the container
    });
}

//6.b. ShowInvoices() - displays all invoices and allow the visitor to search for any of the invoices 
function ShowInvoices(){
    // Retrieve all invoices from localStorage
    const allInvoices= JSON.parse(localStorage.getItem('AllInvoices')) || [];

    // Log all invoices to the console
    if (allInvoices.length=== 0){
        console.log("No invoices found.");
        return;
    }

    console.log("All Invoices:");
    allInvoices.forEach((invoice, index)=>{
        console.log(`\nInvoice #${index + 1}`);
        console.log(`Invoice Number: ${invoice.invoiceNumber}`);
        console.log(`Date: ${invoice.invoiceDate}`);
        console.log(`TRN: ${invoice.trn}`);
        console.log(`Shipping Info:`, invoice.shippingInfo);
        console.log("Items:");
        invoice.items.forEach((item, itemIndex)=>{
            console.log(
                `  ${itemIndex + 1}. Name: ${item.name}, Quantity: ${item.quantity}, Price: $${item.price.toFixed(2)}, Discount: $${item.discount.toFixed(2)}`
            );
        });
        console.log(`Subtotal: $${invoice.subtotal.toFixed(2)}`);
        console.log(`Tax: $${invoice.taxes.toFixed(2)}`);
        console.log(`Total Amount: $${invoice.totalAmount.toFixed(2)}`);
    });

    // Search functionality for invoices by TRN
    const searchTRN= document.getElementById("acceptTrn").value.trim();

    // Clear previous search results from the UI
    const searchInvoiceDiv= document.getElementById("searchInvoice");
    searchInvoiceDiv.innerHTML= "";

    if (searchTRN){
        const filteredInvoices= allInvoices.filter(invoice=> invoice.trn=== searchTRN);

        if (filteredInvoices.length > 0){
            console.log(`\nInvoices found for TRN: ${searchTRN}`);
            filteredInvoices.forEach((invoice, index)=>{
                console.log(`\nInvoice #${index + 1}`);
                console.log(`Invoice Number: ${invoice.invoiceNumber}`);
                console.log(`Date: ${invoice.invoiceDate}`);
                console.log(`TRN: ${invoice.trn}`);
                console.log(`Shipping Info:`, invoice.shippingInfo);
                console.log("Items:");
                invoice.items.forEach((item, itemIndex)=>{
                    console.log(
                        `  ${itemIndex + 1}. Name: ${item.name}, Quantity: ${item.quantity}, Price: $${item.price.toFixed(2)}, Discount: $${item.discount.toFixed(2)}`
                    );
                });
                console.log(`Subtotal: $${invoice.subtotal.toFixed(2)}`);
                console.log(`Tax: $${invoice.taxes.toFixed(2)}`);
                console.log(`Total Amount: $${invoice.totalAmount.toFixed(2)}`);
            });
            searchInvoiceDiv.innerHTML= `<p style="color: green;">${filteredInvoices.length} invoice(s) found. Check the console for details.</p>`;
        } else{
            console.log(`No invoices found for TRN: ${searchTRN}`);
            searchInvoiceDiv.innerHTML= '<p style="color: red;">No invoices found for the entered TRN.</p>';
        }
    } else{
        searchInvoiceDiv.innerHTML= '<p style="color: #32CD32;">Please enter a TRN to search.</p>';
        console.log('No TRN entered. Please provide a TRN.');
    }
}


/*
function ShowInvoices(){
    // Retrieve all invoices from localStorage
    const allInvoices= JSON.parse(localStorage.getItem('AllInvoices')) || [];

    // Div elements for displaying invoices and search results
    const allInvoicesDiv= document.getElementById('allInvoices');
    const searchInvoiceDiv= document.getElementById('searchInvoice');

    // Clear previous content
    allInvoicesDiv.innerHTML= '';
    searchInvoiceDiv.innerHTML= '';

    // Display all invoices
    if (allInvoices.length > 0){
        allInvoices.forEach(invoice=>{
            const invoiceHTML= `
                <div class="invoice">
                    <h3>Invoice Number: ${invoice.invoiceNumber}</h3>
                    <p><b>Date:</b> ${invoice.invoiceDate}</p>
                    <p><b>Customer Name:</b> ${invoice.shippingInfo.name}</p>
                    <p><b>TRN:</b> ${invoice.trn}</p>
                    <p><b>Total:</b> $${invoice.totalAmount.toFixed(2)}</p>
                    <hr>
                </div>
            `;
            allInvoicesDiv.innerHTML += invoiceHTML;
        });
    } else{
        allInvoicesDiv.innerHTML= '<p>No invoices found.</p>';
    }

    // Search for invoice by TRN
    document.querySelector('button[onclick="showInvoices()"]').addEventListener('click', ()=>{
        const inputTrn= document.getElementById('acceptTrn').value.trim();
        if (!inputTrn){
            searchInvoiceDiv.innerHTML= '<p style="color: red;">Please enter a TRN in the format 000-000-000.</p>';
            return;
        }

        // Find invoices matching the TRN
        const filteredInvoices= allInvoices.filter(invoice=> invoice.trn=== inputTrn);

        if (filteredInvoices.length > 0){
            searchInvoiceDiv.innerHTML= '';
            filteredInvoices.forEach(invoice=>{
                const invoiceHTML= `
                    <div class="invoice">
                        <h3>Invoice Number: ${invoice.invoiceNumber}</h3>
                        <p><b>Date:</b> ${invoice.invoiceDate}</p>
                        <p><b>Customer Name:</b> ${invoice.shippingInfo.name}</p>
                        <p><b>TRN:</b> ${invoice.trn}</p>
                        <p><b>Total:</b> $${invoice.totalAmount.toFixed(2)}</p>
                        <hr>
                    </div>
                `;
                searchInvoiceDiv.innerHTML += invoiceHTML;
            });
        } else{
            searchInvoiceDiv.innerHTML= '<p style="color: red;">No invoices found for the entered TRN.</p>';
        }

        // Log the search results to the console
        console.log(`Search results for TRN ${inputTrn}:`, filteredInvoices);
    });
}
*/