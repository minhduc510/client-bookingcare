/* eslint-disable no-useless-escape */
const message = {
  required: 'Trường này không được để trống',
  email: 'Email không đúng định dạng',
  phone: 'Số điện thoại không đúng định dạng',
  minLength: (number: number) =>
    `Trường này phải tối thiểu ${number} ký tự`,
  maxLength: (number: number) =>
    `Trường này không được quá ${number} ký tự`
}

const EMAIL_REGEX =
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

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

const phoneValidation = {
  required: message.required,
  maxLength: {
    value: 191,
    message: message.maxLength(191)
  },
  pattern: {
    value: PHONE_REGEX,
    message: message.phone
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

const nameValidation = {
  required: message.required,
  maxLength: {
    value: 191,
    message: message.maxLength(191)
  },
  minLength: {
    value: 1,
    message: message.minLength(1)
  }
}

const roleValidation = {
  required: message.required
}

const addressValidation = {
  required: message.required,
  maxLength: {
    value: 255,
    message: message.maxLength(255)
  },
  minLength: {
    value: 5,
    message: message.minLength(5)
  }
}

export {
  nameValidation,
  roleValidation,
  emailValidation,
  phoneValidation,
  addressValidation,
  passwordValidation
}
