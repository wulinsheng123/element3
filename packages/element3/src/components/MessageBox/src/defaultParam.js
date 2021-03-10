import { isObject, isUndefined } from '../../../utils/types'

export const collection = {
  alert(message, title, options) {
    return mergeCondition(message, title, options, {
      category: 'alert',
      closeOnPressEscape: false
    })
  },

  confirm(message, title, options) {
    return mergeCondition(message, title, options, {
      type: 'info',
      category: 'confirm',
      showCancelButton: true
    })
  },

  prompt(message, title, options) {
    return mergeCondition(message, title, options, {
      showInput: true,
      category: 'prompt',
      showCancelButton: true,
      inputErrorMessage: '输入的数据不合法!'
    })
  },

  msgbox(message, title, options) {
    return mergeCondition(message, title, options, {})
  }
}

const mergeCondition = (message, title, options, adapter) => {
  if (isObject(title)) {
    options = title
    title = ''
  } else if (isUndefined(title)) {
    title = ''
  }

  if (isObject(message)) {
    options = message
    message = ''
  }

  return Object.assign(
    adapter,
    {
      title: title,
      message: message,
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    },
    options
  )
}
