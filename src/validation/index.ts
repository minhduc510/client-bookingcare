/* eslint-disable no-useless-escape */
const message = {
  required: 'Trường này không được để trống',
  email: 'Email không đúng định dạng',
  minLength: (number: number) =>
    `Trường này phải tối thiểu ${number} ký tự`,
  maxLength: (number: number) =>
    `Trường này không được quá ${number} ký tự`
}

const EMAIL_REGEX =
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const emailValidation = {
  required: message.required,
  maxLength: {
    value: 191,
    message: message.maxLength(191)
  },
  pattern: {
    value: EMAIL_REGEX,
    message: message.email
  }
}

const passwordValidation = {
  required: message.required,
  maxLength: {
    value: 191,
    message: message.maxLength(191)
  },
  minLength: {
    value: 4,
    message: message.minLength(4)
  }
}

export { emailValidation, passwordValidation }
