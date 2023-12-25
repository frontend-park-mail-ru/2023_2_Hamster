/**
 * Converts a number to a string with spaces as digit group separators and retains all characters after the decimal point.
 *
 * @param {number} number - The number to convert.
 * @returns {string} The converted number as a string with spaces as digit group separators.
 *
 * @example
 * // returns '10 000.00'
 * numberWithSpaces(10000.00);
 */
export const numberWithSpaces = (number) => {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
};
