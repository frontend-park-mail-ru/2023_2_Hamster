/**
 * Validates a data against a set of rules.
 *
 * @function
 * @param {string} data - The data to be validated.
 * @param {Array.<Object>} rules - The validation rules.
 * @param {RegExp} rules.regex - The regex to test the data against.
 * @param {string} rules.message - The message to return if the data fails the validation.
 * @returns {Object} The validation result.
 * isError - Indicates if there was an error during validation.
 * message - The validation message.
 */
export const validator = (data, rules) => {
    const failedRule = rules.find((condition) => !condition.regex.test(data));

    if (failedRule) {
        return {
            isError: true,
            message: failedRule.message,
        };
    }

    return {
        isError: false,
        message: null,
    };
};
