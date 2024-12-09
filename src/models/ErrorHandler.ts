export class ErrorHandler {
    private errorMessage: string = '';

    public getErrorMessage(): string {
        return this.errorMessage;
    }

    public clearErrorMessage(): void {
        this.errorMessage = '';
    }
    public setError(message: string): void {
        this.errorMessage = message;
    }
}
