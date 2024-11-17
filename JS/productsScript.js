const TAX_RATE = 0.16;
const DISCOUNT_THRESHOLD = 5;
const DISCOUNT_RATE = 0.1;

// Retrieve RegistrationData and logged user
const registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];
const loggedUser = JSON.parse(localStorage.getItem('CurrentUser'));

if (!loggedUser || !loggedUser.trn) {
    alert("No logged-in user found. Redirecting to login page.");
    window.location.href = "index.html";
}

// Retrieve the current user's data
const userIndex = registrationData.findIndex(user => user.trn === loggedUser.trn);
if (userIndex === -1) {
    alert("User not found in registration data. Please register or log in again.");
    window.location.href = "index.html";
}

const userCart = registrationData[userIndex]?.cart || [];

//Array of prducts objects
const allProducts= [
   {name: "Two (2) Powertrain 90 LB Adjustable Dumbbells Set with a Stand", price: 72320.76,
        description: "<p>Description: The adjustable nature of this product is good for use by lifters at all levels, from beginners to professional</p><ul><li>Brand: Powertrain</li><li>Colour: Black</li><li>Unit Weight: 180 lb (90 lb Each)</li><li>Weight Range: 12 lb- 90 lb each</li><li>Easy to use- rotate the dial to choose your required weight</li><li>Includes: 2 x 40 lb Adjustable Dumbbells, 1 x Heavy Duty Dumbbell Stand, 2 x Dumbbell holders, 1 x User Manual </li></ul><br>",
        image: "../Assets/01- Adjustable Dumbells.webp"},

   {name: "CAP OLYMPIC CAST IRON 10 LB PLATE", price: 2222.63,
        description: "<p>Description: This plate are ideal for strength training and can be used on EZ Bars and normal barbells.</p><ul><li>Brand: CAP Barbell</li><li>Colour: Grey</li><li>Unit Weight: 10 lb</li><li>Material: Solid Cast Iron</li><li>Smooth Edges</li><li>2 inches center hole</li></ul><br>",
        image: "../Assets/02- 10lb Plate.webp"},

   {name: "CAP OLYMPIC CAST IRON 25 LB PLATE", price: 5400.08 ,
        description: "<p>Description: This plate are ideal for strength training and can be used on EZ Bars and normal barbells.</p><ul><li>Brand: CAP Barbell</li><li>Colour: Grey</li><li>Unit Weight: 25 lb</li><li>Material: Solid Cast Iron</li><li>Smooth Edges</li><li>2 inches center hole</li></ul><br>",
        image: "../Assets/03- 25lb Plate.jpg"},

   {name: "CAP OLYMPIC CAST IRON 35 LB PLATE", price: 6988.81,
        description: "<p>Description: This plate are ideal for strength training and can be used on EZ Bars and normal barbells.</p><ul><li>Brand: CAP Barbell</li><li>Colour: Gris</li><li>Unit Weight: 35 lb</li><li>Material: Solid Cast Iron</li><li>Smooth Edges</li><li>2 inches center hole</li></ul><br>",
        image: "../Assets/04- 35lb Plate.jpg"},

   {name: "CAP OLYMPIC CAST IRON 45 LB PLATE", price: 8339.23,
        description: "<p>Description: This plate are ideal for strength training and can be used on EZ Bars and normal barbells.</p><ul><li>Brand: CAP Barbell</li><li>Colour: Grey</li><li>Unit Weight: 45 lb</li><li>Material: Solid Cast Iron</li><li>Smooth Edges</li><li>2 inches center hole</li></ul><br>",
        image: "../Assets/05- 45lb Plate.jpg"},

   {name: "Stainless EZ Curl Gym Bar", price: 11250.54,
        description: "<p>Description: This meticulously forged Stainless EZ Curl Gym Bar guarantees robustness and dependability during rigorous workouts.</p><ul><li>Brand: American Barbell </li><li>Colour: Grey</li><li>Weight: 31 lb</li><li>Length: 5 feet</li><li>Material: Stainless Steel</li><li>Loadable Sleeve Length: 10.25 inches</li><li>Shaft Diameter: 1.12 inches</li><li>Distance Between Collars: 36.75</li></ul><br>",
        image: "../Assets/06- EZ Bar.webp"},

   {name: "Olympic Weightlifting Brass Bushing Barbell", price: 22083.31,
        description: "<p>Description: This plate are ideal for strength training and can be used on EZ Bars and normal barbells.</p><ul><li>Brand: CAP Barbell</li><li>Colour: Grey</li><li>Unit Weight: 45 lb</li><li>Material: Brass</li><li>Capacity: 1000 lb</li><li>Diameter: 1.9 inches</li><li>Length: 86 inches</li><li>Length Between Plate Stops: 52 inches</li> <li>15 inches rotating ends with brass bushing, knurled grip pattern</li><li>Compatible with CAP Olympic weight plates</li></ul><br>",
        image: "../Assets/07- Barbell.png"},

   {name: "6 High Density Interlocking Foam Puzzle Exercise Gym Flooring Mat", price: 3338.29,
        description: "<p>Description: These foam mats are not only comfortable when barefoot but also durable to withstand high volume workouts.</p><ul><li>Brand: CAP Barbell</li><li>Colour: Grey</li><li>Assembled Weight: 3.48 lb</li><li>Material: EVA Foam</li><li>Unit Size:<ul><li>Length: 22.3 inches</li><li>Width: 22.3 inches</li><li>Height: 0.47 inches</li></ul></li><li>Assembled Size:<ul><li>Length: 66.50 inches</li><li>Width: 45.00 inches</li><li>Height: 0.47 inches</li></ul></li><li>Non-slip Mat</li><li>Mildew-resistant and Odor-free</li></ul><br>",
        image: "../Assets/08- Gym Floor Mats.jpeg"},

   {name: "Deracy Adjustable Weight Bench", price: 35110.87,
        description: "<p>Description:  Affordable bench that has both incline and decline adjustments, as well as an angled seat adjustment for decline workouts.</p><ul><li>Brand: Deracy</li><li>Colour: Black and Red</li><li>Weight: 49 lb</li><li>Angle Adjustability:<ul><li>7 Back adjustments (including decline)</li><li>3 Seat adjustments</li></ul></li><li>Pad Length: 45 inches</li><li>Equipped with two wheels and a grab handle</li></ul><br>",
        image: "../Assets/09- Work Bench.webp"},

   {name: "DONOW Olympic Weight Bench with Squat Rack Adjustable Workout Bench for Bench Press", price: 46071.49,
        description: "<p>Description: With this squat rack with weight bench bundle, you can do deep squat training, bench press, pull up, push up, floor-to-bench planks, etc.</p><ul><li>Brand: DONOW</li><li>Colour: Black</li><li>Material: Iron</li><li>Weight: 600 lb</li><li>21 Level adjustable settings</li><li>Two weights storage posts</li></ul><br>",
        image: "../Assets/10- Squat- Bench Rack.jpg"},

   {name: "Olympic Smith Machine", price: 74511.30,
        description: "<p>Description: The Olympic Smith Machine is suitable for total body workout with the maximum safety.</p><ul><li>Brand: Panatta</li><li>Colour: Black and Red</li><li>Material: Iron</li><li>Weight: 441 lb</li><li>Capacity: 683 lb</li><li>Width: 57 inches</li><li>Length: 61 inches</li><li>Height: 98 inches</li><li>Height adjustable safety stoppers</li><li>Hooks for elastic bands.</li></ul><br>",
        image: "../Assets/11- Smith Machine.webp"},

   {name: "Functional Trainer Cable Machine with Dual 200 lb Weight Stacks", price: 379546.88,
        description: "<p>Description: Versatile functional trainer designed to elevate your fitness routine to new heights.</p><ul><li>Brand: Panatta</li><li>Colour: Black and Red</li><li>Height: 84 inches</li><li>Weight: 868 lb</li><li>Width: 60 inches</li><li>Length/ Depth: 46 inches</li><li>Max Usable Weight Per Side: 100 lb</li><li>Min Usable Weight Per Side: 5 lb</li><li>Number of Height Adjustments: 19 Slots (3.5 inches apart)</li><li>Accessories Included: hand straps, triceps rope, leg curl strap, and more.</li><li>Split Grip Pull-Up Bar</li></ul><br>",
        image: "../Assets/12- Cable Machine.webp"},
    ];

