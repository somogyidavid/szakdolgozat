export class UserValidator {
    nameLengthValidator(value: string): boolean {
        return value.length > 0 && value.length < 50;
    }

    emailValidator(value: string): boolean {
        return (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(value));
    }

    passwordValidator(value: string): boolean {
        return value.length >= 8;
    }
}