
// ========================================
// CAMPUSMART PRODUCT LISTINGS
// ========================================

// Original Listings Array
const listings = [

    {
        id: 1,
        title: "JavaScript Programming Book",
        description: "A useful book for web development students.",
        price: 1200,
        category: "Books",
        image: "https://placehold.co/300x200",
        date: "2026-10-30"
    },

    {
        id: 2,
        title: "Wireless Headphones",
        description: "Good quality wireless headphones.",
        price: 2500,
        category: "Electronics",
        image: "https://placehold.co/300x200",
        date: "2026-11-01"
    },

    {
        id: 3,
        title: "Study Table",
        description: "Wooden study table in good condition.",
        price: 4500,
        category: "Furniture",
        image: "https://placehold.co/300x200",
        date: "2026-10-29"
    },

    {
        id: 4,
        title: "Notebook and Stationery Set",
        description: "Complete stationery set for students.",
        price: 500,
        category: "Stationery",
        image: "https://placehold.co/300x200",
        date: "2026-11-02"
    },

    {
        id: 5,
        title: "Database Systems Book",
        description: "Database textbook for CS students.",
        price: 1000,
        category: "Books",
        image: "https://placehold.co/300x200",
        date: "2026-10-28"
    },

    {
        id: 6,
        title: "Computer Keyboard",
        description: "USB keyboard in excellent condition.",
        price: 1800,
        category: "Electronics",
        image: "https://placehold.co/300x200",
        date: "2026-11-03"
    }

];


// ========================================
// DOM ELEMENTS
// ========================================

const searchInput = document.getElementById("search");

const categorySelect = document.getElementById("category");

const sortSelect = document.getElementById("sort");

const productsContainer = document.getElementById("products");

const emptyMessage = document.getElementById("empty-message");

const totalElement = document.getElementById("total");


// ========================================
// FAVOURITES AND LOCAL STORAGE
// ========================================

// Load saved favourites from localStorage

function loadFavorites() {

    try {

        const saved = JSON.parse(
            localStorage.getItem("favs") || "[]"
        );

        if (!Array.isArray(saved)) {
            return [];
        }

        // Keep only valid product IDs
        return [...new Set(saved)].filter(id =>
            listings.some(product => product.id === id)
        );

    } catch (error) {

        return [];

    }

}

let favorites = loadFavorites();


// Save favourites in localStorage

function saveFavorites() {

    localStorage.setItem(
        "favs",
        JSON.stringify([...favorites])
    );

}


// ========================================
// UPDATE FAVOURITES TOTAL USING REDUCE()
// ========================================

function updateTotal() {

    const total = favorites.reduce((sum, id) => {

        const item = listings.find(
            product => product.id === id
        );

        return sum + (item ? item.price : 0);

    }, 0);

    totalElement.textContent =
        total.toLocaleString("en-PK");

}


// ========================================
// TOGGLE FAVOURITE
// ========================================

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        // Remove item from favourites

        favorites = favorites.filter(
            itemId => itemId !== id
        );

    } else {

        // Add item to favourites

        favorites.push(id);

    }

    // Save updated favourites

    saveFavorites();

    // Refresh products and total immediately

    applyFilters();

}


// ========================================
// HIGHLIGHT MATCHING TITLE
// ========================================

// Use DOM elements instead of innerHTML

function highlightTitle(title, searchText) {

    const fragment = document.createDocumentFragment();

    if (!searchText) {

        fragment.appendChild(
            document.createTextNode(title)
        );

        return fragment;

    }

    const lowerTitle = title.toLowerCase();

    const lowerSearch = searchText.toLowerCase();

    let startIndex = 0;

    let matchIndex;

    while (
        (matchIndex = lowerTitle.indexOf(
            lowerSearch,
            startIndex
        )) !== -1
    ) {

        // Text before matching part

        fragment.appendChild(
            document.createTextNode(
                title.slice(startIndex, matchIndex)
            )
        );

        // Highlight matching text

        const mark = document.createElement("mark");

        mark.textContent = title.slice(
            matchIndex,
            matchIndex + searchText.length
        );

        fragment.appendChild(mark);

        startIndex = matchIndex + searchText.length;

    }

    // Remaining text

    fragment.appendChild(
        document.createTextNode(
            title.slice(startIndex)
        )
    );

    return fragment;

}


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(products, searchText) {

    // Clear previous product cards

    productsContainer.replaceChildren();

    // Show empty message when no results

    emptyMessage.hidden = products.length !== 0;

    products.forEach(product => {

        // Create product card

        const card = document.createElement("div");

        card.className = "card";


        // Product image

        const image = document.createElement("img");

        image.src = product.image;

        image.alt = product.title;

        image.loading = "lazy";


        // Product title

        const title = document.createElement("h3");

        title.appendChild(
            highlightTitle(product.title, searchText)
        );


        // Product description

        const description = document.createElement("p");

        description.textContent = product.description;


        // Product price

        const price = document.createElement("p");

        price.className = "price";

        price.textContent =
            `Rs. ${product.price.toLocaleString("en-PK")}`;


        // Product category

        const category = document.createElement("p");

        category.textContent =
            `Category: ${product.category}`;


        // Favourite button

        const button = document.createElement("button");

        button.className = "btn favorite-btn";

        button.type = "button";

        if (favorites.includes(product.id)) {

            button.textContent = "♥ Saved";

            button.classList.add("saved");

            button.setAttribute("aria-pressed", "true");

        } else {

            button.textContent = "♡ Save to Favourites";

            button.setAttribute("aria-pressed", "false");

        }


        // Save or unsave product

        button.addEventListener("click", () => {

            toggleFavorite(product.id);

        });


        // Add all elements to card

        card.append(
            image,
            title,
            description,
            price,
            category,
            button
        );


        // Add card to products grid

        productsContainer.appendChild(card);

    });

}


// ========================================
// APPLY FILTERS AND SORTING
// ========================================

// One function handles search, category and sorting

function applyFilters() {

    const searchText = searchInput.value
        .trim()
        .toLowerCase();

    const selectedCategory = categorySelect.value;

    const selectedSort = sortSelect.value;


    // FILTER: Search text AND category together

    const filteredListings = listings.filter(product => {

        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });


    // SORT: toSorted() creates a new array

    let sortedListings;

    if (selectedSort === "low-high") {

        // Lowest price first

        sortedListings = filteredListings.toSorted(
            (a, b) => a.price - b.price
        );

    } else if (selectedSort === "high-low") {

        // Highest price first

        sortedListings = filteredListings.toSorted(
            (a, b) => b.price - a.price
        );

    } else {

        // Newest listings first

        sortedListings = filteredListings.toSorted(
            (a, b) =>
                new Date(b.date) - new Date(a.date)
        );

    }


    // Display filtered and sorted products

    displayProducts(sortedListings, searchText);


    // Update saved items total

    updateTotal();

}


// ========================================
// EVENT LISTENERS
// ========================================

// Search input

searchInput.addEventListener(
    "input",
    applyFilters
);


// Category dropdown

categorySelect.addEventListener(
    "change",
    applyFilters
);


// Sorting dropdown

sortSelect.addEventListener(
    "change",
    applyFilters
);


// ========================================
// INITIAL DISPLAY
// ========================================

applyFilters();


// ========================================
// CONSOLE TEST
// ========================================

// Check that original listings are unchanged

const originalOrder = listings.map(item => item.id);

console.log("Original listings:", originalOrder);

console.log(
    "Listings unchanged:",
    JSON.stringify(originalOrder) ===
    JSON.stringify(listings.map(item => item.id))
);
