/*
Javone - Anthony Gordon – 2206126
Kemone Laws – 2109446
Olivia McFarlane – 2301555
Diwani Walters – 2303848  
*/
//REGISTRATION PAGE SCRIPTS and LOGIN PAGE SCRIPT
//Registration Page Script
//1.a.vii. Register (used to stored registration form data) 
function register(event)
{
    event.preventDefault();

    //1.a.iv. Calculate and validate the age of the person trying to register
    const dob= new Date(document.getElementById('dob').value);
    const today= new Date();
    
    let age= today.getFullYear() - dob.getFullYear();

   // Adjust age if the birthday hasn't occurred yet this year
   if   (
    // Check if the current month is earlier than the birth month
    today.getMonth() < dob.getMonth() || 
    // If the current month is the same as the birth month, check if today's date is earlier than the birth date
    (today.getMonth()=== dob.getMonth() && today.getDate() < dob.getDate())
        ){ // If either of the above are met, it means the birthday hasn't occurred yet this year, so age is reduced by 1
        age--;
      }

    if (age <18){
        alert("You must be 18 or older to register");
        document.getElementById('dob').value=" "; //clear input
        return;
    }

    //1.a.v. Check to see if the entered trn is unique
    const trn= document.getElementById("trn").value;

    //Checks the result of the unique trn function to see if the trn is already exist in the already existing registration
    if (!isUniqueTRN(trn)){
        
        alert("This TRN is already registered!");
        return;
    }
    
    //1.a.vi. Store registration information
    //Assign the the entered dat into an object, RegistrationData
    const RegistrationData=
   {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        trn: document.getElementById("trn").value,
        password: document.getElementById("pass").value,
        registerDate: new Date(),
        cart:{},
        invoice: []
    }

    let existingData= JSON.parse(localStorage.getItem('RegistrationData')) || []; //Assigns the current collection of RegistrationData (array of objects) to existingData
    existingData.push(RegistrationData); //The content of RegistrationData is pushed into the array of objects that was assigned to existingData
    localStorage.setItem('RegistrationData',JSON.stringify(existingData)); //The updated existingData is then assigned to the localstorage of RegistrationData
    alert("Registration Successful"); 

    window.location.href= "index.html"; //brings user to the login(index) page if successful
}

//1.a.v. Function to check to see if the entered trn is unique compared to the already existing TRNs in the saved data
function isUniqueTRN(trn){
    let existingData= JSON.parse(localStorage.getItem('RegistrationData')) || [];
    
    // Check if any registration has the same TRN
    for (let i= 0; i < existingData.length; i++){
        if (existingData[i].trn=== trn){
            return false; // TRN is not unique, found a match
        } 
    }
    // If no match was found, the TRN is unique
    return true;
}

//1.b.ii. Validate this login data by checking the currently entered trn and password against data in RegistrationData
//1.b.iii. Visitor is given three (3) attempts to enter a correct trn and password. 
//1.b.iv. Login button (validate user login information)
let count= 0; 
function login(event)
{
    event.preventDefault();
    let existingData= JSON.parse(localStorage.getItem('RegistrationData')) || [];
        
    const enterTRN= document.getElementById('trn').value.trim();
    const enterP= document.getElementById('pass').value.trim();
    
    let isUser= false;
    let loggedUser= null;

    //Cycle through the existing data to find if the entered trn is there
    for (let i= 0; i < existingData.length; i++){
            //If the entered TRN and password is in the existing data, the data that matches is stored in loggedUser
            if(existingData[i].trn=== enterTRN && existingData[i].password=== enterP){
                isUser= true;
                loggedUser= existingData[i];
                break;                
            }
         }
            //If the user if found then they get redirected to the products page otherwise they lose an attempt at logging in
            if(isUser){
                localStorage.setItem('CurrentUser', JSON.stringify(loggedUser)); 
                alert("Login successful!");
                window.location.href= "../HTML/products.html";
            }
            else{
                count++;
                alert("Invalid TRN or password. You have "+ (3- (count))+ " attempts left");   
            }        
            
            // If they have made 3 attempts that are incorrect, they get sent to the error page
            if(count>= 3){
                window.location.href= "../HTML/error.html";
            }
        
}

//Clears all that is stored in the local storage of RegistrationData
function resetRegistrationData(){
    if (confirm("This action will delete ALL Registration Data and Invoices from your device's local storage. Do you wish to continue?")){    
        localStorage.removeItem("RegistrationData");
        localStorage.removeItem("AllInvoices");
        alert("Registration data has been reset!");
    }
}

//1.a.viii.	Cancel (used to clear data from the registration form)
function resetForm(){
    if (confirm("Are you sure you want to clear the form?")){
        document.getElementById("registrationForm").reset();
    }
}


//LOGIN Script
//1.b.v. Cancel button (used to clear data from the Login form)
function resetLoginForm(){
    if (confirm("Are you sure you want to clear the form?")){
        document.getElementById("loginForm").reset();
    }
}

//1.b.vi. Allow the user to change their password that is associated with the localStorage key called, RegistrationData by matching their trn
function resetPassword(){
    const enterTRN= document.getElementById('trn').value.trim();
    let existingData= JSON.parse(localStorage.getItem('RegistrationData')) || [];

    //Checks if a TRN is entered
    if (!enterTRN){
        alert("Please enter your TRN before resetting your password.");
        return; // Exit the function early
    }

    let userReset= null;
   
    // Find the user with the matching TRN
    for (let i= 0; i < existingData.length; i++){
        if (existingData[i].trn=== enterTRN){
            userReset= existingData[i];
            break; // Stop the loop once we find the user
        }
    }

    // If the user is found, allow them to reset their password
    if(userReset){
        const newPassword= prompt("Enter a new password for your account");

        if (newPassword){
             // Update the password directly
            userReset.password= newPassword;

            // Update the user in the existingData array
            for (let i= 0; i < existingData.length; i++){
                if (existingData[i].trn=== enterTRN){
                    existingData[i]= userReset; // Replace the old user object with the updated one
                    break; // Exit the loop once the user is updated
                }
            }
             // Save the updated data back to localStorage
            localStorage.setItem('RegistrationData', JSON.stringify(existingData));

            alert("Your password has been reset successfully!");
        }
        }
        else{
            alert("The TRN you entered is not registered.");
        }
    }