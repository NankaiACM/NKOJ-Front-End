/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import { ContestRule } from '@/typescript/constant'

interface ErrorInterface {
  name: string;
  message: string;
  debug: Debug;
  compiler?: string;
  success?: boolean;
  target?: string;
}

interface Debug {
  value?: string;
  location?: string;
  type?: string;
}

interface ApiReturn {
  code: number;
  message: string;
  data?: (AnnouncementReturnInterface)[] |
  UserInformationReturnInterface |
  ContestsListReturnInterface |
  ContestDetailReturnInterface |
  ContestCreateReturnInterface |
  ProblemsListReturnInterface |
  Array<ReportReturnInterface> |
  ProblemAddOrUpdateReturnInterface |
  ProblemIODataUpdateReturnInterface |
  ProblemInformationReturnInterface |
  Array<StatusStreamReturnInterfacee> |
  RejudgeReturnInterface |
  null;
  error?: (ErrorInterface)[] | ErrorInterface;
}

interface AnnouncementReturnInterface {
  message_id: number;
  title: string;
  content: string;
  since: string;
}

interface MessageRequestInterface {
  title: string;
  message: string;
}

interface MessageWithdrawReturnInterface {
  affected: number;
}

interface AdminWhisperRequestInterface {
  uid: number;
  title: string;
  message: string;
}

interface UserInformationReturnInterface {
  user_id: number;
  nickname: string;
  gender: number;
  email: string;
  last_login: string;
  submit_ac: number;
  submit_all: number;
  ipaddr: string;
  role?: (number)[] | null;
  words?: null;
  qq: string;
  phone: string;
  real_name: string;
  school: string;
  current_badge: number;
  removed: boolean;
  credits: number;
  perm: UserInformationPerm;
  ac?: (number)[] | null;
  all?: (number)[] | null;
}

interface UserInformationPerm {
  LOGIN: string;
  COMMENT: string;
  REPLY_POST: string;
  ADD_CONTEST: string;
  ADD_PROBLEM: string;
  MANAGE_ROLE: string;
  PUBLIC_EDIT: string;
  REJUDGE_ALL: string;
  SUBMIT_CODE: string;
  SUPER_ADMIN: string;
  GET_CODE_ALL: string;
  CHANGE_AVATAR: string;
  GET_CODE_SELF: string;
  POST_NEW_POST: string;
  CHANGE_PROFILE: string;
  VIEW_OUTPUT_ALL: string;
  EDIT_CONTEST_ALL: string;
  EDIT_PROBLEM_ALL: string;
  VIEW_OUTPUT_SELF: string;
  REJUDGE_CONTEST_ALL: string;
  BYPASS_STATISTIC_ALL: string;
  REJUDGE_CONTEST_SELF: string;
}

interface SignInRequestInterface {
  captcha: string;
  password: string;
  user: string;
}

interface ContestsListReturnInterface {
  requested: number;
  served: number;
  is_end: boolean;
  list?: (ContestsListContestSimpleEntity)[] | null;
}

interface ContestsListContestSimpleEntity {
  contest_id: number;
  title: string;
  description: string;
  during: string;
  perm: string;
  private: boolean;
  problems?: (ContestsListContestProblemSimpleEntity | null)[] | null;
}

interface ContestsListContestProblemSimpleEntity {
  pid: number;
  ac: number;
  all: number;
}

interface ContestDetailReturnInterface {
  contest_id: number;
  title: string;
  during: string;
  description: string;
  extra: boolean;
  perm: string;
  private: boolean;
  rule: string;
  start: string; // date and time, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
  end: string; // like above
  problems?: (ContestDetailContestDetail)[] | null;
  file?: string;
}

interface ContestDetailContestDetail {
  problem_id: number;
  ac: number;
  all: number;
  title: string;
  special_judge: number;
  detail_judge: boolean;
  level: number;
}

interface ContestCreateRequestInterface {
  title: string;
  perm: string; // '(1,0,0,0,0)'
  start: string; // date and time, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
  end: string; // like above
  private: boolean;
  rule: ContestRule; // 'acm', 'oi'
  file?: File;
  description: string;
}

interface ContestCreateReturnInterface {
  file?: string;
  contest_id: number;
  title: string;
  during: string;
  description: string;
  extra: boolean;
  perm: string;
  private: boolean;
  rule: string;
}

