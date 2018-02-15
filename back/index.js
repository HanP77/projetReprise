// const firstNumber = parseInt(process.argv[2]);
// const operator = process.argv[3];
// const secondNumber = parseInt(process.argv[4]);

// if (operator = '+') {
//     let add = (firstNumber, secondNumber) =>  firstNumber + secondNumber;
//     console.log(add(firstNumber, secondNumber));
// }
// console.log("test1");

// if (operator) {
//   let calculate = (firstNumber, secondNumber, operator) => {
//     let result;
//     switch (operator) {
//       case "+":
//         result = firstNumber + secondNumber;
//         break;
//       case "-":
//         result = firstNumber - secondNumber;
//         break;
//       case "x":
//         result = firstNumber * secondNumber;
//         break;
//       case "/":
//         result = firstNumber / secondNumber;
//         break;
//     case '^':
//         result = firstNumber ^ secondNumber;
//         break;
//     }
//     // console.log(result);
//     return result;
//   };
//   calculate(firstNumber, secondNumber, operator);
// }


let test = process.argv;

test.splice(0, 2);

console.log(eval((test).join('')));
