// Movie data
const movies = [
    { id: 1, name: "Movie 1", price: 20, image: "images/movie1.jpg" },
    { id: 2, name: "Movie 2", price: 30, image: "images/movie2.jpg" },
    { id: 3, name: "Movie 3", price: 25, image: "images/movie3.jpg" }
];

// Cart to store selected movies
let cart = [];

// Display movies in the catalog
function displayCatalog(filteredMovies) {
    const moviesContainer = document.querySelector('.movies');
    moviesContainer.innerHTML = ''; // Clear the container before adding new elements

    filteredMovies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <img src="${movie.image}" alt="${movie.name}">
            <h3>${movie.name}</h3>
            <p>Price: ${movie.price} BDT</p>
            <button class="btn" onclick="addToCart(${movie.id})">Add to Cart</button>
        `;
        moviesContainer.appendChild(movieDiv);
    });
}

// Add movie to the cart
function addToCart(movieId) {
    const movie = movies.find(movie => movie.id === movieId);
    if (!cart.includes(movie)) {
        cart.push(movie);
        alert(`${movie.name} has been added to your cart!`);
    } else {
        alert(`${movie.name} is already in your cart.`);
    }
    updateCart();
}

// Update cart UI
function updateCart() {
    const cartContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartContainer.innerHTML = ''; // Clear cart content
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: ${item.price} BDT</p>
                <button class="btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
            total += item.price;
        });
    }

    // Update total price
    cartTotal.textContent = `Total: ${total} BDT`;
}

// Remove movie from the cart
function removeFromCart(index) {
    const removedMovie = cart.splice(index, 1)[0];
    alert(`${removedMovie.name} has been removed from your cart.`);
    updateCart();
}

// Show a section (Catalog, Cart, Checkout)
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Open modal and show movie details (if needed)
function openModal(movie) {
    const modal = document.getElementById('movie-modal');
    document.getElementById('modal-image').src = movie.image;
    document.getElementById('modal-name').textContent = movie.name;
    document.getElementById('modal-price').textContent = `Price: ${movie.price} BDT`;
    modal.style.display = "block";
}

// Close modal
function closeModal() {
    const modal = document.getElementById('movie-modal');
    modal.style.display = "none";
}

// Filter movies based on search input
function filterMovies() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.name.toLowerCase().includes(searchTerm)
    );
    displayCatalog(filteredMovies);
}

// Initialize catalog
displayCatalog(movies);

// Attach the filterMovies function to the search input
document.getElementById('search-bar').addEventListener('input', filterMovies);

// Handle Checkout Form Submission
function handleCheckout(event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const bkash = document.getElementById('bkash').value;
    const transactionId = document.getElementById('transaction-id').value;

    // Collect the selected movies
    const movieNames = cart.map(movie => `${movie.name} (${movie.price} BDT)`).join(', ');

    // Populate the "Ordered Movies" field dynamically
    document.getElementById('movies').value = movieNames;

    // Check if the form has valid inputs
    if (!name || !email || !mobile || !bkash || !transactionId) {
        alert('Please fill out all fields.');
        return;
    }

    // Submit the form to FormSubmit
    document.getElementById('checkout-form').submit();
}

// Attach the handleCheckout function to the checkout form
document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
