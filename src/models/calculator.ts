// Enum for calculate operations
export enum Operation {
    Add = "+",
    Subtract = "-",
    Multiply = "x",
    Divide = "/"
}

// Class to handle calculating operations
export class Calculator {
    private current: string = '0'; //Stores the current value being typed or the result of the last operation.
    private operator: Operation | null = null; //Stores the current operator being used.
    private operand: number | null = null; //Stores the first operand before the operation
    private limit: number = 10; // Limit the number of digits 
    private maxResultLength: number = 10;
    
    public getCurrent(): string {
        return this.current; //Return the current value
    }
    
//Adds a digit to the current value
    public inputDigit(digit: string): void { 
        if(this.current.length >= this.limit)
            return;
        this.current = this.current === '0' ? digit : this.current + digit; // Prevent adding more digits than the limit
        }

//Sets the current operator and, if necessary, calculates the result based on the previous operator.
    public inputOperator(operator: Operation): void { 
        if (this.operand === null) {
            this.operand = parseFloat(this.current);
        } else if (this.operator) {
            this.calculate();
            this.operand = parseFloat(this.current);
        }
        this.operator = operator;
        this.current = '0';
    }

//Makes the calculation based on the stored operator and operands
    public calculate(): void {
        if (this.operator && this.operand !== null) {
            const currentNumber = parseFloat(this.current);
            switch (this.operator) {
                case Operation.Add:
                    this.operand += currentNumber;
                    break;
                case Operation.Subtract:
                    this.operand -= currentNumber;
                    break;
                case Operation.Multiply:
                    this.operand *= currentNumber;
                    break;
                case Operation.Divide:
                    if (currentNumber !== 0) {
                        this.operand /= currentNumber;
                    } else {
                        throw new Error("Não há divisão por zero. Tente novamente.");
                    }
                    break;
                default:
                    throw new Error("Operação inválida! Tente novamente.");
            }
            let result = this.operand.toString();
            if (result.length > this.maxResultLength) {
                result = parseFloat(result).toPrecision(this.maxResultLength);
            }
            this.current = result;
            this.operator = null;
            this.operand = null;
        }
    }

//Resets the calculator to its initial state
    public clear(): void {
        this.current = '0';
        this.operator = null;
        this.operand = null;
    }
}

