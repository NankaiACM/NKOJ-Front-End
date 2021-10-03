export default {
  install (Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$message = function Notification (html, e) {
      if (e instanceof Error) {
      // eslint-disable-next-line no-console
        console.error(e)
        window.postMessage({ type: 'notice', payload: { title: `错误：${html}`, content: e.toString(), type: 'warning' } }, '*')
      } else {
        window.postMessage({ type: 'notice', payload: { title: '提示', content: html } }, '*')
      }
    }

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$solutionTrace = (sid) => {
      window.postMessage({ type: 'loader', payload: { sid } }, '*')
    }
  }
}
