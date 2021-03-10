import { isVNode } from 'vue'
import { isUndefined } from '../../../utils/types'
import { createComponent } from '../../../composables/component'
import msgboxVue from './MessageBox.vue'
import { collection } from './defaultParam'

let currentMsg, instance

let msgQueue = []

// 初始化
initMessageBox()

function initMessageBox() {
  for (let key in collection) {
    MessageBox[key] = (message, title, options) => {
      return MessageBox(collection[key](message, title, options))
    }
  }
}

const defaultCallback = (action) => {
  if (currentMsg && currentMsg.resolve) {
    const isConfirm = action === 'confirm'
    const isCancelOrClose = action === 'cancel' || action === 'close'
    const isReject = currentMsg.reject && isCancelOrClose
    if (isReject) {
      currentMsg.reject({ action })
      return
    }
    const isShow = instance.proxy.showInput
    const value = instance.proxy.inputValue
    const result = isShow ? { value, action } : { action }
    if (isConfirm) {
      currentMsg.resolve(result)
    }
  }
}

const initInstance = (currentMsg, VNode = null) => {
  instance = createComponent(msgboxVue, currentMsg.options, VNode)
  MessageBox.instance = instance
}

const showNextMsg = () => {
  if (msgQueue.length <= 0) return
  currentMsg = msgQueue.shift()
  const options = currentMsg.options

  if (isUndefined(options.callback)) options.callback = defaultCallback

  const oldCb = options.callback
  options.callback = (action, instance) => {
    oldCb(action, instance)
  }

  initInstance(
    currentMsg,
    isVNode(options.message) ? () => options.message : null
  )

  document.body.appendChild(instance.vnode.el)
}
function MessageBox(options) {
  let callback = null
  if (options.callback) {
    callback = options.callback
  }
  let promiseInstance = new Promise((resolve, reject) => {
    // eslint-disable-line
    msgQueue.push({
      options: options,
      callback: callback,
      resolve: resolve,
      reject: reject
    })
    showNextMsg()
  })
  promiseInstance.instance = instance
  return promiseInstance
}

MessageBox.close = () => {
  instance.proxy.closeHandle()
  msgQueue = []
  currentMsg = null
}

export default MessageBox
export { MessageBox }
