// REGISTRATION PAGE SCRIPTS and LOGIN PAGE SCRIPT

//Registration Page Script
function register(event)
{
    event.preventDefault();

    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();  
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0))
    {
    // Checks if the birth month is after the current month (i.e., the birthday is later in the year)
    // OR if the birth month is the same as the current month but the birth day is later in the month
        age--;
    }

    if (age <18)
    {
        alert("You must be 18 or older to register");
        document.getElementById('dob').value =" "; //clear input
        return; //exits if the user is below 18
    }

    const trn = document.getElementById("trn").value;

    if (!isUniqueTRN(trn))
    {
        alert("This TRN is already registered!");
        return;
    }
    

    const RegistrationData =
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

    let existingData = JSON.parse(localStorage.getItem('RegistrationData')) || [];

    existingData.push(RegistrationData);

    localStorage.setItem('RegistrationData',JSON.stringify(existingData));

    alert("Registration Successful");

    window.location.href = "index.html"; //brings user to the login(index) page if successful
}

function isUniqueTRN(trn) {
    let existingData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    
    // Check if any registration has the same TRN
     for (let i = 0; i < existingData.length; i++) {
        if (existingData[i].trn === trn) {
            return false; // TRN is not unique, found a match
        }
        
    }
    // If no match was found, the TRN is unique
    return true;
}


let count= 0; 

function login(event)
{
    event.preventDefault();
    let existingData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
        
    const enterTRN = document.getElementById('trn').value.trim();
    const enterP = document.getElementById('pass').value.trim();
    

    let isUser = false;
    let loggedUser = null;

    for (let i = 0; i < existingData.length; i++)
         {

            if(existingData[i].trn === enterTRN && existingData[i].password === enterP)
            {
                isUser = true;
                loggedUser = existingData[i];
                break;                
            }
         }

            if(isUser)
            {
                localStorage.setItem('CurrentUser', JSON.stringify(loggedUser)); 
                alert("Login successful!");
                window.location.href = "../HTML/products.html";
            }
            else
            {
                count++;
                alert("Invalid TRN or password. You have "+ (3- (count))+ " attempts left");
                
            }        

            if(count>= 3)
            {
                window.location.href= "../HTML/error.html";
            }
        
}

function resetRegistrationData()
{
    if (confirm("This action will delete ALL Registration Data from your device's local storage. Do you wish to continue?"))
    {    
        localStorage.removeItem("RegistrationData");
        alert("Registration data has been reset!");
    }
}


function resetForm() {
    if (confirm("Are you sure you want to clear the form?")) {
        document.getElementById("registrationForm").reset();
    }
}


//LOGIN Script

function resetLoginForm()
{
    if (confirm("Are you sure you want to clear the form?")) {
        document.getElementById("loginForm").reset();
    }
}

function resetPassword()
{
    const enterTRN = document.getElementById('trn').value.trim();
    let existingData = JSON.parse(localStorage.getItem('RegistrationData')) || [];

    if (!enterTRN) {
        alert("Please enter your TRN before resetting your password.");
        return; // Exit the function early
    }

    let userReset = null;
   
    // Find the user with the matching TRN
    for (let i = 0; i < existingData.length; i++) {
        if (existingData[i].trn === enterTRN) {
            userReset = existingData[i];
            break; // Stop the loop once we find the user
        }
    }

    // If the user is found, allow them to reset their password
    if(userReset)
    {
        const newPassword = prompt("Enter a new password for your account");

        if (newPassword)
        {
             // Update the password directly
            userReset.password = newPassword;

            // Update the user in the existingData array
            for (let i = 0; i < existingData.length; i++) {
                if (existingData[i].trn === enterTRN) {
                    existingData[i] = userReset; // Replace the old user object with the updated one
                    break; // Exit the loop once the user is updated
                }
            }
             // Save the updated data back to localStorage
            localStorage.setItem('RegistrationData', JSON.stringify(existingData));

            alert("Your password has been reset successfully!");
        }
        }
        else
        {
            alert("The TRN you entered is not registered.");
        }
    }





