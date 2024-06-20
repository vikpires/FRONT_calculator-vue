import { Operations } from "./Operations";
import { CalculatorContext } from "./CalculatorModel";

export class InputHandler {
    private context: CalculatorContext;

    constructor(context: CalculatorContext){
        this.context = context;
    }

    //Add a digit to the curarent value
    public inputDigit(digit: string): void {
        if (this.context.current === 'Operação inválida' || this.context.getErrorMessage()) {
            this.context.clear();
        }
        if (this.context.current.length >= this.context.limit) return;

        if (this.context.current === '0' && digit !== '.') {
            this.context.current = digit;
          } else {
            this.context.current += digit;
          }
    }

    // Add an operator to the calculator and calculate if there's a pending operation
    public inputOperator(operator: Operations): void { 
        if (isNaN(Number(this.context.current))) return;
        
        if (this.context.operand === null) {
            this.context.operand = parseFloat(this.context.current);
        } else if (this.context.operator) {
            this.context.calculate();
            this.context.operand = parseFloat(this.context.current);
        }
        
        this.context.operator = operator;
        this.context.current = '0'; // Definido para '0' após definição de operador
    }  
}