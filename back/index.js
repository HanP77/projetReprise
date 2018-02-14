let firstNumber = process.argv[2]
let operator = process.argv[3]
let secondNumber = process.argv[4]

// if (operator = '+') {
//     let add = (firstNumber, secondNumber) =>  firstNumber + secondNumber;
//     console.log(add(firstNumber, secondNumber));
// }

if (operator) {
    let calculate = (firstNumber, secondNumber, operator) => {
        console.log("test");
        let result;
        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
        }
        return result;
        console.log(result);
    }
};