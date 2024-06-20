export class ErrorHandler {
    private errorMessage: string = '';

    // Return the current error message
    public getErrorMessage(): string{
        return this.errorMessage;
    }

    // Clear the error message
    public clearErrorMessage(): void{
        this.errorMessage = '';
    }      
    public setError(message: string): void {
        this.errorMessage = message;
    }    
}