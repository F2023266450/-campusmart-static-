// const listing = {
//     id: 7,
//     title: "English Book",
//     price: 2000,
//     seller: { name: "Talha" }
// };

// console.log(listing);

// // Object destructuring
// const { title, price } = listing;
// console.log(title, price);

// // Nested destructuring
// const { seller: { name: sellerName } } = listing;
// console.log(sellerName);

// // Default value
// const { condition = "GOOD" } = listing;
// console.log(condition);

// // Array destructuring
// const [first, second] = ["Books", "electronics", "furniture"];
// console.log(first, second);

// const base = { condition : "GOOD" , status : "ACTIVE"};
// console.log(base);
// const listing2 = { ...base, title: "Mouse" , status: "SOLD"};
// console.log(listing2);

// const a = [1, 2];
// console.log(a);
// const b = [ ...a , 3];
// console.log(b);

// function sum(...numbers){
//     return numbers.reduce((t, n)=>t * n , 0);
// }
// sum( 1, 2, 3);
// console.log(sum( 1, 2, 3, 4));

// console.log("1. Start");
// setTimeout(() => console.log("3. Timer done") , 0);
// console.log("2. End ");

// const wait = (ms) => new Promise((resolve) =>  setTimeout(resolve, ms));

// wait(1000)
// .then(() => console.log("1. secoond later "))
// .catch((err) => console.log(err))
// .finally(() => console.log("done either way"));

 //Async / Await

// const wait = (ms) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// };

// async function runTask() {
//     console.log("1. Start");

//     await wait(1000);
//     console.log("2. One second later");

//     await wait(2000);
//     console.log("3. Two seconds later");

//     console.log("4. Task completed");
// }

// runTask();

// console.log("5. End");

// const getData = async () => {
//     try {
//         console.log("Fetching data...");

//         await wait(2000);

//         console.log("Data fetched successfully");
//     } 
//     catch (err) {
//         console.log("Error:", err);
//     } 
//     finally {
//         console.log("Process completed");
//     }
// };

// getData();

// type Condition = "NEW" | "LIKE_NEW" | "GOOD" | "FAIR"; // union of string literals
// type Listing = {
//  id: number;
//  title: string;
//  price: number;
//  condition: Condition;
//  imageUrl?: string; // optional property
//  readonly createdAt: Date; // cannot be changed after creation
// };
// interface Seller {
//  name: string;
//  email: string;
// }
// interface VerifiedSeller extends Seller { // interfaces can extend
//  verifiedAt: Date;
// }

function describe(value: string | number) {
    if (typeof value === "string") {
      return value.toUpperCase();   // TS knows: string here
    }
    return value.toFixed(2);        // TS knows: number here
  }
   
  type Result = { ok: true; data: Listing[] } | { ok: false; error: string };  // 
  discriminated union
   
  function show(result: Result) {
    if (result.ok) console.log(result.data.length);
    else console.error(result.error);
  }
  