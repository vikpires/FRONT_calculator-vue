import { Calculator } from "../models/CalculatorModel";
import { Operations } from "../models/Operations";

export class CalculatorController {
    private calculator: Calculator;

    constructor() {
        this.calculator = new Calculator();
    }
    public getCurrent(): string {
        return this.calculator.getCurrent();
    }
    public getErrorMessage(): string {
        return this.calculator.getErrorMessage();
    }

    public inputDigit(digit: string): void {
        this.calculator.inputDigit(digit);
    }

    public inputOperator(operator: Operations): void {
        this.calculator.inputOperator(operator);
    }

    public calculate(): void {
        this.calculator.calculate();
    }

    public clear(): void {
        this.calculator.clear();
    }
}
