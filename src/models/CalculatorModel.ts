import { Operations } from "./Operations";
import { ErrorHandler } from "./ErrorHandler";
import { OperationHandler } from "./OperationHandler";
import { InputHandler } from "./InputHandler";

// Class to handle calculating operations
export class Calculator implements CalculatorContext {
    public current: string = '0'; 
    public operator: Operations | null = null; 
    public operand: number | null = null; 
    public limit: number = 10; 
    public maxResultLength: number = 8;
    private errorHandler: ErrorHandler;
    private operationHandler: OperationHandler;
    private inputHandler: InputHandler;

    constructor(){
        this.errorHandler = new ErrorHandler();
        this.operationHandler = new OperationHandler(this);
        this.inputHandler = new InputHandler(this);
    }
    
    public getCurrent(): string {
        return this.current; 
    }   
    public getErrorMessage(): string {
        return this.errorHandler.getErrorMessage();
    }
    public clearErrorMessage(): void {
        this.errorHandler.clearErrorMessage();
    } 
    public inputDigit(digit: string): void{
        this.inputHandler.inputDigit(digit);
    }
    public inputOperator(operator: Operations): void{
        this.inputHandler.inputOperator(operator);
    }
    public calculate(): void{
        this.operationHandler.calculate();
    }

//Resets the calculator to its initial state
    public clear(): void {
        this.current = '0';
        this.operator = null;
        this.operand = null;
        this.clearErrorMessage();
    }

// Set an error message and display NaN
    public setError(message: string): void {
        this.errorHandler.setError(message);
        this.current = 'Operação inválida';
    }

// Update the current display value from the operand
    public updateCurrentFromOperand(): void {
        let result = this.operand!.toString();
        if (result.length > this.maxResultLength) {
            result = parseFloat(result).toPrecision(this.maxResultLength);
        }
        this.current = result;
    }

// Reset the operator and operand for the next operation
    public resetOperatorAndOperand(): void {
        this.operator = null;
        this.operand = null;
    }
}

export interface CalculatorContext{
    current: string;
    operator: Operations | null;
    operand: number | null;
    limit: number;
    maxResultLength: number;
    setError(message: string): void;
    updateCurrentFromOperand(): void;
    resetOperatorAndOperand(): void;
    clear(): void;
    calculate(): void;
    getErrorMessage(): string;
}

