// eslint-disable-next-line no-control-regex
const EMOJIS_REG_EXP = /^[\u0000-\u1F5FF\u1F680-\u1F6FF\u1F900-\u1F9FF]+$/;

export const LOGIN_RULES = [
    {
        message: 'Логин должен содержать как минимум 4 символа',
        regex: /.{4,}/,
    },
    {
        message: 'Логин должен содержать не более 20 символов',
        regex: /^.{1,20}$/,
    },
    {
        message: 'Логин не может содержать эмодзи',
        regex: EMOJIS_REG_EXP,
    },
    {
        message: 'Логин должен содержать только латинские буквы и цифры',
        regex: /^[a-zA-Z0-9]*$/,
    },
    {
        message: 'Первый символ - обязательно буква',
        regex: /^[a-zA-Z][a-zA-Z0-9]*$/,
    }
];

export const USERNAME_RULES = [
    {
        message: 'Имя должно содержать как минимум 4 символа',
        regex: /.{4,}/,
    },
    {
        message: 'Имя должно содержать не более 20 символов',
        regex: /^.{1,20}$/,
    },
];

export const PASSWORD_RULES = [
    {
        message: 'Пароль должен состоять минимум из 8 символов',
        regex: /.{8,}/,
    },
    {
        message: 'Пароль не может содержать более 64 символов',
        regex: /^.{1,64}$/,
    },
    {
        message: 'Пароль не может содержать эмодзи',
        regex: EMOJIS_REG_EXP,
    },
    {
        message: 'Пароль должен содержать только латинские буквы и цифры',
        regex: /^[a-zA-Z0-9]*$/,
    },
];

export const MONEY_RULES = [
    {
        message: 'Поле не может быть пустым',
        regex: /.+/,
    },
    {
        message: 'Можно ввести только число',
        regex: /^-?\d+(\.\d+)?$/,
    },
    {
        message: 'Число не может быть равно нулю',
        regex: /^-?[1-9]\d*(\.\d+)?$/,
    },
    {
        message: 'Максимальная длина целой части числа - 8 символов',
        regex: /^-?(\d{1,8})(\.\d+)?$/,
    },
    {
        message: 'Максимальная длина дробной части числа - 2 символа',
        regex: /^-?\d+(\.\d{1,2})?$/,
    },
    {
        message: 'Число не может начинаться с 0',
        regex: /^[^0]/,
    },
];

export const PAYER_RULES = [
    {
        message: 'Максимальная длина - 20 символов',
        regex: /^.{0,20}$/,
    },
];

export const DESCRIPTION_RULES = [
    {
        message: 'Максимальная длина - 100 символов',
        regex: /^.{0,100}$/,
    },
];

export const ACCOUNT_NAME_RULES = [
    {
        message: 'Поле не может быть пустым',
        regex: /.+/,
    },
    {
        message: 'Максимальная длина - 30 символов',
        regex: /^.{0,30}$/,
    },
];

export const CATEGORY_NAME_RULES = [
    {
        message: 'Поле не может быть пустым',
        regex: /.+/,
    },
    {
        message: 'Максимальная длина - 20 символов',
        regex: /^.{0,20}$/,
    },
];

export const PROFILE_NAME_RULES = [
    {
        message: 'Поле не может быть пустым',
        regex: /.+/,
    },
    {
        message: 'Максимальная длина - 20 символов',
        regex: /^.{0,20}$/,
    },
];

export const BUDGET_RULES = [
    {
        message: 'Поле не может быть пустым',
        regex: /.+/,
    },
    {
        message: 'Можно ввести только число',
        regex: /^-?\d+(\.\d+)?$/,
    },
    {
        message: 'Максимальная длина целой части числа - 8 символов',
        regex: /^-?(\d{1,8})(\.\d+)?$/,
    },
    {
        message: 'Максимальная длина дробной части числа - 2 символа',
        regex: /^-?\d+(\.\d{1,2})?$/,
    },
    {
        message: 'Число не может начинаться с 0',
        regex: /^[^0]/,
    },
];

export const NOT_NULL_RULE = [
    {
        message: 'Поле не может быть пустым',
        regex: /.+/,
    },
];

export const DATE_RULES = [
    {
        message: 'Поле не может быть пустым',
        regex: /.+/,
    },
    {
        message: 'Нельзя выбрать дату раньше 1900 и позже 2100 года',
        regex: /^19[0-9]{2}|20[0-9]{2}|2100$/,
    },
];
