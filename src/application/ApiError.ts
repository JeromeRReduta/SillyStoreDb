export class ApiError extends Error {
    public readonly code: string | number;

    constructor(code: string | number, message?: string) {
        super(message);
        this.code = code;
    }
}
