export class ActivityValidator {
    nameLengthValidator(value: string): boolean {
        return value.length > 0 && value.length < 80;
    }
}