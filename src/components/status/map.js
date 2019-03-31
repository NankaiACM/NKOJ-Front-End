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
  },
  {
    'value': '110',
    'status': 'Detail Mode',
    'label_class': 'btn-info'
  },
  {
    'value': '233',
    'status': 'Secret',
    'label_class': 'btn-info'
  }
]
const statusHash = {
  107: {
    'value': '107',
    'status': 'Accepted',
    'label_class': 'btn-success'
  },
  102: {
    'value': '102',
    'status': 'Wrong Answer',
    'label_class': 'btn-danger'
  },
  108: {
    'value': '108',
    'status': 'Presentation Error',
    'label_class': 'btn-warning'
  },
  101: {
    'value': '101',
    'status': 'Compilation Error',
    'label_class': 'btn-light'
  },
  103: {
    'value': '103',
    'status': 'Runtime Error',
    'label_class': 'btn-warning'
  },
  105: {
    'value': '105',
    'status': 'Time Limit Exceeded',
    'label_class': 'btn-warning'
  },
  104: {
    'value': '104',
    'status': 'Memory Limit Exceeded',
    'label_class': 'btn-warning'
  },
  106: {
    'value': '106',
    'status': 'Output Limit Exceeded',
    'label_class': 'btn-warning'
  },
  109: {
    'value': '109',
    'status': 'Function Limit Exceeded',
    'label_class': 'btn-warning'
  },
  100: {
    'value': '100',
    'status': 'Judging',
    'label_class': 'btn-info'
  },
  118: {
    'value': '118',
    'status': 'System Error',
    'label_class': 'btn-warning'
  },
  120: {
    'value': '120',
    'status': 'Compiling status',
    'label_class': 'btn-info'
  },
  110: {
    'value': '110',
    'status': 'Detail Mode',
    'label_class': 'btn-info'
  },
  233: {
    'value': '233',
    'status': 'Secret',
    'label_class': 'btn-info'
  }
}
const langMap = [{
  'value': '0',
  'lang': 'C'
}, {
  'value': '1',
  'lang': 'C++'
}, {
  'value': '2',
  'lang': 'JavaScript'
}, {
  'value': '3',
  'lang': 'Python'
}, {
  'value': '4',
  'lang': 'Go'
}, {
  'value': '5',
  'lang': 'Text'
}, {
  'value': '6',
  'lang': 'pypy3'
}]
const langHash = {
  '0': 'C',
  '1': 'C++',
  '2': 'JavaScript',
  '3': 'Python',
  '4': 'Go',
  '5': 'Text',
  '6': 'pypy3'
}
const lang2code = {
  'C': 0,
  'C++': 1,
  'JavaScript': 2,
  'Python': 3,
  'Go': 4,
  'Text': 5,
  'pypy3': 6
}
export {statusMap, statusHash, langMap, langHash, lang2code}
