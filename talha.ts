
function formatPrice(amount: number): string {
    return `Rs ${amount.toLocaleString("en-PK")}`;
}

// Call the function
console.log(formatPrice(4500));

// TypeScript data types
let title: string = "Calculator";
let price: number = 4500;
let sold: boolean = false;
let tags: string[] = ["math", "exam"];

// Tuple
let pair: [string, number] = ["Books", 12];

let price2: number = 4500;

// Display values
console.log(title);
console.log(price);
console.log(sold);
console.log(tags);
console.log(pair);
console.log(price2);
