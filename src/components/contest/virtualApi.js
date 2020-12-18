const getSets = function (sets) {
  let idsets = []
  for (let i of sets) {
    idsets.push(i.problem_id)
  }
  return idsets
}

const myStatus = function (http, sets) {
  let idsets = getSets(sets)
  return new Promise(function (resolve, reject) {
    http.get(window.noPointHost + '/api/u')
      .then(function (res) {
        let ret = []
        const all = res.body.data.all
        const ac = res.body.data.ac
        for (let i of idsets) {
          let node = {id: i, status: ''}
          if (ac.indexOf(i) !== -1) {
            node.status = 2 // 'ac'
          } else if (all.indexOf(i) !== -1) {
            node.status = 1 // 'trying'
          } else {
            node.status = 0 // 'none'
          }
          ret.push(node)
        }
        resolve(ret)
      }, function (err) {
        reject(err)
      })
  })
}

const pcStatus = function (http, sets, oldstatus, startime, endtime) { // 这是魔改的api，不建议使用
  let idsets = getSets(sets)
  startime = new Date(startime).getTime()
  endtime = new Date(endtime).getTime()
  return new Promise(function (resolve, reject) {
    http.get(window.noPointHost + '/api/status')
      .then(function (res) {
        let ret = []
        const status = res.body.data
        for (let s of status) {
          // console.log(s)
          if (idsets.indexOf(s.problem_id) === -1) continue
          if (oldstatus.has(s.solution_id)) continue
          let when = new Date(s.when).getTime()
          if (when > endtime) continue
          if (when < startime) continue
          oldstatus.add(s.solution_id)
          ret.push(s)
        }
        resolve(ret)
      }, function (err) {
        reject(err)
      })
  })
}

const contestStatus = function (http, sid, lastid, start, end) {
  start = new Date(start).getTime()
  end = new Date(end).getTime()
  lastid = Number(lastid || 0)
  // console.log(sid, lastid, start, end)
  return new Promise(function (resolve, reject) {
    http.get(window.noPointHost + '/api/status/contest/' + sid + '/' + lastid)
      .then(function (res) {
        let ret = []
        if (res.body.data) {
          for (let it of res.body.data) {
            let t = new Date(it['when']).getTime()
            if (t > start && t < end) ret.push(it)
          }
        }
        resolve(ret)
      }, function (err) {
        reject(err)
      })
  })
}

const contestData = function (http, cid) {
  return new Promise(function (resolve, reject) {
    http.get(window.noPointHost + '/api/contest/' + cid)
      .then(function (res) {
        let ret = res.body.data
        let during = ret.during
        let [startime, endtime] = JSON.parse(during)
        ret.startime = startime
        ret.endtime = endtime
        // console.log(ret)
        ret.problems = ret.problems.sort(function (l, r) {
          return l.problem_id - r.problem_id
        })
        resolve(ret)
      }, function (err) {
        reject(err)
      })
  })
}

const statusSearchStr = function (_pid, _uid, _sid, _nickname, _lang) {
  const valuecheck = function (v) {
    return (v === '' || v === 'undefined')
  }
  let pack = {
    pid: _pid + '',
    uid: _uid + '',
    sid: _sid + '',
    nickname: _nickname + '',
    lang: _lang + ''
  }
  let querryCheck = []
  for (let key in pack) {
    let value = pack[key]
    if (valuecheck(value)) continue
    querryCheck.push(key + '=' + value)
  }
  return querryCheck.join('&')
}

const statusSearchData = function (http, querryString) {
  return new Promise(function (resolve, reject) {
    http.get(window.nowPointHost + '/api/status/' + '?' + querryString)
      .then(function (res) {
        if (res.body.code.toString() === '0') resolve(res.body.data)
        else reject(res)
      }, function (err) {
        reject(err)
      })
  })
}

const rankList = async function (http, cid) {
  let o = await contestData(http, cid)
  let status = await contestStatus(http, cid, 0, o.startime, o.endtime)
  const suptime = new Date(o.startime).getTime()
  const getUsers = function (list) {
    let sets = new Set([])
    let pack = {}
    for (let it of list) {
      if (!sets.has(it['user_id'])) {
        sets.add(it['user_id'])
        pack[it['user_id']] = []
      }
      it['love41'] = new Date(it['when']).getTime() - suptime
      pack[it['user_id']].push(it)
    }
    for (let id in pack) {
      pack[id].sort(function (l, r) {
        return l['solution_id'] - r['solution_id']
      })
    }
    return {
      sets: sets,
      pack: pack
    }
  }
  let users = getUsers(status)
  // console.log(users)
  const penalty = 20 * 60 * 1000
  const list = []
  for (let it of users.sets) {
    let one = new Map()
    let add = new Map()
    let secret = new Map()
    for (let ht of users.pack[it]) {
      // 必须保证 ht 按照时间从小到大排序
      const pid = ht['problem_id']
      const when = ht['love41']
      if (ht['status_id'].toString() === '107' || ht['status_id'].toString() === '108') {
        if (!one.has(pid)) {
          one.set(pid, when)
        } else {
          one.set(pid, Math.min(one.get(pid), when))
        }
      }
      if (ht['status_id'].toString() === '233') {
        if (!one.has(pid)) {
          if (!secret.has(pid)) {
            secret.set(pid, when)
          } else {
            secret.set(pid, Math.min(secret.get(pid), when))
          }
        }
      } else {
        if (!one.has(pid)) {
          if (!add.has(pid)) {
            add.set(pid, penalty)
          } else {
            add.set(pid, add.get(pid) + penalty)
          }
        }
      }
    }
    const allac = one.size
    let alltime = 0
    for (let [key, value] of one) {
      // console.log(key, value)
      alltime += value
      // console.log(alltime)
      if (add.has(key)) alltime += add.get(key)
    }
    list.push({
      uid: it,
      nickname: users.pack[it][0]['nickname'],
      allac: allac,
      alltime: alltime,
      one: one,
      add: add,
      secret: secret
    })
  }
  list.sort(function (l, r) {
    if (l.allac !== r.allac) {
      return r.allac - l.allac
    }
    return l.alltime - r.alltime
  })
  return [list, o]
}

export {
  myStatus,
  pcStatus,
  contestStatus,
  rankList,
  contestData,
  statusSearchStr,
  statusSearchData
}
