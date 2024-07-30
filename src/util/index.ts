export const roundToDecimals = (value: string | number, decimals: number): number => {
    if (typeof value == "string") {
        const parsedNumber = parseFloat(value);
        return Math.round(parsedNumber * (10 ** decimals)) / (10 ** decimals);
    } else {
        return Math.round(value * (10 ** decimals)) / (10 ** decimals);
    }
}