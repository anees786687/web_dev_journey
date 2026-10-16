// CHAINING
let process = {
    env: {
        PORT : 123
    }
};

const port = process.env.PORT ?? config.port ?? 3000;
console.log(`chaining ?? : ${port}`); 

// OPTIONAL CHAINING
let user = {
    
};

// user is defined, so address.city is checked; here address is undefined
// so a type error is given; commented for now to prevent program from crashing
// let city = user?.address.city ?? "Untagged" ;
// console.log(`Optional chaining: ${city}`);

// to fix this add ?. check on address as well
city = user?.address?.city ?? "Untagged" ;
console.log(`Optional chaining fixed: ${city}`);

// optional chaining can be applied on function calls as well
let ops = {
    // fetchData : function (name){
    //     return `Data fetched ${name}`;
    // } // if this is uncommented LHS of ?? will work
}
console.log(ops.fetchData?.('anees') ?? 'no data');

//  NULLISH ASSIGNMENT
let config = {

}
console.log(`Before nullish assignement: ${config.retries}`);

config.retries ??= 3;
console.log(`After nullish assignement: ${config.retries}`);

// DEFAULT PARAMS and NULLISH
function greet(name = "Guest") {
  return name;
}
greet(undefined); // "Guest"
greet(null);      // null  (default params only trigger on undefined)

console.log(`Sending no params aka param is undefined ${greet()}`);
console.log(`Sending null as para: ${greet(null)}`);

// sometimes API send null values and default values must be returned
// so use nullish for ensuring that proper default value is sent


function greet2(name) {
  return name ?? "Guest";
}
console.log(greet2(null))
