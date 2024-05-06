export const convertNumberToWords = (num: number): string => {
    const ordinalNumbers = ["", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const teens = ["", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eighteenth", "Nineteenth"];

    if (num === 0) return "Zero";
    if (num < 10) return ordinalNumbers[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + " " + ordinalNumbers[num % 10];
    if (num < 1000) return ordinalNumbers[Math.floor(num / 100)] + " Hundred " + convertNumberToWords(num % 100);
    return "";
};
