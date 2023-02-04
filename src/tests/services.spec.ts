import { formatCurrency } from "src/services";
describe('Tests in services file', () => {
    it('should return NaN when the value is not a number', () => {
        expect(formatCurrency(34553)).toBeNaN();
    })
    it('should return a string', () => {
        expect(formatCurrency(20)).toBe('R$ 20,00');
    })
})