//Store locally
localStorage.setItem('AllProducts', JSON.stringify(allProducts));

// Load and display products from localStorage
document.addEventListener('DOMContentLoaded', function () {
    const list = document.getElementById('products');
    const products = JSON.parse(localStorage.getItem('AllProducts')) || []; // Retrieve all products

    // Display each product
    products.forEach((product, index) => {
        const HTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" style="margin-left: 7px;">
                <h3>${product.name}</h3>
                <div class="description">${product.description}</div>
                <p><span>$${product.price.toFixed(2)}</span></p>
                <input type="number" value="1" min="1" id="quantity-${index}">
                <button class="add-to-cart" data-index="${index}">Add to Cart</button>
            </div>
        `;
        list.innerHTML += HTML;
    });

    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
     button.addEventListener('click', function () {
          const index = this.getAttribute('data-index');
          const quantity = parseInt(document.getElementById(`quantity-${index}`).value);
          const selectedProduct = products[index];

          // Check if the product already exists in the user's cart
          if (userCart[selectedProduct.name]) {
              userCart[selectedProduct.name].quantity += quantity; // Update quantity
          } else {
              userCart[selectedProduct.name] = { ...selectedProduct, quantity }; // Add new product
          }

          // Update user's cart in RegistrationData
          registrationData[userIndex].cart = userCart;
          const name =registrationData[userIndex].firstName

          // Save updated RegistrationData to localStorage
          localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
          alert(`${selectedProduct.name} has been added to your cart, ${name}.`);
        });
    });
});