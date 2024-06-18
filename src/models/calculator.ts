import { Operations } from "./operations";

// Class to handle calculating operations
export class Calculator {
    private current: string = '0'; 
    private operator: Operations | null = null; 
    private operand: number | null = null; 
    private limit: number = 10; 
    private maxResultLength: number = 8;
    private errorMessage: string = '';

    public getCurrent(): string {
        return this.current; 
    }

    // Return the current error message
    public getErrorMessage(): string{
        return this.errorMessage;
    }

    // Clear the error message
    public clearErrorMessage(): void{
        this.errorMessage = '';
    }
    
    //Add a digit to the current value
    public inputDigit(digit: string): void {
        if (this.current === 'Operação inválida' || this.errorMessage) {
            this.clear();
        }
        if (this.current.length >= this.limit) {
        return;
        }
        if (this.current === '0' && digit !== '.') {
            this.current = digit;
          } else {
            this.current += digit;
          }
    }

// Add an operator to the calculator and calculate if there's a pending operation
    public inputOperator(operator: Operations): void { 
        if (isNaN(Number(this.current))) {
            return;
        }
        
        if (this.operand === null) {
            this.operand = parseFloat(this.current);
        } else if (this.operator) {
            this.calculate();
            this.operand = parseFloat(this.current);
        }
        
        this.operator = operator;
        this.current = '0'; // Definido para '0' após definição de operador
    }
    
//Makes the calculation based on the stored operator and operands
    public calculate(): void {
        if (this.operator && this.operand !== null){
            const currentNumber = parseFloat(this.current);
            switch (this.operator) {
                case Operations.Add:
                    this.operand += currentNumber;
                    break;
                case Operations.Subtract:
                    this.operand -= currentNumber;
                    break;
                case Operations.Multiply:
                    this.operand *= currentNumber;
                    break;
                case Operations.Divide:
                    if (currentNumber === 0) {
                        this.setError("Não é possível dividir por zero.")
                        return;
                    }
                    this.operand /= currentNumber;
                    break; 
            }
            this.updateCurrentFromOperand();
            this.resetOperatorAndOperand();
        }
    }

//Resets the calculator to its initial state
    public clear(): void {
        this.current = '0';
        this.operator = null;
        this.operand = null;
        this.clearErrorMessage();
    }

// Set an error message and display NaN
    private setError(message: string): void {
        this.errorMessage = message;
        this.current = 'Operação inválida';
    }

// Update the current display value from the operand
    private updateCurrentFromOperand(): void {
        let result = this.operand!.toString();
        if (result.length > this.maxResultLength) {
            result = parseFloat(result).toPrecision(this.maxResultLength);
        }
        this.current = result;
    }

// Reset the operator and operand for the next operation
    private resetOperatorAndOperand(): void {
        this.operator = null;
        this.operand = null;
    }
}

