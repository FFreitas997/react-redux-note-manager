export class ValidatorService {

    static min(input, min) {
        if (input.length < min)
            return `Can't be less than ${min} characters`;
    }

    static max(input, max) {
        if (input.length > max)
            return `Can't be more than ${max} characters`;
    }
}