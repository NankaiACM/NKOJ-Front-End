const statusMap = [
  {
    'value': '107',
    'status': 'Accepted',
    'label_class': 'btn-success'
  },
  {
    'value': '102',
    'status': 'Wrong Answer',
    'label_class': 'btn-danger'
  },
  {
    'value': '108',
    'status': 'Presentation Error',
    'label_class': 'btn-warning'
  },
  {
    'value': '101',
    'status': 'Compilation Error',
    'label_class': 'btn-light'
  },
  {
    'value': '103',
    'status': 'Runtime Error',
    'label_class': 'btn-warning'
  },
  {
    'value': '105',
    'status': 'Time Limit Exceeded',
    'label_class': 'btn-warning'
  },
  {
    'value': '104',
    'status': 'Memory Limit Exceeded',
    'label_class': 'btn-warning'
  },
  {
    'value': '106',
    'status': 'Output Limit Exceeded',
    'label_class': 'btn-warning'
  },
  {
    'value': '109',
    'status': 'Function Limit Exceeded',
    'label_class': 'btn-warning'
  },
  {
    'value': '100',
    'status': 'Judging',
    'label_class': 'btn-info'
  },
  {
    'value': '118',
    'status': 'System Error',
    'label_class': 'btn-warning'
  },
  {
    'value': '120',
    'status': 'Compiling status',
    'label_class': 'btn-info'
  }
]
const langMap = [{
  'value': '0',
  'lang': 'C99'
}, {
  'value': '1',
  'lang': 'C++14'
}]
const langHash = {
  '0': 'C99',
  '1': 'C++14'
}
export {statusMap, langMap, langHash}
