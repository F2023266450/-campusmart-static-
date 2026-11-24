
// ========================================
// CAMPUSMART - JAVASCRIPT ARRAY HOMEWORK
// Five Easy Array Problems
// ========================================


// Sample product prices

const prices = [1200, 2500, 500, 1800, 1000];


// ========================================
// PROBLEM 1: MAP()
// Add 10% tax to every product price
// ========================================

const pricesWithTax = prices.map(price => {

    return price * 1.10;

});

console.log("Problem 1 - Prices with 10% tax:");

console.log(pricesWithTax);


// ========================================
// PROBLEM 2: FILTER()
// Get prices greater than Rs 1000
// ========================================

const expensiveItems = prices.filter(price => {

    return price > 1000;

});

console.log("Problem 2 - Prices above Rs 1000:");

console.log(expensiveItems);


// ========================================
// PROBLEM 3: REDUCE()
// Calculate total of all product prices
// ========================================

const totalPrice = prices.reduce((total, price) => {

    return total + price;

}, 0);

console.log("Problem 3 - Total of all prices:");

console.log(totalPrice);


// ========================================
// PROBLEM 4: MAP()
// Convert product names into uppercase
// ========================================

const productNames = [

    "JavaScript Book",
    "Wireless Headphones",
    "Study Table",
    "Computer Keyboard"

];

const upperCaseNames = productNames.map(name => {

    return name.toUpperCase();

});

console.log("Problem 4 - Uppercase product names:");

console.log(upperCaseNames);


// ========================================
// PROBLEM 5: FILTER() + REDUCE()
// Find total of prices Rs 1000 or more
// ========================================

const selectedPrices = prices.filter(price => {

    return price >= 1000;

});

const selectedTotal = selectedPrices.reduce(
    (total, price) => {

        return total + price;

    },
    0
);

console.log("Problem 5 - Selected prices:");

console.log(selectedPrices);

console.log("Total of selected prices:");

console.log(selectedTotal);


// ========================================
// END OF HOMEWORK
// ========================================
