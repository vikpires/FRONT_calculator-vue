// Enum for math operations
export enum Operation {
    Add = "+",
    Subtract = "-",
    Multiply = "*",
    Divide = "/"
}

// Calculate each math operation
export class Calculator {
    private current: string = '0';
    private operator: Operation | null = null;
    private operand: number | null = null;

    public getCurrent(): string {
        return this.current
    }

    public inputDigit(digit: string): void{
        if(this.current === '0'){
            this.current = digit;
        }else{
            this.current += digit;
        }
    }

    public inputOperator(operator: Operation): void{
        if(this.operand === null){
            this.operand = parseFloat(this.current);
        }else if (this.operator){
            this.calculate();
        }
        this.operator = operator;
        this.current = '0';
    }

public calculate(): void{
    if(this.operator && this.operand !== null){
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
                    throw new Error("Não há divisão por zero. Tente novamente.")
                }
                break;
            default:
                throw new Error ("Operação inválida! Tente novamente.");
        }
        this.current = this.operand.toString();
        this.operator = null;
        this.operand = null;
    }
}

    public clear(): void {
        this.current = '0';
        this.operator = null;
        this.operand = null;
    }
}
