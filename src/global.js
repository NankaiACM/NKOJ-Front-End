window.noPointHost = window.location.origin
window.noPointPreURL = window.location.host
window.noPointPort = ''
if (process.env.NODE_ENV === 'development') {
  window.noPointHost = 'http://acm.nankai.edu.cn'
  window.noPointPreURL = 'acm.nankai.edu.cn'
}
