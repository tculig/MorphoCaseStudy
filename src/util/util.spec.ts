import { roundToDecimals } from '.';

describe('Util functions', () => {
    describe('roundToDecimals', () => {
        it('should return 123.45 when string input', () => {
            const result = roundToDecimals(123.456, 2);
            expect(result).toEqual(123.46);
        });
        it('should return 123.45 when number input', () => {
            const result = roundToDecimals("123.456",2);
            expect(result).toEqual(123.46);
        });
    });
});
