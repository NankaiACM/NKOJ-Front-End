const LangMap = [{
  value: '0',
  lang: 'C'
}, {
  value: '1',
  lang: 'C++'
}, {
  value: '2',
  lang: 'JavaScript'
}, {
  value: '3',
  lang: 'Python'
}, {
  value: '4',
  lang: 'Go'
}, {
  value: '5',
  lang: 'Text'
}, {
  value: '6',
  lang: 'pypy3'
}]
const LangHash = {
  0: 'C',
  1: 'C++',
  2: 'JavaScript',
  3: 'Python',
  4: 'Go',
  5: 'Text',
  6: 'pypy3'
}
const Lang2Code = {
  C: 0,
  'C++': 1,
  JavaScript: 2,
  Python: 3,
  Go: 4,
  Text: 5,
  pypy3: 6
}

enum ContestRule {
  ACM = 'acm',
  OI = 'oi',
}

enum SpecialJudgeStringRule {
  NONE = '0',
  COMPARE = '1',
  INTERACTIVE = '2',
}

enum SpecialJudgeNumberRule {
  NONE = 0,
  COMPARE = 1,
  INTERACTIVE = 2,
}

export {
  LangMap, LangHash, Lang2Code, ContestRule, SpecialJudgeStringRule, SpecialJudgeNumberRule
}
