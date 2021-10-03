import fetch from 'isomorphic-fetch'
import format from 'string-format'
import { USER_DEBUG_LOG, USER_DEBUG_LOG_TYPE } from '@/components/log/log'
import objFormatUrl, { API_BASE_URL } from './objFormatUrl'
import { AdminWhisperRequestInterface, AnnouncementReturnInterface, ApiReturn, ContestAdminDetailReturnInterface, ContestCreateRequestInterface, ContestCreateReturnInterface, ContestDetailReturnInterface, ContestEditSaveRequestInterface, ContestEditSaveReturnInterface, ContestsListContestSimpleEntity, ContestsListReturnInterface, DiscussListPostEntity, DiscussListReturnInterface, ErrorInterface, MessageRequestInterface, ProblemAddOrUpdateRequestInterface, ProblemAddOrUpdateReturnInterface, ProblemInformationReturnInterface, ProblemIODataUpdateRequestInterface, ProblemsListProblemSampleEntity, ProblemsListReturnInterface, ProblemSPJUpdateRequestInterface, RejudgeReturnInterface, ReportReturnInterface, SignInRequestInterface, StatusStreamReturnInterfacee, UserInformationReturnInterface } from '@/types/interface'

/**
 * 对 fetch 的 options 进行了一些默认设置, 对错误处理进行了修改
 *
 * @param {RequestInfo} url
 * @param {RequestInit} [options]
 * @returns
 */
export function fetchBase (url: RequestInfo, options?: RequestInit) {
  const defaultOptions: RequestInit = {
    credentials: 'include'
  }
  const newOptions: RequestInit = {
    ...defaultOptions,
    ...options
  }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        ...newOptions.headers
      }
      // JSON 的字符串化在进入函数前进行好, 此处延用 RequestInit 数据类型的要求
      // newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers
      }
    }
  }
  return fetch(API_BASE_URL + url, newOptions)
    .then((response: { status: number; }) => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      if (response.status === 401) {
        // 未授权
        USER_DEBUG_LOG('未授权')
      }
      throw response
    })
    .then((response: { status: number; text: () => Promise<string>; json: () => Promise<Record<string, unknown>>; }) => {
      if (newOptions.method === 'DELETE' || response.status === 204 || response.status === 205) {
        return response.text()
      }
      return response.json()
    })
    .catch((err: Record<string, unknown> | string | number) => {
      throw err
    })
}

function convertErrorInterfaceToString (item: ErrorInterface): string {
  let str = ''
  if (item.name) {
    str += `error.name: ${item.name}\n`
  }
  if (item.message) {
    str += `error.message: ${item.message}\n`
  }
  if (item.debug) {
    if (item.debug?.location) {
      str += `debug.location: ${item.debug.location}\n`
    }
    if (item.debug?.type) {
      str += `debug.type: ${item.debug?.type}\n`
    }
    if (item.debug?.value) {
      str += `debug.value: ${item.debug?.value}\n`
    }
  }
  return str
}

function logAndThrowOnError (ret: ApiReturn) {
  if (ret.code === 0) {
    return
  }
  // ret.code !== 0)
  let str = ''
  if (ret.message) {
    str += `${ret.message}\n`
  }
  if (ret.error) {
    if (ret.error instanceof Array) {
      ret.error.forEach((item) => {
        str += convertErrorInterfaceToString(item)
      })
    } else {
      str += convertErrorInterfaceToString(ret.error)
    }
  }
  USER_DEBUG_LOG(str, ret, USER_DEBUG_LOG_TYPE.FAILURE)
  throw ret
}

/**
 * 获取所有的公告的集合
 *
 * @export
 * @returns {Promise<AnnouncementReturnInterface[]>}
 */
