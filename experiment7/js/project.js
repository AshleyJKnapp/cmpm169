// project.js - purpose and description here
// Author: Your Name
// Date:


import OpenAI from "openai";

const openai = new OpenAI({
  
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write \"Hi\""},
  ],
});

completion.then((result) => console.log(result.choices[0].message));



// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
// class MyProjectClass {
//   // constructor function
//   constructor(param1, param2) {
//     // set properties using 'this' keyword
//     this.property1 = param1;
//     this.property2 = param2;
//   }
  
//   // define a method
//   myMethod() {
//     // code to run when method is called
//   }
// }

function main() {
  // // create an instance of the class
  // let myInstance = new MyProjectClass("value1", "value2");

  // // call a method on the instance
  // myInstance.myMethod();
  testFunc();

}

// let's get this party started - uncomment me
main();