interface ContestEditSaveRequestInterface extends ContestCreateRequestInterface {
  extra: boolean;
}

type ContestEditSaveReturnInterface = ContestCreateReturnInterface

interface ProblemsListReturnInterface {
  requested: number;
  served: number;
  is_end: boolean;
  list?: (ProblemsListProblemSampleEntity)[] | null;
}

interface ProblemsListProblemSampleEntity {
  problem_id: number;
  title: string;
  ac: number;
  all: number;
  special_judge: number;
  detail_judge: boolean;
  cases: number;
  time_limit: number;
  memory_limit: number;
  level: number;
  contest_id?: null;
}

interface ContestAdminDetailReturnInterface {
  contest_id: number;
  title: string;
  description: string;
  during: string;
  perm: string;
  private: boolean;
  problems?: (ContestAdminDetailProblemEntity)[] | null;
  participants?: (ContestAdminDetailParticipantsEntity)[] | null;
}

interface ContestAdminDetailProblemEntity {
  pid: number;
  ac: number;
  all: number;
}

interface ContestAdminDetailParticipantsEntity {
  user_id: number;
  nickname: string;
}

interface ReportReturnInterface {
  report_id: number;
  reporter: number;
  reportee: number;
  type: number;
  which: number;
  handler?: number | null;
  result?: boolean | null;
  when: string;
}

interface DiscussListReturnInterface {
  requested: number;
  served: number;
  is_end: boolean;
  list?: (DiscussListPostEntity)[] | null;
}

interface DiscussListPostEntity {
  post_id: number;
  user_id: number;
  nickname?: string | null;
  title: string;
  since: string;
  last_active_date: string;
  last_active_user?: number | null;
  positive: number;
  negative: number;
}

interface ProblemAddOrUpdateRequestInterface {
  title: string;
  cases: number;
  time_limit: number;
  memory_limit: number;
  type: string;
  special_judge: number;
  detail_judge: boolean;
  tags?: (string)[] | null;
  description: string;
  input: string;
  output: string;
  sample_input: string;
  sample_output: string;
  hint: string;
  level: number;
  // 以下两个字段似乎在后端的迭代中取消了
  // max_output: number;
  // max_core: number;
}

interface ProblemAddOrUpdateReturnInterface {
  problem_id: number;
  filename: string;
  content: string;
}

interface ProblemSPJUpdateRequestInterface {
  file: File;
  lang: number;
}

interface ProblemIODataUpdateRequestInterface {
  file: File;
}

interface ProblemIODataUpdateReturnInterface {
  files: number;
}

interface ProblemInformationReturnInterface {
  problem_id: number;
  title: string;
  ac: number;
  all: number;
  special_judge: number;
  detail_judge: boolean;
  cases: number;
  time_limit: number;
  memory_limit: number;
  level: number;
  contest_id?: null;
  tags?: (ProblemTagsEntity)[] | null;
  keys?: (string)[] | null;
  content: ProblemContent;
}

interface ProblemTagsEntity {
  id: number;
  official: boolean;
  p: number;
  n: number;
  name: string;
}

interface ProblemContent {
  description: string;
  input: string;
  output: string;
  sample_input: string;
  sample_output: string;
  hint: string;
}

interface StatusStreamReturnInterfacee {
  solution_id: number;
  user_id: number;
  problem_id: number;
  status_id: number;
  language: number;
  code_size: number;
  time: number;
  memory: number;
  when: string;
  ipaddr_id: number;
  shared: boolean;
  contest_id?: null;
  score: number;
  detail?: (StatusStreamDetailEntity)[] | null;
  compile_info: string;
  msg_short: string;
  msg_en: string;
  msg_cn: string;
  nickname: string;
}

interface StatusStreamDetailEntity {
  time: number;
  memory: number;
  result: string;
  status: number;
  exitcode: number;
  extra?: string | null;
  signal?: number | null;
  signal_str?: string | null;
}

interface RejudgeReturnInterface {
  json: RejudgeJsonEntity;
}

interface RejudgeJsonEntity {
  compiler: string;
  detail?: (RejudgeJsonDetailEntity)[] | null;
  memory: number;
  result: string;
  status: number;
  time: number;
}

interface RejudgeJsonDetailEntity {
  exitcode: number;
  memory: number;
  result: string;
  status: number;
  time: number;
}