export async function apiMessageAnnouncement (): Promise<AnnouncementReturnInterface[]> {
  try {
    const ret: ApiReturn = await fetchBase(objFormatUrl.announce, { method: 'GET' })
    logAndThrowOnError(ret)
    const annouceArray = ret.data as AnnouncementReturnInterface[]
    USER_DEBUG_LOG('获取公告成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return annouceArray
  } catch (e) {
    USER_DEBUG_LOG('获取公告失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 给所有人发送公告
 *
 * @export
 * @param {MessageRequestInterface} body
 * @returns {Promise<void>}
 */
export async function apiMessageAll (body: MessageRequestInterface): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(objFormatUrl.messageAll, { method: 'POST', body: JSON.stringify(body) })
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('发送公告成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('发送公告失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 撤回发出的公告
 *
 * @export
 * @param {number} messageId
 * @returns {Promise<void>}
 */
export async function apiMessageWithdraw (messageId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(format(objFormatUrl.withdrawAnnounce, { mid: messageId }), { method: 'GET' })
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('删除公告成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('删除公告失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 给单个用户发送管理员私信
 *
 * @export
 * @param {AdminWhisperRequestInterface} whisper
 * @returns {Promise<void>}
 */
export async function apiWhisper (whisper: AdminWhisperRequestInterface): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.whisper, { uid: whisper.uid }),
      {
        method: 'POST',
        body: JSON.stringify({ title: whisper.title, message: whisper.message })
      }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('发送私信成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('发送私信失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
  }
}

/**
 * 获取指定用户的详细信息
 * userId 为空字符串或者 number
 *
 * @export
 * @param {number | string} userId
 * @returns {Promise<UserInformationReturnInterface>}
 */
export async function apiUserInformation (userId: number | string): Promise<UserInformationReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.userPlus, { uid: userId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    const userInformation: UserInformationReturnInterface = ret.data as UserInformationReturnInterface
    USER_DEBUG_LOG('获取用户信息成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return userInformation
  } catch (e) {
    USER_DEBUG_LOG('获取用户信息失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

// /**
//  * 获取本站全部用户信息
//  *
//  * @export
//  * @param {number} limitId
//  * @returns {Promise<Array<UserInformationReturnInterface>>}
//  */
// export async function apiAllUserInformation(limitId: number): Promise<Array<UserInformationReturnInterface>> {
//   try {
//   } catch (e) {
//     USER_DEBUG_LOG('获取全部用户信息失败', e, USER_DEBUG_LOG_TYPE.FAILURE);
//     throw e;
//   }
// }

/**
 * 获取当前用户的详细信息
 *
 * @export
 * @returns {Promise<UserInformationReturnInterface>}
 */
export async function apiSelfProfile (): Promise<UserInformationReturnInterface> {
  return apiUserInformation('')
}

/**
 * 用户登录
 * signInPackage.password 需要使用公钥加密
 * 例: signInPackage.password = forge.util.encode64(forge.pki.publicKeyFromPem(publicKey).encrypt(signInPackage.password));
 *
 * @export
 * @param {SignInRequestInterface} signInPackage
 * @returns {Promise<UserInformationReturnInterface>}
 */
export async function apiSignIn (signInPackage: SignInRequestInterface): Promise<UserInformationReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      objFormatUrl.login,
      { method: 'POST', body: JSON.stringify(signInPackage) }
    )
    logAndThrowOnError(ret)
    const userInformation: UserInformationReturnInterface = ret.data as UserInformationReturnInterface
    USER_DEBUG_LOG('登录成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return userInformation
  } catch (e) {
    USER_DEBUG_LOG('登录失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 用户登出
 *
 * @export
 * @returns {Promise<void>}
 */
export async function apiLogout (): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      objFormatUrl.logout,
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('登出成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('登出失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取比赛列表
 */
export async function apiContestsList (offset: number, pageSize: number): Promise<ContestsListReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestsListRange, { offset, pageSize }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    const contestsList: ContestsListReturnInterface = ret.data as ContestsListReturnInterface
    USER_DEBUG_LOG('获取比赛列表成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return contestsList
  } catch (e) {
    USER_DEBUG_LOG('获取比赛列表失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取全部的比赛列表
 *
 * @export
 * @param {number} pageSize
 * @returns {Promise<(ContestsListContestSimpleEntity)[]>}
 */
export async function apiContestsListAll (pageSize: number): Promise<(ContestsListContestSimpleEntity)[]> {
  try {
    let offset = 0
    let contestsListsAll = [] as Array<ContestsListContestSimpleEntity>
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const contestsList = await apiContestsList(offset, pageSize)
      contestsListsAll = contestsListsAll.concat(contestsList.list as Array<ContestsListContestSimpleEntity>)
      if (contestsList.is_end) {
        break
      }
      offset += pageSize
    }
    USER_DEBUG_LOG('获取全部比赛列表成功', undefined, USER_DEBUG_LOG_TYPE.SUCCESS)
    return contestsListsAll
  } catch (e) {
    USER_DEBUG_LOG('获取全部比赛列表失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取比赛详情
 *
 * @export
 * @param {number} contestId
 * @returns {Promise<ContestDetailReturnInterface>}
 */
export async function apiContestDetail (contestId: number): Promise<ContestDetailReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contest, { cid: contestId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    const contestDetail: ContestDetailReturnInterface = ret.data as ContestDetailReturnInterface
    USER_DEBUG_LOG('获取比赛详情成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return contestDetail
  } catch (e) {
    USER_DEBUG_LOG('获取比赛详情失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取比赛的管理员级别的详细信息
 *
 * @export
 * @param {number} contestId
 * @returns {Promise<ContestAdminDetailReturnInterface>}
 */
export async function apiContestAdminDetail (contestId: number): Promise<ContestAdminDetailReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.amdinContest, { cid: contestId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    const contestDetail: ContestAdminDetailReturnInterface = ret.data as ContestAdminDetailReturnInterface
    USER_DEBUG_LOG('获取比赛（管理员级别）详情成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return contestDetail
  } catch (e) {
    USER_DEBUG_LOG('获取比赛（管理员级别）详情失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 创建比赛
 *
 * @export
 * @param {ContestCreateRequestInterface} contestCreate
 * @returns {Promise<ContestCreateReturnInterface>}
 */
export async function apiContestCreate (contestCreate: ContestCreateRequestInterface): Promise<ContestCreateReturnInterface> {
  const formData = new FormData()
  formData.append('title', contestCreate.title)
  formData.append('perm', contestCreate.perm)
  formData.append('start', contestCreate.start)
  formData.append('end', contestCreate.end)
  formData.append('private', String(contestCreate.private))
  formData.append('rule', contestCreate.rule)
  formData.append('file', contestCreate.file as File)
  formData.append('description', contestCreate.description)
  try {
    const ret: ApiReturn = await fetchBase(
      objFormatUrl.contestCreate,
      { method: 'POST', body: formData }
    )
    logAndThrowOnError(ret)
    const ccreateReturn: ContestCreateReturnInterface = ret.data as ContestCreateReturnInterface
    USER_DEBUG_LOG('创建比赛成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return ccreateReturn
  } catch (e) {
    USER_DEBUG_LOG('创建比赛失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 删除比赛
 *
 * @export
 * @param {number} contestId
 * @returns {Promise<void>}
 */
export async function apiContestDelete (contestId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestDelete, { cid: contestId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('删除比赛成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('删除比赛失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 编辑比赛, 和创建比赛使用的是同一个后端接口
 *
 * @export
 * @param {ContestEditSaveRequestInterface} contestEdit
 * @returns {Promise<ContestEditSaveReturnInterface>}
 */
export async function apiContestEditSave (contestId: number, contestEdit: ContestEditSaveRequestInterface): Promise<ContestEditSaveReturnInterface> {
  const formData = new FormData()
  formData.append('title', contestEdit.title)
  formData.append('perm', contestEdit.perm)
  formData.append('start', contestEdit.start)
  formData.append('end', contestEdit.end)
  formData.append('private', String(contestEdit.private))
  formData.append('rule', contestEdit.rule)
  formData.append('extra', String(contestEdit.extra))
  formData.append('description', contestEdit.description)
  // 当且仅当上传新的文件, 方才更新 file 字段
  if (contestEdit.file) {
    formData.append('file', contestEdit.file as File)
  }
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestEdit, { cid: contestId }),
      { method: 'POST', body: formData }
    )
    logAndThrowOnError(ret)
    const cESRet: ContestEditSaveReturnInterface = ret.data as ContestEditSaveReturnInterface
    USER_DEBUG_LOG('编辑比赛成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return cESRet
  } catch (e) {
    USER_DEBUG_LOG('编辑比赛失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取题目列表
 * offset 从 0 开始
 *
 * @export
 * @param {number} offset
 * @param {number} pageSize
 * @returns {Promise<ProblemsListReturnInterface>}
 */
export async function apiProblemsList (offset: number, pageSize: number): Promise<ProblemsListReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.problemsList, { offset, pageSize }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    const problemList = ret.data as ProblemsListReturnInterface
    USER_DEBUG_LOG('获取题目列表成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return problemList
  } catch (e) {
    USER_DEBUG_LOG('获取题目列表失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取全部的题目列表
 *
 * @export
 * @param {number} pageSize
 * @returns {Promise<(ProblemsListProblemSampleEntity)[]>}
 */
export async function apiProblemsListAll (pageSize: number): Promise<(ProblemsListProblemSampleEntity)[]> {
  try {
    let offset = 0
    let problemsListAll = [] as Array<ProblemsListProblemSampleEntity>
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const problemsList = await apiProblemsList(offset, pageSize)
      problemsListAll = problemsListAll.concat(problemsList.list as Array<ProblemsListProblemSampleEntity>)
      if (problemsList.is_end) {
        break
      }
      offset += pageSize
    }
    USER_DEBUG_LOG('获取全部题目列表成功', undefined, USER_DEBUG_LOG_TYPE.SUCCESS)
    return problemsListAll
  } catch (e) {
    USER_DEBUG_LOG('获取全部题目列表失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 为比赛添加题目
 *
 * @export
 * @param {number} contestId
 * @param {number} problemId
 * @returns {Promise<void>}
 */
export async function apiContestProblemAdd (contestId: number, problemId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestProblemAdd, { cid: contestId, pid: problemId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('添加比赛题目成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('添加比赛题目失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 从比赛中移除题目
 *
 * @export
 * @param {number} contestId
 * @param {number} problemId
 * @returns {Promise<void>}
 */
export async function apiContestProblemRemove (contestId: number, problemId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestProblemRemove, { cid: contestId, pid: problemId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('移除比赛题目成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('移除比赛题目失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 为比赛添加用户
 *
 * @export
 * @param {number} contestId
 * @param {number} userId
 * @returns {Promise<void>}
 */
export async function apiContestUserAdd (contestId: number, userId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestUserAdd, { cid: contestId, uid: userId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('添加比赛用户成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('添加比赛用户失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 将用户从比赛中移除
 *
 * @export
 * @param {number} contestId
 * @param {number} userId
 * @returns {Promise<void>}
 */
export async function apiContestUserRemove (contestId: number, userId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestUserRemove, { cid: contestId, uid: userId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('移除比赛用户成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('移除比赛用户失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取全部举报列表
 *
 * @export
 * @returns {Promise<Array<ReportReturnInterface>>}
 */
export async function apiReportAll (): Promise<Array<ReportReturnInterface>> {
  try {
    const ret: ApiReturn = await fetchBase(objFormatUrl.reportList, { method: 'GET' })
    logAndThrowOnError(ret)
    const reportAll = ret.data as Array<ReportReturnInterface>
    USER_DEBUG_LOG('获取举报列表成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return reportAll
  } catch (e) {
    USER_DEBUG_LOG('获取举报列表失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 管理员认可用户对私信的举报
 *
 * @export
 * @param {number} reportId
 * @returns {Promise<void>}
 */
export async function apiReportApprove (reportId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(format(objFormatUrl.reportApprove, { rid: reportId }), { method: 'GET' })
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('认可用户私信举报成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('认可用户私信举报失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 管理员拒绝用户对私信的举报
 *
 * @export
 * @param {number} reportId
 * @returns {Promise<void>}
 */
export async function apiReportDecline (reportId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(format(objFormatUrl.reportDecline, { rid: reportId }), { method: 'GET' })
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('拒绝用户私信举报成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('拒绝用户私信举报失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取讨论列表, pageSize 最大为 50
 *
 * @export
 * @param {number} offset
 * @param {number} pageSize
 * @returns {Promise<DiscussListReturnInterface>}
 */
export async function apiDiscussList (offset: number, pageSize: number): Promise<DiscussListReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.discuss0, { offset, pageSize }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    const problemList = ret.data as DiscussListReturnInterface
    USER_DEBUG_LOG('获取讨论列表成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return problemList
  } catch (e) {
    USER_DEBUG_LOG('获取讨论列表失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取全部的讨论列表, pageSize 最大为 50
 *
 * @export
 * @param {number} pageSize
 * @returns {Promise<(DiscussListPostEntity)[]>}
 */
export async function apiDiscussListAll (pageSize: number): Promise<(DiscussListPostEntity)[]> {
  try {
    let offset = 0
    let discussListAll = [] as Array<DiscussListPostEntity>
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const discussList = await apiDiscussList(offset, pageSize)
      discussListAll = discussListAll.concat(discussList.list as Array<DiscussListPostEntity>)
      if (discussList.is_end) {
        break
      }
      offset += pageSize
    }
    USER_DEBUG_LOG('获取全部讨论列表成功', undefined, USER_DEBUG_LOG_TYPE.SUCCESS)
    return discussListAll
  } catch (e) {
    USER_DEBUG_LOG('获取全部讨论列表失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 删除 discuss 区的文章
 *
 * @export
 * @param {number} postId
 * @returns {Promise<void>}
 */
export async function apiPostRemove (postId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.postRemove, { pid: postId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('删除文章成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('删除文章失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 恢复文章
 *
 * @export
 * @param {number} postId
 * @returns {Promise<void>}
 */
export async function apiPostRecover (postId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.postRecover, { pid: postId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('恢复文章成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('恢复文章失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 删除文章的评论
 *
 * @export
 * @param {number} postCommentId
 * @returns {Promise<void>}
 */
export async function apiPostCommentRemove (postCommentId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.postCommentRemove, { pcid: postCommentId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('删除文章评论成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('删除文章评论失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 恢复文章的评论
 *
 * @export
 * @param {number} postCommentId
 * @returns {Promise<void>}
 */
export async function apiPostCommentRecover (postCommentId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.postCommentRecover, { pcid: postCommentId }),
      { method: 'GET' }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('恢复文章评论成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('恢复文章评论失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 管理员添加题目, 仅包含基础数据, 不包含输入输出和 Special Judge 配置
 *
 * @export
 * @param {ProblemAddOrUpdateRequestInterface} problemData
 * @returns {Promise<ProblemAddOrUpdateReturnInterface>}
 */
export async function apiProblemAdd (problemData: ProblemAddOrUpdateRequestInterface): Promise<ProblemAddOrUpdateReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(objFormatUrl.problemAdd, { method: 'POST', body: JSON.stringify(problemData) })
    logAndThrowOnError(ret)
    const pARet = ret.data as ProblemAddOrUpdateReturnInterface
    USER_DEBUG_LOG('添加题目成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return pARet
  } catch (e) {
    USER_DEBUG_LOG('添加题目失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 管理员修改题目, 仅包含基础数据, 不包含输入输出数据和 Special Judge 配置
 *
 * @export
 * @param {problemId} Number
 * @param {ProblemAddOrUpdateRequestInterface} problemData
 * @returns {Promise<ProblemAddOrUpdateReturnInterface>}
 */
export async function apiProblemUpdate (problemId: number, problemData: ProblemAddOrUpdateRequestInterface): Promise<ProblemAddOrUpdateReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(format(objFormatUrl.problemUpdate, { pid: problemId }), { method: 'POST', body: JSON.stringify(problemData) })
    logAndThrowOnError(ret)
    const pARet = ret.data as ProblemAddOrUpdateReturnInterface
    USER_DEBUG_LOG('修改题目成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return pARet
  } catch (e) {
    USER_DEBUG_LOG('修改题目失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 更新题目的 Special Judge 数据
 *
 * @export
 * @param {number} problemId
 * @param {ProblemSPJUpdateRequestInterface} spjData
 * @returns {Promise<void>}
 */
export async function apiProblemSPJUpdate (problemId: number, spjData: ProblemSPJUpdateRequestInterface): Promise<void> {
  const formData = new FormData()
  formData.append('file', spjData.file)
  formData.append('lang', String(spjData.lang))
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.problemSpecialJudgeUpdate, { pid: problemId }),
      { method: 'POST', body: formData }
    )
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('更新 Special Judge 数据成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('更新 Special Judge 数据失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 更新题目输入输出数据
 *
 * @export
 * @param {number} problemId
 * @param {ProblemIODataUpdateRequestInterface} ioData
 * @returns {Promise<void>}
 */
export async function apiProblemIODataUpdate (problemId: number, ioData: ProblemIODataUpdateRequestInterface): Promise<void> {
  const formData = new FormData()
  formData.append('file', ioData.file)
  try {
    const ret: ApiReturn = await fetchBase(format(objFormatUrl.problemIODataUpdate, { pid: problemId }), { method: 'POST', body: formData })
    logAndThrowOnError(ret)
    USER_DEBUG_LOG('更新题目输入输出数据成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
  } catch (e) {
    USER_DEBUG_LOG('更新题目输入输出数据失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取题目信息
 *
 * @export
 * @param {number} problemId
 * @returns {Promise<ProblemInformationReturnInterface>}
 */
export async function apiProblemInformation (problemId: number): Promise<ProblemInformationReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(format(objFormatUrl.problem, { pid: problemId }), { method: 'GET' })
    logAndThrowOnError(ret)
    const pIRet = ret.data as ProblemInformationReturnInterface
    USER_DEBUG_LOG('获取题目信息成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return pIRet
  } catch (e) {
    USER_DEBUG_LOG('获取题目信息失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取最近时间段的评测信息
 *
 * @export
 * @returns {Promise<Array<StatusStreamReturnInterfacee>>}
 */
export async function apiStatusStream (): Promise<Array<StatusStreamReturnInterfacee>> {
  try {
    const ret: ApiReturn = await fetchBase(format(objFormatUrl.status, { querryString: '' }), { method: 'GET' })
    logAndThrowOnError(ret)
    const sSRet = ret.data as Array<StatusStreamReturnInterfacee>
    USER_DEBUG_LOG('获取评测信息成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return sSRet
  } catch (e) {
    USER_DEBUG_LOG('获取评测信息失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 获取更多的评测信息
 *
 * @export
 * @param {number} from
 * @param {number} limit
 * @returns {Promise<Array<StatusStreamReturnInterfacee>>}
 */
export async function apiStatusRangeStream (from: number, limit: number): Promise<Array<StatusStreamReturnInterfacee>> {
  try {
    const ret: ApiReturn = await fetchBase(format(objFormatUrl.ftStatus, { from, limit, querryString: '' }), { method: 'GET' })
    logAndThrowOnError(ret)
    const sSRet = ret.data as Array<StatusStreamReturnInterfacee>
    USER_DEBUG_LOG('获取评测信息成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return sSRet
  } catch (e) {
    USER_DEBUG_LOG('获取评测信息失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}

/**
 * 重新评测某个 Solution
 *
 * @export
 * @param {number} solutionId
 * @returns {Promise<RejudgeReturnInterface>}
 */
export async function apiRejudge (solutionId: number): Promise<RejudgeReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(format(objFormatUrl.rejudge, { sid: solutionId }), { method: 'GET' })
    logAndThrowOnError(ret)
    const rRet = ret.data as RejudgeReturnInterface
    USER_DEBUG_LOG('重新评测成功', ret, USER_DEBUG_LOG_TYPE.SUCCESS)
    return rRet
  } catch (e) {
    USER_DEBUG_LOG('重新评测失败', e, USER_DEBUG_LOG_TYPE.FAILURE)
    throw e
  }
}
