/* eslint-disable camelcase */
import { ProblemAddOrUpdateRequestInterface, ProblemInformationReturnInterface } from '@/types/interface'
import { SpecialJudgeNumberRule, SpecialJudgeStringRule } from '@/typescript/constant'

// eslint-disable-next-line import/prefer-default-export
export class ProblemEditClass implements ProblemAddOrUpdateRequestInterface {
  title: string;

  cases: number;

  time_limit: number;

  memory_limit: number;

  type: string;

  special_judge: number;

  special_judge_string: string;

  detail_judge: boolean;

  detail_judge_string: string;

  tags?: (string)[] | null;

  description: string;

  input: string;

  output: string;

  sample_input: string;

  sample_output: string;

  hint: string;

  level: number;

  constructor () {
    this.title = ''
    this.cases = 1
    this.time_limit = 1000
    this.memory_limit = 65536
    this.type = String(0)
    this.special_judge = SpecialJudgeNumberRule.NONE
    this.special_judge_string = SpecialJudgeStringRule.NONE
    this.detail_judge = true
    this.detail_judge_string = 'true'
    this.tags = []
    this.description = String('`@(1/2[1-(1/2)^n])/(1-(1/2))=s_n@`')
    this.input = String()
    this.output = String()
    this.sample_input = String('```\n0 0 0 1\n0 0 0 2\n```')
    this.sample_output = String()
    this.hint = String()
    this.level = 1
  }

  static inputProblemData (pd: ProblemInformationReturnInterface): ProblemEditClass {
    const pe = new ProblemEditClass()
    pe.title = pd.title
    pe.cases = pd.cases
    pe.time_limit = pd.time_limit
    pe.memory_limit = pd.memory_limit
    pe.type = String(0)
    pe.special_judge = pd.special_judge
    pe.special_judge_string = String(pd.special_judge)
    pe.detail_judge = pd.detail_judge
    pe.detail_judge_string = String(pd.detail_judge)
    pe.tags = pd.tags?.map((item) => item.name)
    if (!pe.tags) { pe.tags = [] }
    pe.description = pd.content.description
    pe.input = pd.content.input
    pe.output = pd.content.output
    pe.sample_input = pd.content.sample_input
    pe.sample_output = pd.content.sample_output
    pe.hint = pd.content.hint
    pe.level = pd.level
    return pe
  }
}
