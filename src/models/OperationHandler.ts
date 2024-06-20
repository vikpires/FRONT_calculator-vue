import { Operations } from "./Operations";
import { CalculatorContext } from "./CalculatorModel";

export class OperationHandler {
    private context: CalculatorContext;

    constructor(context: CalculatorContext){
        this.context = context;
    }
    //Makes the calculation based on the stored operator and operands
    public calculate(): void {
        if (this.context.operator && this.context.operand !== null){
            const currentNumber = parseFloat(this.context.current);
            switch (this.context.operator) {
                case Operations.Add:
                    this.context.operand += currentNumber;
                    break;
                case Operations.Subtract:
                    this.context.operand -= currentNumber;
                    break;
                case Operations.Multiply:
                    this.context.operand *= currentNumber;
                    break;
                case Operations.Divide:
                    if (currentNumber === 0) {
                        this.context.setError("Não é possível dividir por zero.")
                        return;
                    }
                    this.context.operand /= currentNumber;
                    break; 
            }
            this.context.updateCurrentFromOperand();
            this.context.resetOperatorAndOperand();
        }
    }
}