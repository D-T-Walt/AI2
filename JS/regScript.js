// REGISTRATION PAGE SCRIPTS
//soon comment when finished
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
        cart:[],
        invoice: []
    }

    let existingData = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    existingData.push(RegistrationData);

    localStorage.setItem("RegistrationData",JSON.stringify(existingData));

    alert("Registration Successful");

    window.location.href = "index.html"; //brings user to the login(index) page if successful
}

function isUniqueTRN(trn) {
    let existingData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    
    // Check if any registration has the same TRN
     for (let i = 0; i < existingData.length; i++) {
        if (existingData[i].trn === trn) {
            return false; // TRN is not unique, found a match
        }
        
    }
    // If no match was found, the TRN is unique
    return true;
}

function resetForm() {
    if (confirm("Are you sure you want to clear the form?")) {
        document.getElementById("registrationForm").reset();
    }
}


//LOGIN Script

const sampleTRN= "123-123-123";
            const samplePass= "P@$$word";

            let count= 0; 

            function login(event){
                event.preventDefault();
                const enterU= document.getElementById('user').value;
                const enterP= document.getElementById('pass').value;

                if(enterU=== sampleUser && enterP=== samplePass){
                    window.location.href= "../HTML/products.html";
                }
                else{
                    alert("Invalid username or password. You have "+ (3- (count+1))+ " attempts left");
                    count++;
                }

                if(count>= 3){
                    window.location.href= "../HTML/error.html";
                }
            }


